# Day 4: HTML Forms and Native Validation

## Mini Project: Student Registration Portal

A complete, production-grade student admission form powered entirely by HTML5 semantic input types, grouping containers, and native constraint validation without JavaScript.

---

### Learning Objectives
- Construct robust forms using `<form>`, `<fieldset>`, `<legend>`, and accessible `<label>` pairing.
- Utilize specialized HTML5 input types: `text`, `email`, `password`, `number`, `date`, `radio`, `checkbox`, `range`, `tel`, `url`, and `file`.
- Implement native HTML5 validation constraints: `required`, `minlength`, `maxlength`, `min`, `max`, `step`, and RegEx `pattern`.
- Understand the technical differences between HTTP `GET` and `POST` methods.
- Implement autocomplete datalists with `<datalist>` and reactive display with `<output>`.
- Differentiate between `<progress>` (task completion) and `<meter>` (scalar measurement within a known range).

---

### File Structure
```text
day-04-student-registration/
├── index.html       (Registration form with native HTML5 validation constraints)
├── styles.css       (Clean responsive form layout and user-valid/invalid feedback)
└── README.md        (Curriculum documentation and challenges)
```

---

### How to Run & Test
1. Open the `day-04-student-registration/` folder in your code editor.
2. Launch `index.html` via Live Server or open it directly in Google Chrome / Firefox.
3. **Test Validation Constraints**:
   - Hit "Submit Registration Application" with blank fields; observe native browser error tooltips.
   - Enter a password with fewer than 8 characters or lacking an uppercase letter/digit; observe regex `pattern` validation.
   - In the "State" field, begin typing "Cal" or double-click to see `<datalist>` native autocomplete dropdown options.
   - Adjust the programming proficiency range slider and watch the `<output>` counter update dynamically.
   - Fill out all required fields and submit to verify data transmission to `https://httpbin.org/post`.

---

### Student Challenges
1. **Zip Code Pattern Constraint**: Add a "Postal / ZIP Code" input using `pattern="[0-9]{5,6}"` that enforces 5 or 6 digits.
2. **File Size and Type Constraint**: Modify the photo upload input to restrict multiple file types using `accept=".jpg,.jpeg,.png,.pdf"` and add an upload for transcripts.
3. **Reset Confirmation Warning**: Notice how `<button type="reset">` immediately clears all inputs. Add a simple text disclaimer reminding users that the reset button wipes all filled sections.
