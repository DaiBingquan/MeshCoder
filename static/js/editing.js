/**
 * Shape Editing Interactive Features
 */
import { ThreeViewer } from './three-viewer.js';

class ShapeEditor {
    constructor() {
        this.meshViewer = null;
        this.threeViewer = null;
        this.codeEditor = null;
        this.currentCode = '';
        this.meshParts = [];
        this.isInitialized = false;
        this.currentHighlightedFunction = null;
        
        // Default code for editing
        this.defaultCode = `# sofa mesh generation
create_primitive(name='back_sofa_board_8', primitive_type='cube', 
                location=[0, -0.101, -0.39], 
                scale=[0.32, 0.1, 0.31])

create_primitive(name='sofa_board_9', primitive_type='cube', 
                location=[0, -0.371, 0.041], 
                scale=[0.33, 0.05, 0.33])

create_primitive(name='cushion_11', primitive_type='cube', 
                location=[0, -0.201, -0.08], 
                scale=[0.42, 0.13, 0.32])

create_curve(name='cushion_12', control_points=[
    [[-0.34, 0.088, -0.154], [-0.34, 0.165, -0.214], [-0.339, 0.267, -0.212]],
    [[-0.293, -0.078, -0.097], [-0.292, 0.154, -0.246], [-0.292, 0.428, -0.261]],
    [[-0.003, -0.136, -0.075], [-0.001, 0.143, -0.289], [0.001, 0.486, -0.284]],
    [[0.292, -0.078, -0.097], [0.293, 0.154, -0.246], [0.293, 0.428, -0.261]],
    [[0.339, 0.088, -0.154], [0.339, 0.165, -0.214], [0.34, 0.267, -0.212]]
], smoothness=0.69)

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
        console.log(`Attempting to highlight mesh: ${meshName}`);
        console.log('Available mesh parts:', this.meshParts.map(p => p.name));
        
        // Try direct match first
        let functionBlock = this.codeEditor.querySelector(`[data-mesh-name="${meshName}"]`);
        console.log(`Direct match result for "${meshName}":`, functionBlock ? 'found' : 'not found');
        
        // If no direct match, try partial matching for similar names
        if (!functionBlock) {
            // Try finding by partial name matching (removing spaces, underscores)
            const normalizedMeshName = meshName.replace(/[\s_-]/g, '').toLowerCase();
            console.log(`Normalized mesh name: "${normalizedMeshName}"`);
            
            const meshPart = this.meshParts.find(part => {
                const normalizedPartName = part.name.replace(/[\s_-]/g, '').toLowerCase();
                console.log(`Comparing "${normalizedMeshName}" with "${normalizedPartName}"`);
                return normalizedPartName.includes(normalizedMeshName) || 
                       normalizedMeshName.includes(normalizedPartName);
            });
            
            if (meshPart) {
                functionBlock = this.codeEditor.querySelector(`[data-mesh-name="${meshPart.name}"]`);
                console.log(`Found partial match: ${meshName} -> ${meshPart.name}`);
            }
        }
        
        if (functionBlock) {
            this.highlightCodeFunctionBlock(functionBlock);
            this.highlightMeshObject(meshName);
            console.log(`Successfully highlighting mesh: ${meshName}`);
        } else {
            console.log(`Function block not found for mesh: ${meshName}`);
            console.log('Available function blocks:', Array.from(this.codeEditor.querySelectorAll('[data-mesh-name]')).map(b => b.dataset.meshName));
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
            // Create Three.js viewer
            this.threeViewer = new ThreeViewer(this.meshViewer);
            
            // Set up event callbacks
            this.threeViewer.onModelLoaded = (model) => {
                console.log('3D model loaded successfully');
                this.indexMeshObjects();
                
                // Hide loading indicator
                const loadingIndicator = this.meshViewer.querySelector('.loading-indicator');
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
            };
            
            this.threeViewer.onMeshHover = (meshName, mesh) => {
                console.log('Mesh hover detected:', meshName);
                console.log('Available mesh objects in ThreeViewer:', Object.keys(this.threeViewer.meshObjects || {}));
                console.log('Available mesh parts in code:', this.meshParts.map(p => p.name));
                
                if (meshName) {
                    this.highlightMeshPartByName(meshName);
                } else {
                    this.unhighlightMeshPart();
                }
            };
            
            this.threeViewer.onMeshClick = (meshName, mesh) => {
                if (meshName) {
                    this.focusMeshPart(meshName);
                    console.log(`Clicked mesh: ${meshName}`);
                }
            };
            
            // Load the model
            this.threeViewer.loadModel('assets/models/sofa.glb');
        }
    }

    // These methods are now handled by ThreeViewer callbacks
    // No longer needed with native Three.js implementation

    indexMeshObjects() {
        // Get mesh objects from ThreeViewer
        if (this.threeViewer && this.threeViewer.meshObjects) {
            this.meshObjects = this.threeViewer.meshObjects;
            console.log('Mesh objects indexed from ThreeViewer:', Object.keys(this.meshObjects));
        } else {
            console.warn('ThreeViewer not available, using fallback mode');
            // Fallback: create mock mesh objects based on identified parts
            this.meshObjects = {};
            this.meshParts.forEach(part => {
                this.meshObjects[part.name] = {
                    name: part.name,
                    position: { x: 0, y: 0, z: 0 },
                    material: null,
                    uuid: `mock-${part.name}`
                };
            });
        }
    }
    
    setupEventListeners() {
        const resetViewBtn = document.getElementById('resetViewBtn');
        const wireframeBtn = document.getElementById('wireframeBtn');
        
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
    
    highlightMeshObject(meshName) {
        if (this.threeViewer) {
            this.threeViewer.highlightMeshByName(meshName);
        } else {
            console.log(`Highlighting mesh: ${meshName} (ThreeViewer not available)`);
        }
    }
    
    unhighlightMeshPart() {
        this.unhighlightCodeFunction();
        
        // Unhighlight mesh through ThreeViewer
        if (this.threeViewer) {
            this.threeViewer.unhighlightAllMeshes();
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
    
    // Mesh click detection now handled by ThreeViewer callbacks
    
    // Execute and reset code functionality removed as these buttons are no longer needed
    
    resetView() {
        if (this.threeViewer) {
            this.threeViewer.resetView();
        }
        console.log('View reset to default');
    }
    
    toggleWireframe() {
        if (!this.threeViewer) return;
        
        const wireframeBtn = document.getElementById('wireframeBtn');
        if (!wireframeBtn) return;
        
        // Toggle wireframe through ThreeViewer
        const isWireframe = this.threeViewer.toggleWireframe();
        
        // Update button state
        wireframeBtn.classList.toggle('is-active', isWireframe);
        wireframeBtn.textContent = isWireframe ? 'Solid View' : 'Toggle Wireframe';
        
        console.log(`Wireframe mode: ${isWireframe ? 'ON' : 'OFF'}`);
    }
    
    // Wireframe methods now handled by ThreeViewer
}

// Initialize shape editor when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure CodeAnimator initializes first
    setTimeout(() => {
        new ShapeEditor();
    }, 100);
}); 