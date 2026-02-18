# Animation Performance Playbook

This project keeps both WebGL animation layers (Plasma + Spline), but adapts quality by device and visibility.

## What is already implemented in code

- Adaptive quality tiers (`high` / `medium` / `low`) based on:
  - `prefers-reduced-motion`
  - `navigator.deviceMemory`
  - `navigator.hardwareConcurrency`
  - `navigator.connection.saveData`
  - coarse pointer signal
- Plasma runtime adaptation:
  - lower DPR caps on medium/low tiers
  - lower target FPS on medium/low tiers
  - pause rendering when tab is hidden or component is offscreen
- Spline interaction adaptation:
  - lower mouse sensitivity on medium/low tiers
  - throttle mouse updates on medium/low tiers
  - disable interactivity on low tier
  - unmount Spline when tab is hidden or section is offscreen
  - `renderOnDemand` enabled

## Spline scene-side optimization checklist

Apply these in the Spline editor before exporting/updating the scene URL.

- Reduce polygon counts:
  - Replace very dense meshes with lower-poly variants where possible.
- Reduce material/shader complexity:
  - Prefer simpler materials for non-hero objects.
- Optimize textures:
  - Use compressed texture formats if available.
  - Reduce oversized textures (avoid 4K unless absolutely needed).
- Reduce expensive lighting/effects:
  - Minimize real-time shadow usage and post effects.
  - Keep animated lights to essentials.
- Remove hidden/unseen objects:
  - Delete or disable geometry not visible in camera paths.
- Enable export/performance options:
  - Use Spline export settings oriented for web performance/compression.

## DevTools profiling protocol (before/after)

Use the same machine, browser, and viewport for fair comparison.

1. Open Chrome DevTools -> Performance.
2. Record 20-30 seconds on Home:
   - initial load
   - hero hover/mouse move
   - scroll down and back up
3. Capture metrics:
   - FPS stability (target 50-60 on desktop tiers)
   - Main-thread long tasks
   - GPU track activity (if available)
   - dropped frames/jank during scroll
4. Open DevTools -> Rendering:
   - enable FPS meter
   - enable Paint flashing (optional)
5. Repeat after each optimization change and compare.

## Tracking template

Fill this table as you validate.

| Scenario | Before FPS | After FPS | Notes |
| --- | --- | --- | --- |
| Home idle at top |  |  |  |
| Mouse move over hero |  |  |  |
| Scroll through Home |  |  |  |
| Tab hidden -> visible |  |  |  |
