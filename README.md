# MeshLLM 

## Project Purpose
This project is a modular, browser-based demo for LLM-powered 3D mesh code generation and editing. It demonstrates how point clouds can be converted to editable Blender Python code, visualized, and semantically analyzed—all in the browser. The codebase is structured for rapid prototyping, extension, and collaborative development.

---

## Architecture & Key Modules
- **index.html**: Main entry point. Defines all UI sections, loads Bulma, FontAwesome, and custom JS/CSS. Orchestrates the mesh/code/analysis workflow.
- **static/js/**: All interactive logic. Key files:
  - `editing.js`: Shape editing logic (code-mesh sync, code editor, mesh viewer controls)
  - `understanding.js`: Shape understanding/analysis logic (Q&A, code highlighting)
  - `three-viewer.js`: 3D mesh rendering and interaction (Three.js abstraction)
  - `code.js`: Code display, syntax highlighting, and code block mapping
- **static/css/**: Modular styles for each section (editing, understanding, code display)
- **assets/models/**: 3D models in `.glb`/`.gltf` format (default: `sofa.glb`)

---

## Shape Editing Section 

### Features
- Two-panel layout: 3D mesh viewer and editable code
- Hover/click code lines to highlight/focus mesh parts
- Live code editing with syntax highlighting
- Controls: Execute, Reset, Reset View, Wireframe toggle
- Responsive design

### How to Use/Extend
- **Edit code parameters** in the code editor (e.g., change `'cube'` to `'cylinder'`, adjust scale/location)
- **Click Execute** to apply changes; Reset to restore defaults
- **Hover/click** code lines to highlight/focus mesh parts
- **Add your own 3D model**:
  1. Export as `.glb`/`.gltf`, place in `assets/models/` (e.g., `sofa.glb`)
  2. Update the model source in `index.html`:
     ```html
     <model-viewer id="meshViewer" src="assets/models/your-model.glb" ...>
     ```
  3. Map code to mesh parts in `static/js/code.js` (see below)

#### Example: Mapping Code to Mesh Parts
In `static/js/code.js`, update the mesh-code mapping:
```js
identifyMeshParts() {
    this.meshParts = [
        { name: 'seat', lineIndex: 1 },
        { name: 'backrest', lineIndex: 4 },
        { name: 'leg_1', lineIndex: 7 },
        // ...
    ];
}
```

#### Example: Changing the Example Code
- In `editing.js` or `understanding.js`, update the `defaultCode` or `sofaCode` string to your new code block.
- For more advanced changes, update the code parsing and mesh generation logic in `editing.js`.

---

## Shape Understanding (Q&A) Section
- Q&A logic is in `static/js/understanding.js`.
- To change or add questions/answers:
  1. Update the HTML Q&A block in `index.html` (search for `questionSet`)
  2. Update the answer logic in `understanding.js` (see `handleQuestion` and answer mapping)

#### Example: Adding a New Q&A
In `index.html`:
```html
<div class="qa-item" data-question="new_feature">
  <div class="question">
    <span class="question-icon">Q:</span>
    <span class="question-text">How is the new feature constructed?</span>
    <button class="ask-button" data-target="new_feature">Ask</button>
  </div>
  <div class="answer" id="answer-new_feature" style="display: none;">
    <div class="answer-content">
      <span class="answer-icon">🤖</span>
      <span class="answer-text">[Your answer here]</span>
    </div>
  </div>
</div>
```
In `understanding.js`, add logic to return the new answer for `new_feature`.

---

## Advanced Customization
- For real mesh-code synchronization, extend the Three.js logic in `three-viewer.js` and mesh-code mapping in `editing.js`.
- To support new mesh types or code primitives, update the code parsing and mesh generation logic.
- For UI/UX changes, edit the relevant section in `index.html` and corresponding CSS/JS modules.

---

## Collaboration Notes
- All logic is modular and sectioned for easy extension.
- When adding new features, keep code and mesh mapping explicit for maintainability.
- For new 3D cases, ensure code is semantically segmented for best LLM analysis results.
- See inline comments in JS files for extension points.

---

## Troubleshooting
- **Model not loading**: Check path/format in `assets/models/`, update `index.html` src.
- **Code highlighting not working**: Ensure JS is enabled, check for DOM/initialization errors.
- **Interactive features not responding**: Verify all scripts and event listeners are loaded, check browser console.

---

## Maintenance
- This README now integrates all content from the former `SHAPE_EDITING_README.md`, which has been deleted for clarity and single-source documentation. 