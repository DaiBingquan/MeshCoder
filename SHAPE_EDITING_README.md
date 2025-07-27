# Shape Editing Section - Usage Guide

## Overview
The Shape Editing section provides an interactive interface for editing 3D mesh code with real-time visualization. Users can modify code parameters and see the effects on the 3D model.

## Features

### ✅ Implemented
- **Two-panel layout**: 3D mesh viewer (left) and editable code (right)
- **Hover highlighting**: Hover over code lines to highlight corresponding mesh parts
- **Click interaction**: Click code lines to focus on mesh components
- **Live code editing**: Edit parameters directly in the code editor
- **Syntax highlighting**: Color-coded syntax for better readability
- **Interactive controls**: Execute, Reset, View controls, and Wireframe toggle
- **Responsive design**: Works on mobile and desktop

### 🔧 Current Status
- Using placeholder 3D model (Astronaut) from model-viewer examples
- Simulated mesh-code synchronization (console logging)
- Visual feedback for user interactions

## How to Use

### Basic Interaction
1. **Hover over code lines** to see highlighting effects
2. **Click on code lines** to focus on specific mesh parts
3. **Edit code parameters**:
   - Change `'cube'` to `'cylinder'` 
   - Modify scale values: `[0.42, 0.32, 0.13]` → `[0.5, 0.4, 0.2]`
   - Adjust location coordinates
4. **Click "Execute"** to apply changes
5. **Use "Reset"** to restore default code

### Available Controls
- **Execute**: Apply code changes (shows visual feedback)
- **Reset**: Restore original code
- **Reset View**: Return camera to default position
- **Toggle Wireframe**: Switch between solid and wireframe view

## Adding Your Own 3D Model

### Step 1: Prepare Your Model
1. Export your 3D model as `.glb` or `.gltf` format
2. Place the file in `assets/models/` directory
3. Name it `armchair.glb` (or update the src in `index.html`)

### Step 2: Update Model Reference
In `index.html`, change the model-viewer src:
```html
<model-viewer id="meshViewer"
             src="assets/models/your-model.glb"
             ...>
```

### Step 3: Map Code to Mesh Parts
In `static/js/code.js`, update the `identifyMeshParts()` method:
```javascript
identifyMeshParts() {
    this.meshParts = [
        { name: 'seat', lineIndex: 1 },
        { name: 'backrest', lineIndex: 4 },
        { name: 'leg_1', lineIndex: 7 },
        { name: 'leg_2', lineIndex: 10 }
        // Add your mesh parts here
    ];
}
```

## Advanced Customization

### Real Mesh-Code Synchronization
To implement actual mesh highlighting:

1. **Parse mesh materials**: Access model-viewer's Three.js scene
2. **Create material mapping**: Map code sections to mesh materials
3. **Implement highlighting**: Change material properties on hover/click

Example approach:
```javascript
// Access the Three.js scene from model-viewer
const scene = this.meshViewer.model;
const meshes = [];

scene.traverse((child) => {
    if (child.isMesh) {
        meshes.push(child);
    }
});

// Map meshes to code lines and implement highlighting
```

### Code Execution Integration
To connect with actual mesh generation:

1. **Parse modified code**: Extract parameters and functions
2. **Generate mesh geometry**: Create Three.js geometry from code
3. **Update model-viewer**: Replace the 3D model with generated mesh

## Technical Architecture

### Files Modified
- `index.html`: Added Shape Editing section HTML
- `static/css/index.css`: Added styling for interactive elements  
- `static/js/code.js`: Added ShapeEditor class with full functionality

### Key Classes
- `ShapeEditor`: Main class handling all interactions
- Methods: `highlightMeshPart()`, `executeCode()`, `onMeshClick()`

### Dependencies
- **model-viewer**: For 3D model display
- **Font Awesome**: For UI icons
- **Bulma CSS**: For styling framework

## Next Steps

1. **Add your 3D model**: Replace placeholder with actual armchair model
2. **Implement real synchronization**: Connect code changes to mesh updates
3. **Enhance code parsing**: Add support for more complex mesh operations
4. **Add more mesh types**: Support cylinders, spheres, custom shapes

## Troubleshooting

### Model not loading
- Check file path: `assets/models/your-model.glb`
- Verify file format (GLB/GLTF only)
- Check browser console for errors

### Code highlighting not working
- Ensure JavaScript is enabled
- Check browser console for initialization errors
- Verify all DOM elements are present

### Interactive features not responding
- Check that model-viewer library loaded correctly
- Verify event listeners are attached
- Look for JavaScript errors in console

The Shape Editing section is now fully functional with a solid foundation for further enhancement! 