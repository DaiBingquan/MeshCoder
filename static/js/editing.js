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
        this.currentHighlightedFunction = null;
        
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
        // Parse code into individual functions first
        this.identifyMeshParts();
        
        // Create function blocks instead of single textarea
        let html = '';
        const lines = this.currentCode.split('\n');
        
        // Add comment block at the top if it exists
        let currentIndex = 0;
        while (currentIndex < lines.length && lines[currentIndex].trim().startsWith('#')) {
            if (currentIndex === 0) {
                html += '<div class="code-comment-block">';
            }
            html += `<div class="code-line">${this.applySyntaxHighlightingToLine(lines[currentIndex])}</div>`;
            currentIndex++;
        }
        if (currentIndex > 0) {
            html += '</div>';
        }
        
        // Create function blocks
        this.meshParts.forEach((meshPart, index) => {
            const functionLines = lines.slice(meshPart.startLine, meshPart.endLine + 1);
            const functionCode = functionLines.join('\n');
            
            const functionType = this.getFunctionType(functionLines[0]);
            html += `
                <div class="code-function-block" data-mesh-name="${meshPart.name}" data-function-index="${index}">
                    <div class="function-header">
                        <span class="function-name">${meshPart.name}</span>
                        <span class="function-type ${functionType}">${functionType}</span>
                    </div>
                    <textarea class="function-code-area" spellcheck="false">${functionCode}</textarea>
                    <div class="function-syntax-overlay">${this.applySyntaxHighlightingToBlock(functionCode)}</div>
                </div>
            `;
        });
        
        // Add any remaining lines (like final comment)
        if (currentIndex < lines.length) {
            const remainingLines = lines.slice(this.meshParts[this.meshParts.length - 1].endLine + 1);
            if (remainingLines.some(line => line.trim())) {
                html += '<div class="code-comment-block">';
                remainingLines.forEach(line => {
                    html += `<div class="code-line">${this.applySyntaxHighlightingToLine(line)}</div>`;
                });
                html += '</div>';
            }
        }
        
        this.codeEditor.innerHTML = html;
        this.setupFunctionBlockEvents();
    }

    getFunctionType(firstLine) {
        if (firstLine.includes('create_primitive')) return 'primitive';
        if (firstLine.includes('create_curve')) return 'curve';
        if (firstLine.includes('create_circle')) return 'circle';
        return 'function';
    }

    setupFunctionBlockEvents() {
        const functionBlocks = this.codeEditor.querySelectorAll('.code-function-block');
        
        functionBlocks.forEach(block => {
            const meshName = block.dataset.meshName;
            const textarea = block.querySelector('.function-code-area');
            
            // Hover events for highlighting
            block.addEventListener('mouseenter', () => {
                this.highlightMeshPartByName(meshName);
                this.highlightCodeFunctionBlock(block);
            });
            
            block.addEventListener('mouseleave', () => {
                this.unhighlightMeshPart();
            });
            
            // Code editing events
            if (textarea) {
                textarea.addEventListener('input', () => this.onFunctionCodeChange(block));
                textarea.addEventListener('scroll', () => this.syncFunctionOverlay(block));
            }
        });
    }

    syncFunctionOverlay(block) {
        const textarea = block.querySelector('.function-code-area');
        const overlay = block.querySelector('.function-syntax-overlay');
        
        if (textarea && overlay) {
            overlay.scrollTop = textarea.scrollTop;
            overlay.scrollLeft = textarea.scrollLeft;
        }
    }

    onFunctionCodeChange(block) {
        const textarea = block.querySelector('.function-code-area');
        const overlay = block.querySelector('.function-syntax-overlay');
        
        if (textarea && overlay) {
            const functionCode = textarea.value;
            overlay.innerHTML = this.applySyntaxHighlightingToBlock(functionCode);
            this.syncFunctionOverlay(block);
            
            // Update the mesh part data
            const meshName = block.dataset.meshName;
            const meshPart = this.meshParts.find(part => part.name === meshName);
            if (meshPart) {
                // Update the overall code
                this.updateCodeFromFunctionBlocks();
            }
        }
        
        console.log('Function code changed');
    }

    updateCodeFromFunctionBlocks() {
        const functionBlocks = this.codeEditor.querySelectorAll('.code-function-block');
        const commentBlock = this.codeEditor.querySelector('.code-comment-block');
        
        let newCode = '';
        
        // Add comment block if exists
        if (commentBlock) {
            const commentLines = commentBlock.querySelectorAll('.code-line');
            commentLines.forEach(line => {
                newCode += line.textContent + '\n';
            });
            newCode += '\n';
        }
        
        // Add function blocks
        functionBlocks.forEach((block, index) => {
            const textarea = block.querySelector('.function-code-area');
            if (textarea) {
                newCode += textarea.value;
                if (index < functionBlocks.length - 1) {
                    newCode += '\n\n';
                }
            }
        });
        
        this.currentCode = newCode;
        this.identifyMeshParts(); // Re-parse after changes
    }

    applySyntaxHighlightingToLine(line) {
        let highlighted = line;
        
        // Keywords
        highlighted = highlighted.replace(/\b(create_primitive|create_curve|create_circle|bridge_edge_loops|bevel)\b/g, 
            '<span class="editor-function">$1</span>');
        
        // Parameters
        highlighted = highlighted.replace(/\b(name|primitive_type|location|scale|rotation|control_points|thickness|smoothness)\b/g, 
            '<span class="editor-variable">$1</span>');
        
        // Strings
        highlighted = highlighted.replace(/'([^']*?)'/g, '<span class="editor-string">\'$1\'</span>');
        
        // Numbers
        highlighted = highlighted.replace(/\b(\-?\d+\.?\d*)\b/g, '<span class="editor-number">$1</span>');
        
        // Comments
        highlighted = highlighted.replace(/(#.*$)/gm, '<span class="editor-comment">$1</span>');
        
        return highlighted;
    }

    applySyntaxHighlightingToBlock(code) {
        return code.split('\n').map(line => this.applySyntaxHighlightingToLine(line)).join('<br>');
    }

    highlightCodeFunctionBlock(block) {
        // Remove previous highlights
        this.unhighlightCodeFunction();
        
        // Add highlight to specific function block
        if (block) {
            block.classList.add('function-highlighted');
            this.currentHighlightedBlock = block;
        }
    }

    unhighlightCodeFunction() {
        // Remove all function highlights
        const highlightedBlocks = this.codeEditor.querySelectorAll('.function-highlighted');
        highlightedBlocks.forEach(block => block.classList.remove('function-highlighted'));
        this.currentHighlightedBlock = null;
    }

    highlightMeshPartByName(meshName) {
        // Find and highlight the corresponding function block
        const functionBlock = this.codeEditor.querySelector(`[data-mesh-name="${meshName}"]`);
        if (functionBlock) {
            this.highlightCodeFunctionBlock(functionBlock);
            this.highlightMeshObject(meshName);
            console.log(`Highlighting mesh: ${meshName}`);
        } else {
            console.log(`Function block not found for mesh: ${meshName}`);
        }
    }

    handleCodeHover(event) {
        // This method is no longer needed with function blocks
        // Individual function blocks handle their own hover events
    }

    getFunctionAtPosition(position) {
        // This method is no longer needed with function blocks
        return null;
    }

    applySyntaxHighlighting() {
        // This method is now handled by individual function blocks
        // No longer needed for the overall editor
    }

    syncOverlayScroll() {
        // This method is now handled by individual function blocks
        // No longer needed for the overall editor
    }

    onCodeChange() {
        // This is now handled by individual function changes
        console.log('Code changed, auto-save enabled');
    }

    focusMeshPart(meshName) {
        const functionBlock = this.codeEditor.querySelector(`[data-mesh-name="${meshName}"]`);
        if (functionBlock) {
            // Temporarily highlight the function block
            this.highlightCodeFunctionBlock(functionBlock);
            functionBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
                this.unhighlightCodeFunction();
            }, 2000);
        }
        
        console.log(`Focusing on mesh part: ${meshName}`);
    }
    
    setupMeshViewer() {
        if (this.meshViewer) {
            this.meshViewer.addEventListener('load', () => {
                console.log('3D model loaded successfully');
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
        
        // Find and highlight corresponding code function
        this.highlightMeshPartByName(meshName);
    }

    unhighlightAllMeshParts() {
        // Remove code highlights
        this.unhighlightCodeFunction();
        
        // Restore original mesh materials
        if (this.currentHighlightedMesh && this.meshObjects && this.originalMaterials) {
            const meshObject = this.meshObjects[this.currentHighlightedMesh];
            
            if (meshObject && meshObject.uuid) {
                const originalMaterial = this.originalMaterials.get(meshObject.uuid);
                if (originalMaterial) {
                    meshObject.material = originalMaterial;
                }
            }
        }
        this.currentHighlightedMesh = null;
        this.currentHoveredMesh = null;
    }

    indexMeshObjects() {
        // Wait a bit for model-viewer to fully initialize
        setTimeout(() => {
            try {
                // Access the Three.js scene from model-viewer
                const scene = this.meshViewer.model;
                this.meshObjects = {};
                
                if (scene && typeof scene.traverse === 'function') {
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
                    console.warn('Model scene not available or not a Three.js scene, using fallback mode');
                    // Fallback: create mock mesh objects based on identified parts
                    this.meshObjects = {};
                    this.meshParts.forEach(part => {
                        this.meshObjects[part.name] = {
                            name: part.name,
                            position: { x: 0, y: 0, z: 0 },
                            material: null, // Use null for mock objects to avoid material operations
                            uuid: `mock-${part.name}`
                        };
                    });
                }
            } catch (error) {
                console.warn('Error indexing mesh objects:', error);
                // Fallback to simulation mode
                this.meshObjects = {};
                this.meshParts.forEach(part => {
                    this.meshObjects[part.name] = {
                        name: part.name,
                        position: { x: 0, y: 0, z: 0 },
                        material: null, // Use null for mock objects to avoid material operations
                        uuid: `mock-${part.name}`
                    };
                });
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
        // Parse the code to identify function ranges instead of single lines
        const lines = this.currentCode.split('\n');
        this.meshParts = [];
        let currentPos = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Check if this line starts a function call
            if (line.includes('create_primitive') || line.includes('create_curve')) {
                const nameMatch = line.match(/name=['"]([^'"]+)['"]/);
                if (nameMatch) {
                    const functionName = nameMatch[1];
                    
                    // Find the end of this function call (look for the closing parenthesis)
                    let endLine = i;
                    let openParens = (line.match(/\(/g) || []).length;
                    let closeParens = (line.match(/\)/g) || []).length;
                    
                    while (openParens > closeParens && endLine < lines.length - 1) {
                        endLine++;
                        const nextLine = lines[endLine];
                        openParens += (nextLine.match(/\(/g) || []).length;
                        closeParens += (nextLine.match(/\)/g) || []).length;
                    }
                    
                    // Calculate character positions
                    const startPos = currentPos + lines.slice(0, i).join('\n').length + (i > 0 ? 1 : 0);
                    const endPos = currentPos + lines.slice(0, endLine + 1).join('\n').length;
                    
                    this.meshParts.push({
                        name: functionName,
                        startLine: i,
                        endLine: endLine,
                        startPos: startPos,
                        endPos: endPos
                    });
                }
            }
        }
        
        console.log('Identified mesh parts:', this.meshParts);
    }
    
    highlightMeshPart(startLine, endLine) {
        console.log(`Highlighting function from line ${startLine + 1} to ${endLine + 1}`);
        // This will be handled by CSS styling of the function-highlighted class
    }

    highlightMeshPartByName(meshName) {
        const meshPart = this.meshParts.find(part => part.name === meshName);
        if (meshPart) {
            this.highlightMeshPart(meshPart.startLine, meshPart.endLine);
            this.highlightMeshObject(meshName);
            console.log(`Highlighting mesh: ${meshName} (lines ${meshPart.startLine + 1}-${meshPart.endLine + 1})`);
        } else {
            console.log(`Mesh part not found: ${meshName}`);
        }
    }

    highlightMeshObject(meshName) {
        const meshObject = this.meshObjects[meshName];
        if (meshObject) {
            // Store current highlighted mesh for cleanup
            this.currentHighlightedMesh = meshName;
            
            // Check if this is a real Three.js mesh or a mock object
            if (meshObject.material && typeof meshObject.material.clone === 'function') {
                try {
                    // Create highlight material for real Three.js mesh
                    const highlightMaterial = meshObject.material.clone();
                    
                    // Safely set emissive if it exists
                    if (highlightMaterial.emissive && typeof highlightMaterial.emissive.setHex === 'function') {
                        highlightMaterial.emissive.setHex(0x444444);
                    }
                    
                    // Safely set color if it exists
                    if (highlightMaterial.color && typeof highlightMaterial.color.multiplyScalar === 'function') {
                        highlightMaterial.color.multiplyScalar(1.2);
                    }
                    
                    // Apply highlight
                    meshObject.material = highlightMaterial;
                } catch (error) {
                    console.warn(`Could not highlight mesh material for ${meshName}:`, error);
                }
            } else {
                // For mock objects, just log the highlight action
                console.log(`Highlighting mock mesh: ${meshName}`);
            }
        }
    }
    
    unhighlightMeshPart() {
        this.unhighlightCodeFunction();
        
        // Restore original mesh material
        if (this.currentHighlightedMesh && this.meshObjects && this.originalMaterials) {
            const meshObject = this.meshObjects[this.currentHighlightedMesh];
            
            if (meshObject && meshObject.uuid) {
                const originalMaterial = this.originalMaterials.get(meshObject.uuid);
                if (originalMaterial) {
                    meshObject.material = originalMaterial;
                }
            }
            this.currentHighlightedMesh = null;
        }
    }
    
    focusMeshPart(meshName) {
        const meshPart = this.meshParts.find(part => part.name === meshName);
        if (meshPart) {
            // Temporarily highlight the function
            this.highlightCodeFunction(meshPart);
            setTimeout(() => {
                this.unhighlightCodeFunction();
            }, 2000);
        }
        
        console.log(`Focusing on mesh part: ${meshName}`);
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
                    this.focusMeshPart(clickedMeshName);
                    console.log(`Clicked mesh: ${clickedMeshName}`);
                    return;
                }
            }
        } catch (error) {
            console.warn('Could not detect clicked mesh part:', error);
        }
        
        // Fallback: highlight a relevant function
        if (this.meshParts.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.meshParts.length);
            this.focusMeshPart(this.meshParts[randomIndex].name);
        }
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
    
    executeCode() {
        console.log('Executing updated code...');
        
        // Update current code from all function blocks
        this.updateCodeFromFunctionBlocks();
        
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
        
        // Visual feedback for changes - highlight affected function blocks briefly
        if (changes.length > 0) {
            const functionBlocks = this.codeEditor.querySelectorAll('.code-function-block');
            functionBlocks.forEach(block => {
                block.classList.add('code-executed');
                setTimeout(() => {
                    block.classList.remove('code-executed');
                }, 2000);
            });
        }
        
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
            if (!scene || typeof scene.traverse !== 'function') {
                console.warn('Scene not available for wireframe toggle');
                return;
            }
            
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