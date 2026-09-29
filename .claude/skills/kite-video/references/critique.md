# Critique loop

A first render is rarely good. Look at your own frames before the colleague does.

## Each round

1. `npx hyperframes check` must pass first (it catches layout/timing errors cheaply).
2. Snapshot one frame per beat, at the moment each beat is fully on screen:
   `npx hyperframes snapshot videos/<slug>/project --at <t1,t2,…> -o videos/<slug>/review/round-<n>`
   For each extra format, snapshot the same beats in that format.
3. Hand the folder to the `critic` agent together with `INTAKE.md` and `brand/brand.md`.
   It returns scores per axis per beat and the **three worst problems**, each with the frame and
   a concrete fix.
4. Fix exactly those three (small edits), re-render only what changed, next round.

## Stop rule

- Every axis ≥ 8 on every beat → done.
- 3 rounds → stop, and tell the colleague which issues remain.
- Score did not improve since the previous round → stop; changing more would just churn.

## Then a moving check

Render a low-resolution draft and watch it once with voice: timing of each line against its
visuals, cuts on voice pauses, nothing on screen for less than ~1s, the CTA held ≥ 2s. Fix,
then render finals.
