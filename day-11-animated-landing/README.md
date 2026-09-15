# Day 11: CSS Transform and Animation

## Mini Project: OrbitLaunch Pro Animated Product Landing Page

A high-performance aerospace landing page powered entirely by pure CSS transforms (`translate`, `scale`, `rotate`, `skew`), smooth transitions, and GPU-accelerated `@keyframes` animations (flying rocket, thruster flame pulse, telemetry loading spinner, and shimmering pulsing CTA button).

---

### Learning Objectives
- Master the 4 core 2D transform functions:
  - `translate(x, y)`: Repositions elements without triggering DOM reflow.
  - `scale(x, y)`: Magnifies or shrinks elements uniformly or along individual axes.
  - `rotate(deg)`: Rotates elements around a transform origin.
  - `skew(x, y)`: Angling elements along the X and Y planes.
- Configure smooth transitions using `transition: property duration timing-function delay`.
- Build custom timeline animations with `@keyframes` using percentages (`0%`, `50%`, `100%`).
- Control animation playback: `animation-duration`, `animation-delay`, `animation-iteration-count: infinite`, and `animation-timing-function`.
- Understand hardware acceleration: why animating `transform` and `opacity` runs on the GPU compositor thread for a silky 60fps experience.

---

### File Structure
```text
day-11-animated-landing/
├── index.html       (Landing page featuring animated rocket, spinner, cards, and CTA)
├── styles.css       (Complete motion stylesheet with keyframes and transform rules)
└── README.md        (Curriculum documentation and challenges)
```

---

### How to Run & Test
1. Open `day-11-animated-landing/` in your code editor.
2. Launch `index.html` via Live Server or double-click to open in any browser.
3. **Observe Keyframe Animations in Action**:
   - In the header: A dual-ring cyan spinner rotates infinitely at 60fps.
   - In the hero: An SVG rocket ship glides and tilts along a floating orbital path, while its exhaust flame pulses in size.
   - The orange "Deploy Mission" CTA button emits continuous radial pulse ripples and a repeating light shimmer.
4. **Test Hover Transforms**:
   - Hover over Card 1 to see uniform scaling and elevation.
   - Hover over Card 2 to see subtle card rotation and a full 360-degree icon spin.
   - Hover over Card 3 to see angular card skewing.

---

### Student Challenges
1. **3D Perspective Flip**: Add `perspective: 1000px;` to `.features-section` and `transform: rotateY(180deg);` on card hover to create a 3D card flipping effect.
2. **Rocket Launch Button Interaction**: Using the `:active` pseudo-class on `.btn-launch`, write a rule that catapults the rocket upward off the screen (`transform: translateY(-800px) scale(0.5); transition: transform 1s ease-in;`) when clicked!
3. **Pulsing Star Background**: Create glowing space stars in the hero background using small absolute circular pseudo-elements animated with `opacity: 0.2` to `opacity: 1` keyframes.
