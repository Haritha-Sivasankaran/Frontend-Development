# Day 2: HTML Content, Images, Lists, Classes, IDs, and Links

## Mini Project: Multi-Page Student Portfolio Website

An interconnected 4-page portfolio website demonstrating document linkage, anchor jumps, lists, formatting, block vs. inline elements, and organizational `class` and `id` naming.

---

### Learning Objectives
- Differentiate between Block-level elements and Inline elements.
- Implement relative hyperlinks to connect multiple pages (`index.html`, `about.html`, `skills.html`, `contact.html`).
- Use `id` attributes for unique identifiers and in-page anchor jumps (`href="#section"`).
- Use `class` attributes for repeatable component categorization.
- Implement accessible images using `<img>`, `alt`, and `<figure>` / `<figcaption>`.
- Configure special hyperlinks (`mailto:`, `tel:`, and external links with `target="_blank"` and `rel="noopener noreferrer"`).

---

### File Structure
```text
day-02-portfolio-website/
├── index.html       (Home page)
├── about.html       (Bio, education timeline, philosophy)
├── skills.html      (Categorized skills, anchor jumps, projects)
├── contact.html     (Direct email/tel, social links, address)
└── README.md        (Lesson guide and challenges)
```

---

### How to Run
1. Open the `day-02-portfolio-website/` directory in your editor.
2. Open `index.html` with Live Server or double-click to launch in any browser.
3. Use the navigation bar at the top of every page to navigate seamlessly across all four pages.
4. On `skills.html`, test the in-page jump links ("Jump to Developer Tools", etc.) to verify instant smooth scrolling to section IDs.

---

### Student Challenges
1. **Downloadable Resume Link**: Add an anchor tag in `about.html` or `skills.html` with the `download` attribute to simulate downloading a resume file (e.g., `<a href="resume.pdf" download>Download PDF Resume</a>`).
2. **Back to Top Anchor**: Add a `<a href="#page-skills">Back to Top &uarr;</a>` link at the bottom of each section in `skills.html` to help users jump back up to the top navigation.
3. **Table of Contents Expansion**: Add a new section in `about.html` for "Volunteering" with an `id="volunteering"`, and add a corresponding anchor link in the intro text.
