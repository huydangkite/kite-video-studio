"""Measure how loud the ducked music sits under the voice-over and in the gaps.

Usage: python3 ${CLAUDE_PLUGIN_ROOT}/skills/kite-video/scripts/measure-mix-balance.py --voice <voice stem> --music <ducked music stem> [--body START END]
Both stems are rendered from the final mix settings (voice bus alone, ducked music bus alone) at the
same length. Speech windows are found from the voice stem itself (20 ms frames louder than 30 dB
below its peak, bridged over pauses shorter than 0.25 s). Prints the music level while someone
speaks, in the gaps, and the voice.

Target: music ~5 dB under the voice during speech and near voice level in the gaps.
~10 dB under reads as "there is no music" (viewers said so about the reference edition).
"""
import argparse
import subprocess

import numpy as np

SR = 8000
FRAME = SR // 50  # 20 ms


def decode(path):
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
        capture_output=True, check=True,
    ).stdout
    return np.frombuffer(raw, dtype=np.float32)


def db(x):
    return 10 * np.log10(np.mean(x ** 2) + 1e-12)


def speech_mask(v):
    n = len(v) // FRAME
    rms = np.sqrt((v[: n * FRAME].reshape(n, FRAME) ** 2).mean(axis=1) + 1e-12)
    level = 20 * np.log10(rms)
    on = level > level.max() - 30
    bridge = int(0.25 * 50)
    idx = np.flatnonzero(on)
    for a, b in zip(idx[:-1], idx[1:]):
        if 1 < b - a <= bridge:
            on[a:b] = True
    return np.repeat(on, FRAME)


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--voice", required=True)
    ap.add_argument("--music", required=True)
    ap.add_argument("--body", nargs=2, type=float, metavar=("START", "END"),
                    help="seconds to measure (default: 1 s to the end)")
    a = ap.parse_args()

    m, v = decode(a.music), decode(a.voice)
    n = min(len(m), len(v)) // FRAME * FRAME
    m, v = m[:n], v[:n]
    speech = speech_mask(v)
    start, end = a.body or (1.0, n / SR)
    body = np.zeros(n, bool)
    body[int(start * SR): int(end * SR)] = True

    under, gaps, voice = db(m[speech & body]), db(m[body & ~speech]), db(v[speech & body])
    print(f"music under speech {under:.1f} dB | music in gaps {gaps:.1f} dB | voice {voice:.1f} dB")
    print(f"music sits {voice - under:.1f} dB under the voice; gaps are {100 * np.mean(~speech[body]):.0f}% of the body")


if __name__ == "__main__":
    main()
