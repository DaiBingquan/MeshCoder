/**
 * Shape Editing Interactive Features
 */
class ShapeEditor {
    constructor() {
        this.meshViewer = null;
        this.codeEditor = null;
        this.currentCode = '';
        this.meshParts = [];
        this.isInitialized = false;
        this.originalMaterials = new Map();
        this.wireframeMaterials = new Map();
        
        // Default code for editing
        this.defaultCode = `# armchair mesh generation
create_primitive(name='back_sofa_board_8', primitive_type='cube', 
                location=[0, -0.101, -0.39], 
                scale=[0.32, 0.1, 0.31])

create_primitive(name='sofa_board_9', primitive_type='cube', 
                location=[0, -0.371, 0.041], 
                scale=[0.33, 0.05, 0.33])

create_primitive(name='cushion_11', primitive_type='cube', 
                location=[0, -0.201, -0.08], 
                scale=[0.42, 0.13, 0.32])

create_curve(name='arm_7', control_points=[
    [[-0.278, 0.218, 0.499], [-0.215, -0.421, 0.499]]
], smoothness=0.75)

create_curve(name='arm_10', control_points=[
    [[0.278, 0.218, 0.499], [0.215, -0.421, 0.499]]
], smoothness=0.75)

create_curve(name='leg_1', control_points=[
    [[-0.39, -0.4, -0.31], [-0.39, -0.48, -0.31]]
], thickness=0.01)

create_curve(name='leg_2', control_points=[
    [[-0.39, -0.4, 0.18], [-0.39, -0.48, 0.18]]
], thickness=0.01)

create_curve(name='leg_3', control_points=[
    [[-0.21, -0.4, 0.26], [-0.21, -0.49, 0.26]]
], thickness=0.01)

create_curve(name='leg_4', control_points=[
    [[0.21, -0.4, 0.26], [0.21, -0.49, 0.26]]
], thickness=0.01)

create_curve(name='leg_5', control_points=[
    [[0.39, -0.4, -0.31], [0.39, -0.48, -0.31]]
], thickness=0.01)

create_curve(name='leg_6', control_points=[
    [[0.39, -0.4, 0.18], [0.39, -0.48, 0.18]]
], thickness=0.01)

# Try changing primitive_type or adjust scale/location values!`;
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeEditor());
        } else {
            this.initializeEditor();
        }
    }
    
    initializeEditor() {
        this.meshViewer = document.getElementById('meshViewer');
        this.codeEditor = document.getElementById('codeEditor');
        
        if (!this.meshViewer || !this.codeEditor) {
            console.log('Shape editing elements not found, skipping initialization');
            return;
        }
        
        this.setupCodeEditor();
        this.setupMeshViewer();
        this.setupEventListeners();
        this.isInitialized = true;
        
        console.log('Shape editor initialized successfully');
    }
    
    setupCodeEditor() {
        this.currentCode = this.defaultCode;
        this.renderCodeInEditor();
    }
    
    renderCodeInEditor() {
        const lines = this.currentCode.split('\n');
        let html = '';
        
        lines.forEach((line, index) => {
            const lineNumber = index + 1;
            const highlightedLine = this.applySyntaxHighlighting(line);
            html += `<div class="code-line" data-line="${lineNumber}" contenteditable="true">${highlightedLine}</div>`;
        });
        
        this.codeEditor.innerHTML = html;
        this.setupCodeLineEvents();
    }
    
    applySyntaxHighlighting(line) {
        let highlighted = line;
        
        // Keywords
        highlighted = highlighted.replace(/\b(create_primitive|create_curve|create_circle|bridge_edge_loops|bevel)\b/g, 
            '<span class="editor-function">$1</span>');
        
        // Parameters
        highlighted = highlighted.replace(/\b(name|primitive_type|location|scale|rotation|control_points|thickness)\b/g, 
            '<span class="editor-variable">$1</span>');
        
        // Strings
        highlighted = highlighted.replace(/'([^']*?)'/g, '<span class="editor-string">\'$1\'</span>');
        
        // Numbers
        highlighted = highlighted.replace(/\b(\-?\d+\.?\d*)\b/g, '<span class="editor-number">$1</span>');
        
        // Comments
        highlighted = highlighted.replace(/(#.*$)/g, '<span class="editor-comment">$1</span>');
        
        return highlighted;
    }
    
    setupCodeLineEvents() {
        const codeLines = this.codeEditor.querySelectorAll('.code-line');
        
        codeLines.forEach((line, index) => {
            // Enhanced hover highlighting
            line.addEventListener('mouseenter', () => {
                this.highlightMeshPart(index);
                line.classList.add('code-hover');
            });
            line.addEventListener('mouseleave', () => {
                this.unhighlightMeshPart();
                line.classList.remove('code-hover');
            });
            
            // Click focusing with better visual feedback
            line.addEventListener('click', () => {
                this.focusMeshPart(index);
                this.highlightMeshPart(index);
            });
            
            // Content editing
            line.addEventListener('input', () => this.onCodeChange());
            line.addEventListener('keydown', (e) => this.handleKeyDown(e, line));
        });
    }
    
    handleKeyDown(e, line) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Create new line
            const newLine = document.createElement('div');
            newLine.className = 'code-line';
            newLine.contentEditable = true;
            newLine.innerHTML = '';
            
            line.parentNode.insertBefore(newLine, line.nextSibling);
            newLine.focus();
            this.setupCodeLineEvents();
        }
    }
    
    setupMeshViewer() {
        if (this.meshViewer) {
            this.meshViewer.addEventListener('load', () => {
                console.log('3D model loaded successfully');
                this.identifyMeshParts();
                this.indexMeshObjects();
                this.setupMeshHoverInteractions();
            });
            
            // Add mesh interaction events
            this.meshViewer.addEventListener('click', (event) => {
                this.onMeshClick(event);
            });
        }
    }

    setupMeshHoverInteractions() {
        if (this.meshViewer) {
            let hoverTimeout;
            let currentHoveredMesh = null;

            // Add mouse move event for hover detection
            this.meshViewer.addEventListener('mousemove', (event) => {
                clearTimeout(hoverTimeout);
                hoverTimeout = setTimeout(() => {
                    this.detectHoveredMesh(event);
                }, 100); // Debounce to avoid too frequent calls
            });

            this.meshViewer.addEventListener('mouseleave', () => {
                clearTimeout(hoverTimeout);
                this.unhighlightAllMeshParts();
            });
        }
    }

    detectHoveredMesh(event) {
        try {
            const rect = this.meshViewer.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Use model-viewer's built-in hit testing
            const hit = this.meshViewer.positionAndNormalFromPoint(x, y);
            
            if (hit) {
                const hoveredMeshName = this.findNearestMesh(hit.position);
                
                if (hoveredMeshName && hoveredMeshName !== this.currentHoveredMesh) {
                    // Clear previous highlights
                    this.unhighlightAllMeshParts();
                    
                    // Highlight new mesh and corresponding code
                    this.highlightMeshAndCode(hoveredMeshName);
                    this.currentHoveredMesh = hoveredMeshName;
                }
            } else if (this.currentHoveredMesh) {
                this.unhighlightAllMeshParts();
                this.currentHoveredMesh = null;
            }
        } catch (error) {
            // Silently handle errors to avoid console spam
        }
    }

    highlightMeshAndCode(meshName) {
        // Highlight the mesh object
        this.highlightMeshObject(meshName);
        
        // Find and highlight corresponding code line
        const meshPart = this.meshParts.find(part => part.name === meshName);
        if (meshPart) {
            const lines = this.codeEditor.querySelectorAll('.code-line');
            if (lines[meshPart.lineIndex]) {
                lines[meshPart.lineIndex].classList.add('mesh-highlighted');
            }
        }
    }

    unhighlightAllMeshParts() {
        // Remove code highlights
        const highlightedLines = this.codeEditor.querySelectorAll('.mesh-highlighted');
        highlightedLines.forEach(line => line.classList.remove('mesh-highlighted'));
        
        // Restore original mesh materials
        if (this.currentHighlightedMesh && this.meshObjects && this.originalMaterials) {
            const meshObject = this.meshObjects[this.currentHighlightedMesh];
            const originalMaterial = this.originalMaterials.get(meshObject.uuid);
            
            if (meshObject && originalMaterial) {
                meshObject.material = originalMaterial;
            }
        }
        this.currentHighlightedMesh = null;
    }

    indexMeshObjects() {
        // Wait a bit for model-viewer to fully initialize
        setTimeout(() => {
            try {
                // Access the Three.js scene from model-viewer
                const scene = this.meshViewer.model;
                this.meshObjects = {};
                
                if (scene) {
                    scene.traverse((child) => {
                        if (child.isMesh && child.name) {
                            this.meshObjects[child.name] = child;
                            // Store original material for restoration using UUID as key
                            this.originalMaterials.set(child.uuid, child.material.clone());
                            console.log(`Indexed mesh: ${child.name}`);
                        }
                    });
                    console.log('Mesh objects indexed:', Object.keys(this.meshObjects));
                } else {
                    console.warn('Could not access model scene');
                }
            } catch (error) {
                console.warn('Error indexing mesh objects:', error);
                // Fallback to simulation mode
                this.meshObjects = {};
            }
        }, 1000);
    }
    
    setupEventListeners() {
        const executeBtn = document.getElementById('executeCodeBtn');
        const resetCodeBtn = document.getElementById('resetCodeBtn');
        const resetViewBtn = document.getElementById('resetViewBtn');
        const wireframeBtn = document.getElementById('wireframeBtn');
        
        if (executeBtn) {
            executeBtn.addEventListener('click', () => this.executeCode());
        }
        
        if (resetCodeBtn) {
            resetCodeBtn.addEventListener('click', () => this.resetCode());
        }
        
        if (resetViewBtn) {
            resetViewBtn.addEventListener('click', () => this.resetView());
        }
        
        if (wireframeBtn) {
            wireframeBtn.addEventListener('click', () => this.toggleWireframe());
        }
    }
    
    identifyMeshParts() {
        // Simulate mesh part identification
        this.meshParts = [
            { name: 'back_sofa_board_8', lineIndex: 1 },
            { name: 'sofa_board_9', lineIndex: 2 },
            { name: 'cushion_11', lineIndex: 3 },
            { name: 'arm_7', lineIndex: 4 },
            { name: 'arm_10', lineIndex: 5 },
            { name: 'leg_1', lineIndex: 6 },
            { name: 'leg_2', lineIndex: 7 },
            { name: 'leg_3', lineIndex: 8 },
            { name: 'leg_4', lineIndex: 9 },
            { name: 'leg_5', lineIndex: 10 },
            { name: 'leg_6', lineIndex: 11 }
        ];
    }
    
    highlightMeshPart(lineIndex) {
        // Remove existing highlights
        this.unhighlightMeshPart();
        
        // Add highlight to current line
        const lines = this.codeEditor.querySelectorAll('.code-line');
        if (lines[lineIndex]) {
            lines[lineIndex].classList.add('mesh-highlighted');
        }
        
        // Find the mesh part for this line
        const meshPart = this.meshParts.find(part => part.lineIndex === lineIndex);
        if (meshPart && this.meshObjects && this.meshObjects[meshPart.name]) {
            this.highlightMeshObject(meshPart.name);
            console.log(`Highlighting mesh: ${meshPart.name} at line ${lineIndex + 1}`);
        } else {
            console.log(`Highlighting line ${lineIndex + 1} (mesh not found)`);
        }
    }

    highlightMeshObject(meshName) {
        const meshObject = this.meshObjects[meshName];
        if (meshObject) {
            // Store current highlighted mesh for cleanup
            this.currentHighlightedMesh = meshName;
            
            // Create highlight material
            const highlightMaterial = meshObject.material.clone();
            highlightMaterial.emissive.setHex(0x444444); // Add blue glow
            highlightMaterial.color.multiplyScalar(1.2); // Brighten the color
            
            // Apply highlight
            meshObject.material = highlightMaterial;
        }
    }
    
    unhighlightMeshPart() {
        const highlightedLines = this.codeEditor.querySelectorAll('.mesh-highlighted');
        highlightedLines.forEach(line => line.classList.remove('mesh-highlighted'));
        
        // Restore original mesh material
        if (this.currentHighlightedMesh && this.meshObjects && this.originalMaterials) {
            const meshObject = this.meshObjects[this.currentHighlightedMesh];
            const originalMaterial = this.originalMaterials.get(meshObject.uuid);
            
            if (meshObject && originalMaterial) {
                meshObject.material = originalMaterial;
            }
            this.currentHighlightedMesh = null;
        }
    }
    
    focusMeshPart(lineIndex) {
        const lines = this.codeEditor.querySelectorAll('.code-line');
        if (lines[lineIndex]) {
            lines[lineIndex].classList.add('highlighted');
            setTimeout(() => {
                lines[lineIndex].classList.remove('highlighted');
            }, 2000);
        }
        
        console.log(`Focusing on mesh part at line ${lineIndex + 1}`);
    }
    
    onMeshClick(event) {
        console.log('Mesh clicked, detecting intersected part');
        
        try {
            // Get intersection data from model-viewer
            const rect = this.meshViewer.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Use model-viewer's built-in hit testing
            const hit = this.meshViewer.positionAndNormalFromPoint(x, y);
            
            if (hit) {
                // Try to find which mesh was clicked by checking proximity to mesh positions
                let clickedMeshName = this.findNearestMesh(hit.position);
                
                if (clickedMeshName) {
                    // Find the corresponding code line
                    const meshPart = this.meshParts.find(part => part.name === clickedMeshName);
                    if (meshPart) {
                        this.focusMeshPart(meshPart.lineIndex);
                        console.log(`Clicked mesh: ${clickedMeshName}, highlighting line ${meshPart.lineIndex + 1}`);
                        return;
                    }
                }
            }
        } catch (error) {
            console.warn('Could not detect clicked mesh part:', error);
        }
        
        // Fallback: highlight a relevant line based on mesh parts
        const randomIndex = Math.floor(Math.random() * this.meshParts.length);
        this.focusMeshPart(this.meshParts[randomIndex].lineIndex);
    }

    findNearestMesh(clickPosition) {
        if (!this.meshObjects) return null;
        
        let nearestMesh = null;
        let minDistance = Infinity;
        
        // Check distance to each mesh object
        for (const [meshName, meshObject] of Object.entries(this.meshObjects)) {
            const meshPos = meshObject.position;
            const distance = Math.sqrt(
                Math.pow(clickPosition.x - meshPos.x, 2) +
                Math.pow(clickPosition.y - meshPos.y, 2) +
                Math.pow(clickPosition.z - meshPos.z, 2)
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestMesh = meshName;
            }
        }
        
        return nearestMesh;
    }
    
    onCodeChange() {
        // Update current code from editor
        const lines = this.codeEditor.querySelectorAll('.code-line');
        const codeLines = Array.from(lines).map(line => line.textContent);
        this.currentCode = codeLines.join('\n');
        
        console.log('Code changed, auto-save enabled');
    }
    
    executeCode() {
        console.log('Executing updated code...');
        
        // Get current code from editor
        const lines = this.codeEditor.querySelectorAll('.code-line');
        const codeLines = Array.from(lines).map(line => line.textContent);
        this.currentCode = codeLines.join('\n');
        
        // Show execution feedback
        this.showExecutionFeedback();
        
        // Parse and simulate code changes
        const codeChanges = this.parseCodeChanges();
        if (codeChanges.length > 0) {
            this.applyMeshChanges(codeChanges);
        } else {
            this.simulateMeshUpdate();
        }
        
        console.log('Code execution completed:', this.currentCode);
    }

    parseCodeChanges() {
        const changes = [];
        const lines = this.currentCode.split('\n');
        
        lines.forEach((line, index) => {
            // Detect parameter changes in the code
            if (line.includes('primitive_type=')) {
                const primitiveMatch = line.match(/primitive_type=['"]([^'"]+)['"]/);
                if (primitiveMatch) {
                    changes.push({
                        type: 'primitive_change',
                        lineIndex: index,
                        value: primitiveMatch[1],
                        line: line
                    });
                }
            }
            
            if (line.includes('scale=')) {
                const scaleMatch = line.match(/scale=\[([^\]]+)\]/);
                if (scaleMatch) {
                    changes.push({
                        type: 'scale_change',
                        lineIndex: index,
                        value: scaleMatch[1],
                        line: line
                    });
                }
            }
            
            if (line.includes('location=')) {
                const locationMatch = line.match(/location=\[([^\]]+)\]/);
                if (locationMatch) {
                    changes.push({
                        type: 'location_change',
                        lineIndex: index,
                        value: locationMatch[1],
                        line: line
                    });
                }
            }
        });
        
        return changes;
    }

    applyMeshChanges(changes) {
        console.log('Applying mesh changes:', changes);
        
        // Visual feedback for changes
        changes.forEach(change => {
            const lines = this.codeEditor.querySelectorAll('.code-line');
            if (lines[change.lineIndex]) {
                lines[change.lineIndex].classList.add('code-executed');
                setTimeout(() => {
                    lines[change.lineIndex].classList.remove('code-executed');
                }, 2000);
            }
        });
        
        // Simulate mesh transformation
        this.simulateAdvancedMeshUpdate(changes);
    }

    simulateAdvancedMeshUpdate(changes) {
        if (this.meshViewer) {
            // More realistic simulation based on actual changes
            let animationSteps = [];
            
            changes.forEach(change => {
                switch (change.type) {
                    case 'primitive_change':
                        animationSteps.push(() => this.simulatePrimitiveChange(change.value));
                        break;
                    case 'scale_change':
                        animationSteps.push(() => this.simulateScaleChange(change.value));
                        break;
                    case 'location_change':
                        animationSteps.push(() => this.simulateLocationChange(change.value));
                        break;
                }
            });
            
            // Execute animation steps sequentially
            this.executeAnimationSequence(animationSteps);
        }
    }

    executeAnimationSequence(steps) {
        let currentStep = 0;
        const executeNext = () => {
            if (currentStep < steps.length) {
                steps[currentStep]();
                currentStep++;
                setTimeout(executeNext, 800);
            }
        };
        executeNext();
    }

    simulatePrimitiveChange(primitiveType) {
        console.log(`Simulating primitive change to: ${primitiveType}`);
        // Brief camera movement to simulate geometry change
        const currentOrbit = this.meshViewer.cameraOrbit;
        this.meshViewer.cameraOrbit = '60deg 80deg 2.2m';
        setTimeout(() => {
            this.meshViewer.cameraOrbit = currentOrbit || '45deg 75deg 2.5m';
        }, 600);
    }

    simulateScaleChange(scaleValues) {
        console.log(`Simulating scale change to: ${scaleValues}`);
        // Zoom in/out to simulate scale change
        const currentOrbit = this.meshViewer.cameraOrbit;
        this.meshViewer.cameraOrbit = '45deg 75deg 3.0m';
        setTimeout(() => {
            this.meshViewer.cameraOrbit = currentOrbit || '45deg 75deg 2.5m';
        }, 600);
    }

    simulateLocationChange(locationValues) {
        console.log(`Simulating location change to: ${locationValues}`);
        // Pan camera to simulate position change
        const currentTarget = this.meshViewer.cameraTarget;
        this.meshViewer.cameraTarget = '0.2m 0.1m 0m';
        setTimeout(() => {
            this.meshViewer.cameraTarget = currentTarget || '0m 0m 0m';
        }, 600);
    }
    
    simulateMeshUpdate() {
        // Simulate mesh update with a brief rotation animation
        if (this.meshViewer) {
            const currentOrbit = this.meshViewer.cameraOrbit;
            this.meshViewer.cameraOrbit = '45deg 75deg 2m';
            
            setTimeout(() => {
                this.meshViewer.cameraOrbit = currentOrbit || 'auto';
            }, 1000);
        }
    }
    
    showExecutionFeedback() {
        const executeBtn = document.getElementById('executeCodeBtn');
        if (executeBtn) {
            const originalText = executeBtn.innerHTML;
            executeBtn.innerHTML = '<span class="icon"><i class="fas fa-check"></i></span><span>Updated!</span>';
            executeBtn.classList.add('is-success');
            
            setTimeout(() => {
                executeBtn.innerHTML = originalText;
            }, 2000);
        }
    }
    
    resetCode() {
        this.currentCode = this.defaultCode;
        this.renderCodeInEditor();
        console.log('Code reset to default');
    }
    
    resetView() {
        if (this.meshViewer) {
            this.meshViewer.cameraTarget = 'auto';
            this.meshViewer.cameraOrbit = 'auto';
            this.meshViewer.fieldOfView = 'auto';
        }
        console.log('View reset to default');
    }
    
    toggleWireframe() {
        if (!this.meshViewer) return;
        
        const wireframeBtn = document.getElementById('wireframeBtn');
        if (!wireframeBtn) return;
        
        // Toggle button state
        const isWireframe = wireframeBtn.classList.toggle('is-active');
        wireframeBtn.textContent = isWireframe ? 'Solid View' : 'Toggle Wireframe';
        
        // Wait for model to be fully loaded
        if (!this.meshViewer.model) {
            console.log('Model not loaded yet, trying again...');
            setTimeout(() => this.toggleWireframe(), 500);
            return;
        }
        
        // Apply wireframe to all meshes in the scene
        this.applyWireframeToScene(isWireframe);
        
        console.log(`Wireframe mode: ${isWireframe ? 'ON' : 'OFF'}`);
    }
    
    applyWireframeToScene(enableWireframe) {
        try {
            const scene = this.meshViewer.model;
            if (!scene) return;
            
            // Store wireframe materials if not already created
            if (!this.wireframeMaterials) {
                this.wireframeMaterials = new Map();
            }
            
            scene.traverse((child) => {
                if (child.isMesh && child.material) {
                    this.applyWireframeToMesh(child, enableWireframe);
                }
            });
            
        } catch (error) {
            console.warn('Error applying wireframe:', error);
        }
    }
    
    applyWireframeToMesh(mesh, enableWireframe) {
        const meshId = mesh.uuid;
        
        if (enableWireframe) {
            // Store original material if not already stored
            if (!this.originalMaterials) {
                this.originalMaterials = new Map();
            }
            if (!this.originalMaterials.has(meshId)) {
                this.originalMaterials.set(meshId, mesh.material);
            }
            
            // Create or get wireframe material
            let wireframeMaterial;
            if (this.wireframeMaterials.has(meshId)) {
                wireframeMaterial = this.wireframeMaterials.get(meshId);
            } else {
                // Create wireframe material based on original material
                wireframeMaterial = mesh.material.clone();
                wireframeMaterial.wireframe = true;
                wireframeMaterial.color.setHex(0x000000); // Black wireframe
                wireframeMaterial.transparent = true;
                wireframeMaterial.opacity = 0.8;
                
                // If it's a textured material, remove texture for cleaner wireframe
                if (wireframeMaterial.map) {
                    wireframeMaterial.map = null;
                }
                if (wireframeMaterial.normalMap) {
                    wireframeMaterial.normalMap = null;
                }
                
                this.wireframeMaterials.set(meshId, wireframeMaterial);
            }
            
            mesh.material = wireframeMaterial;
            
        } else {
            // Restore original material
            if (this.originalMaterials && this.originalMaterials.has(meshId)) {
                mesh.material = this.originalMaterials.get(meshId);
            }
        }
        
        // Force material update
        mesh.material.needsUpdate = true;
    }
}

// Initialize shape editor when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure CodeAnimator initializes first
    setTimeout(() => {
        new ShapeEditor();
    }, 100);
}); 