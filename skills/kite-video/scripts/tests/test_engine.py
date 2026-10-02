"""Smoke test for the render engine: init a project from the template, check determinism, render a sheet,
a strip and a short video. Skipped when Playwright is not installed (run /kite-video:setup).

Run: python3 -m unittest discover -s skills/kite-video/scripts/tests
"""
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

ENGINE = Path(__file__).resolve().parents[2] / "engine"
RENDER = ENGINE / "render.mjs"


def run(*args, cwd):
    return subprocess.run(["node", str(RENDER), *args], cwd=cwd, capture_output=True, text=True, timeout=300)


class EngineSmoke(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        if not shutil.which("node") or not shutil.which("ffmpeg"):
            raise unittest.SkipTest("node and ffmpeg are required")
        cls.tmp = Path(tempfile.mkdtemp(prefix="kv-test-"))
        r = run("init", "project", cwd=cls.tmp)
        assert r.returncode == 0, r.stderr
        probe = run("check", "project", cwd=cls.tmp)
        if "Playwright is not installed" in probe.stderr:
            raise unittest.SkipTest("Playwright not installed")
        cls.check = probe

    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(getattr(cls, "tmp", ""), ignore_errors=True)

    def test_deterministic(self):
        self.assertEqual(self.check.returncode, 0, self.check.stdout + self.check.stderr)
        self.assertIn("deterministic", self.check.stdout)

    def test_sheet_and_strip(self):
        r = run("sheet", "project", "--every=1", "--out=review/contact.png", cwd=self.tmp)
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertTrue((self.tmp / "review/contact.png").stat().st_size > 1000)
        r = run("strip", "project", "--range=3.0:3.2", "--out=review/strip.png", cwd=self.tmp)
        self.assertEqual(r.returncode, 0, r.stderr)

    def test_video_portrait(self):
        r = run("video", "project", "--range=0:1", "--format=9:16", "--out=review/p.mp4", cwd=self.tmp)
        self.assertEqual(r.returncode, 0, r.stderr)
        probe = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=width,height,r_frame_rate",
                                "-of", "csv=p=0", str(self.tmp / "review/p.mp4")], capture_output=True, text=True)
        self.assertIn("1080,1920,30/1", probe.stdout)


if __name__ == "__main__":
    unittest.main()
