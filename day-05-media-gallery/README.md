# Day 5: HTML5 Multimedia and SVG

## Mini Project: Online Learning Media Gallery

An interactive multimedia showcase demonstrating native video/audio streaming, YouTube embedding with `<iframe>`, external resource embedding via `<embed>`, and mathematical vector illustrations using inline SVG `<circle>` and `<rect>`.

---

### Learning Objectives
- Embed video and audio streams natively with `<video>` and `<audio>`, providing multiple codec fallback formats with `<source>`.
- Configure media attributes: `controls`, `poster`, `preload`, `autoplay`, `muted`, and `loop`.
- Safely embed third-party web documents and YouTube players with `<iframe>`, `loading="lazy"`, and sandbox permissions.
- Embed external interactive resources using `<embed>`.
- Understand Scalable Vector Graphics (SVG) architecture and its infinite resolution scaling benefits.
- Draw vector shapes directly in HTML5 using SVG `<rect>` and `<circle>`.

---

### File Structure
```text
day-05-media-gallery/
├── index.html       (Multimedia gallery with video, audio, iframe, embed, and SVG)
├── styles.css       (Responsive card layout and media constraints)
└── README.md        (Curriculum notes and student challenges)
```

---

### How to Run & Test
1. Open the `day-05-media-gallery/` folder in your code editor.
2. Launch `index.html` via Live Server or double-click to open in any web browser.
3. Test native media controls:
   - Hit play on the video player; observe picture-in-picture, volume sliders, and full-screen toggles rendered by your browser.
   - Hit play on the audio player; note the fallback audio support.
   - Play the embedded YouTube video; inspect the `allow` attributes and `loading="lazy"`.
   - Inspect the SVG shapes in DevTools; zoom in to 500% in your browser and notice how SVG vectors never pixelate!

---

### Student Challenges
1. **SVG Polygon Addition**: Add an SVG `<polygon>` inside the graphics box to create a golden star or a triangle.
2. **Video Captions & Subtitles**: Research and add a `<track>` element inside `<video>` referencing a `.vtt` WebVTT caption file.
3. **SVG Hover Effect**: In `styles.css`, write a simple hover selector for the SVG shapes (`circle:hover { fill: #ec4899; }`) to observe vector interactivity.
