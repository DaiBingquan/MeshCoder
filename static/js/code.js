/**
 * MeshLLM Code Animator
 * Implements typewriter effect for code animation display
 */
class CodeAnimator {
    constructor() {
        this.codeContent = `import bpy
from math import radians, pi
from bpy_lib import *

delete_all()

# object name: armchair
# part_1: leg
create_circle(name='circle_1', radius=0.01, center='MEDIAN')
create_curve(name='leg_1', profile_name='circle_1', control_points=[[-0.39, -0.4, -0.31], [-0.39, -0.48, -0.31]], points_radius=[1.0, 0.4], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

# part_2: leg
create_circle(name='circle_2', radius=0.01, center='MEDIAN')
create_curve(name='leg_2', profile_name='circle_2', control_points=[[-0.39, -0.4, 0.18], [-0.39, -0.48, 0.18]], points_radius=[1.0, 0.4], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

# part_3: leg
create_circle(name='circle_3', radius=0.01, center='MEDIAN')
create_curve(name='leg_3', profile_name='circle_3', control_points=[[-0.21, -0.4, 0.26], [-0.21, -0.49, 0.26]], points_radius=[1.0, 0.4], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

# part_4: leg
create_circle(name='circle_4', radius=0.01, center='MEDIAN')
create_curve(name='leg_4', profile_name='circle_4', control_points=[[0.21, -0.4, 0.26], [0.21, -0.49, 0.26]], points_radius=[1.0, 0.4], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

# part_5: leg
create_circle(name='circle_5', radius=0.01, center='MEDIAN')
create_curve(name='leg_5', profile_name='circle_5', control_points=[[0.39, -0.4, -0.31], [0.39, -0.48, -0.31]], points_radius=[1.0, 0.4], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

# part_6: leg
create_circle(name='circle_6', radius=0.01, center='MEDIAN')
create_curve(name='leg_6', profile_name='circle_6', control_points=[[0.39, -0.4, 0.18], [0.39, -0.48, 0.18]], points_radius=[1.0, 0.4], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

# part_7: arm
create_quad(name=['quad_1_7', 'quad_2_7', 'quad_3_7', 'quad_4_7'], control_points=[[[-0.278, 0.218, 0.499], [-0.215, -0.421, 0.499], [-0.46, -0.416, 0.499], [-0.474, 0.226, 0.499]], [[-0.278, 0.218, 0.188], [-0.215, -0.421, 0.188], [-0.46, -0.416, 0.188], [-0.474, 0.226, 0.188]], [[-0.273, 0.272, -0.137], [-0.215, -0.421, -0.137], [-0.46, -0.416, -0.137], [-0.468, 0.271, -0.137]], [[-0.262, 0.379, -0.499], [-0.215, -0.421, -0.499], [-0.46, -0.416, -0.499], [-0.455, 0.378, -0.499]]])
bridge_edge_loops(name='arm_7', profile_name=['quad_1_7', 'quad_2_7', 'quad_3_7', 'quad_4_7'], number_cuts=16, smoothness=0.75, interpolation='SURFACE', fill_caps='both')
bevel(name='arm_7', width=0.06, segments=2)

# part_8: back sofa board
create_primitive(name='back sofa board_8', primitive_type='cube', location=[0.0, -0.1, -0.39], scale=[0.32, 0.31, 0.1], rotation=[0.0, 0.0, 0.0, 1.0])
bevel(name='back sofa board_8', width=0.27, segments=4)

# part_9: sofa board
create_primitive(name='sofa board_9', primitive_type='cube', location=[0.0, -0.37, 0.04], scale=[0.33, 0.33, 0.05], rotation=[0.71, -0.71, 0.0, 0.0])
bevel(name='sofa board_9', width=0.28, segments=4)

# part_10: arm
create_quad(name=['quad_1_10', 'quad_2_10', 'quad_3_10', 'quad_4_10'], control_points=[[[0.474, 0.226, 0.499], [0.46, -0.416, 0.499], [0.215, -0.421, 0.499], [0.278, 0.218, 0.499]], [[0.474, 0.226, 0.188], [0.46, -0.416, 0.188], [0.215, -0.421, 0.188], [0.278, 0.218, 0.188]], [[0.468, 0.271, -0.137], [0.46, -0.416, -0.137], [0.215, -0.421, -0.137], [0.273, 0.272, -0.137]], [[0.455, 0.378, -0.499], [0.46, -0.416, -0.499], [0.215, -0.421, -0.499], [0.262, 0.379, -0.499]]])
bridge_edge_loops(name='arm_10', profile_name=['quad_1_10', 'quad_2_10', 'quad_3_10', 'quad_4_10'], number_cuts=16, smoothness=0.75, interpolation='SURFACE', fill_caps='both')
bevel(name='arm_10', width=0.06, segments=2)

# part_11: cushion
create_primitive(name='cushion_11', primitive_type='cube', location=[0.0, -0.2, -0.08], scale=[0.42, 0.32, 0.13], rotation=[0.5, -0.5, 0.5, 0.5])
bevel(name='cushion_11', width=0.28, segments=4)

# part_12: cushion
create_curve(name=['curve_1_12', 'curve_2_12', 'curve_3_12', 'curve_4_12', 'curve_5_12'], control_points=[[[-0.34, 0.088, -0.154], [-0.34, 0.165, -0.214], [-0.339, 0.267, -0.212], [-0.339, 0.18, -0.151]], [[-0.293, -0.078, -0.097], [-0.292, 0.154, -0.246], [-0.292, 0.428, -0.261], [-0.293, 0.191, -0.119]], [[-0.003, -0.136, -0.075], [-0.001, 0.143, -0.289], [0.001, 0.486, -0.284], [0.002, 0.203, -0.075]], [[0.292, -0.078, -0.097], [0.293, 0.154, -0.246], [0.293, 0.428, -0.261], [0.292, 0.191, -0.119]], [[0.339, 0.088, -0.154], [0.339, 0.165, -0.214], [0.34, 0.267, -0.212], [0.34, 0.18, -0.151]]], points_radius=[1, 1, 1, 1], handle_type=[0, 0, 0, 0, 0, 0, 0, 0], closed=True)
bridge_edge_loops(name='cushion_12', profile_name=['curve_1_12', 'curve_2_12', 'curve_3_12', 'curve_4_12', 'curve_5_12'], number_cuts=4, smoothness=0.69, interpolation='SURFACE', fill_caps='both')`;

        this.words = [];
        this.currentWordIndex = 0;
        this.isPlaying = false;
        this.animationSpeed = 60; // Animation speed setting: lower value means faster, in milliseconds
        this.batchSize = 4; // Number of words to render per frame
        this.lastLineNumber = 0; // Track the last line number
        this.codeDisplay = document.getElementById('codeDisplay');
        this.codeDisplay.innerHTML = ''; // remove any whitespace inside codeDisplay that would offset the first line
        this.isWrapMode = false; // Text wrapping mode status
        this.wrapToggleBtn = null; // Reference to wrap toggle button
        this.fullscreenModal = document.getElementById('fullscreenModal');
        this.fullscreenCodeDisplay = document.getElementById('fullscreenCodeDisplay');
        this.closeModalBtn = document.getElementById('closeModalBtn');
        this.fullscreenToggleBtn = null;
        this.isFullscreen = false;
        
        this.init();
    }

    init() {
        this.parseCode();
        this.initWrapToggle(); // Initialize wrap toggle button
        this.initFullscreenToggle(); // Initialize fullscreen toggle button
        this.initCloseModalBtn(); // Initialize close modal button
        this.initEscKeyHandler(); // Initialize ESC key handler
        requestAnimationFrame(() => this.start()); // Auto start with requestAnimationFrame
    }

    initWrapToggle() {
        this.wrapToggleBtn = document.getElementById('wrapToggleBtn');
        if (this.wrapToggleBtn) {
            this.wrapToggleBtn.addEventListener('click', () => {
                this.toggleWrapMode();
            });
        }
    }

    initFullscreenToggle() {
        this.fullscreenToggleBtn = document.getElementById('fullscreenToggleBtn');
        if (this.fullscreenToggleBtn) {
            this.fullscreenToggleBtn.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }
    }

    initCloseModalBtn() {
        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => {
                this.closeFullscreen();
            });
        }
    }

    initEscKeyHandler() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isFullscreen) {
                this.closeFullscreen();
            }
        });
    }

    toggleWrapMode() {
        this.isWrapMode = !this.isWrapMode;
        
        if (this.isWrapMode) {
            this.codeDisplay.classList.add('wrap-mode');
            this.wrapToggleBtn.classList.add('active');
            this.wrapToggleBtn.title = 'Disable code wrapping';
        } else {
            this.codeDisplay.classList.remove('wrap-mode');
            this.wrapToggleBtn.classList.remove('active');
            this.wrapToggleBtn.title = 'Toggle code wrapping';
        }
    }

    toggleFullscreen() {
        if (!this.isFullscreen) {
            // Render complete code instantly in fullscreen
            const fullscreenContent = this.renderCompleteCode();
            this.fullscreenCodeDisplay.innerHTML = fullscreenContent;
            this.fullscreenModal.classList.add('active');
            this.isFullscreen = true;
            document.body.style.overflow = 'hidden';
            this.fullscreenToggleBtn.classList.add('active');
        } else {
            this.closeFullscreen();
        }
    }

    closeFullscreen() {
        this.fullscreenModal.classList.remove('active');
        this.isFullscreen = false;
        document.body.style.overflow = '';
        this.fullscreenToggleBtn.classList.remove('active');
    }

    renderCompleteCode() {
        const container = document.createElement('div');
        let currentLineNumber = 1;
        
        this.words.forEach((word, index) => {
            if (word.type === 'newline') {
                container.appendChild(document.createElement('br'));
            } else {
                if (word.isFirstInLine) {
                    if (currentLineNumber > 1) {
                        container.appendChild(document.createElement('br'));
                    }
                    const lineNumber = document.createElement('span');
                    lineNumber.className = 'code-line-number';
                    lineNumber.textContent = currentLineNumber.toString().padStart(2, '0');
                    container.appendChild(lineNumber);
                    currentLineNumber++;
                }
                
                const wordSpan = document.createElement('span');
                wordSpan.className = 'code-word';
                wordSpan.style.opacity = '1'; // Make sure word is visible immediately
                wordSpan.style.animation = 'none'; // Disable animation
                
                const wordElement = document.createElement('span');
                wordElement.textContent = word.content;
                this.applySyntaxHighlighting(wordElement, word.content);
                
                wordSpan.appendChild(wordElement);
                container.appendChild(wordSpan);
            }
        });
        
        return container.innerHTML;
    }

    parseCode() {
        const lines = this.codeContent.split('\n');
        this.words = [];
        
        lines.forEach((line, lineIndex) => {
            if (line.trim() === '') {
                this.words.push({ 
                    type: 'newline', 
                    lineNumber: lineIndex + 1, 
                    content: '' 
                });
            } else {
                // Unified word processing to maintain original code structure
                const tokens = line.split(/(\s+|[()[\]{},.:'"\-=])/);
                let isFirstMeaningfulToken = true;
                
                tokens.forEach((token) => {
                    if (token.length > 0) {
                        const isMeaningfulToken = token.trim().length > 0;
                        this.words.push({
                            type: 'word',
                            content: token,
                            lineNumber: lineIndex + 1,
                            isFirstInLine: isFirstMeaningfulToken && isMeaningfulToken
                        });
                        if (isMeaningfulToken) {
                            isFirstMeaningfulToken = false;
                        }
                    }
                });
            }
        });
    }

    start() {
        this.isPlaying = true;
        this.animate();
    }

    animate() {
        if (!this.isPlaying || this.currentWordIndex >= this.words.length) {
            if (this.currentWordIndex >= this.words.length) {
                this.addCursor();
            }
            return;
        }

        // Process multiple words per frame for smoother animation
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < this.batchSize && this.currentWordIndex < this.words.length; i++) {
        const currentWord = this.words[this.currentWordIndex];
        
        if (currentWord.type === 'newline') {
                fragment.appendChild(document.createElement('br'));
        } else {
                const wordSpan = this.createWordElement(currentWord);
                fragment.appendChild(wordSpan);
        }

        this.currentWordIndex++;
        }

        this.codeDisplay.appendChild(fragment);
        this.scrollToBottom();
        
        // Use requestAnimationFrame for smoother animation
        if (this.currentWordIndex < this.words.length) {
            requestAnimationFrame(() => setTimeout(() => this.animate(), this.animationSpeed));
        }
    }

    createWordElement(wordData) {
        const span = document.createElement('span');
        span.className = 'code-word';
        
        if (wordData.isFirstInLine && !this.isWrapMode) {
            if (wordData.lineNumber > this.lastLineNumber && this.lastLineNumber > 0) {
                span.insertBefore(document.createElement('br'), span.firstChild);
            }
            
            const lineNumber = document.createElement('span');
            lineNumber.className = 'code-line-number';
            lineNumber.textContent = wordData.lineNumber.toString().padStart(2, '0');
            span.appendChild(lineNumber);
            
            this.lastLineNumber = wordData.lineNumber;
        } else if (wordData.isFirstInLine && this.isWrapMode) {
            if (wordData.lineNumber > this.lastLineNumber && this.lastLineNumber > 0) {
                span.insertBefore(document.createElement('br'), span.firstChild);
            }
            this.lastLineNumber = wordData.lineNumber;
        }
        
        const wordElement = document.createElement('span');
        wordElement.textContent = wordData.content;
        this.applySyntaxHighlighting(wordElement, wordData.content);
        span.appendChild(wordElement);
        
        return span;
    }

    applySyntaxHighlighting(element, content) {
        const trimmedContent = content.trim();
        
        // Python keywords
        const keywords = ['import', 'from', 'def', 'class', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'return', 'yield', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is', 'with', 'as', 'lambda'];
        
        // MeshLLM specific functions
        const meshFunctions = ['create_circle', 'create_curve', 'create_quad', 'bridge_edge_loops', 'bevel', 'create_primitive', 'delete_all'];
        
        if (keywords.includes(trimmedContent)) {
            element.className = 'keyword';
        } else if (meshFunctions.includes(trimmedContent)) {
            element.className = 'function';
        } else if (trimmedContent.match(/^["'].*["']$/)) {
            element.className = 'string';
        } else if (trimmedContent.match(/^\d+(\.\d+)?$/)) {
            element.className = 'number';
        } else if (trimmedContent.match(/^#.*/)) {
            element.className = 'comment';
        } else if (trimmedContent.match(/^[a-z_][a-z0-9_]*$/i) && trimmedContent.includes('_')) {
            element.className = 'variable';
        } else if (['=', '+', '-', '*', '/', '(', ')', '[', ']', '{', '}', ',', '.', ':'].includes(trimmedContent)) {
            element.className = 'operator';
        }
    }

    addCursor() {
        const cursor = document.createElement('span');
        cursor.className = 'code-cursor';
        cursor.id = 'code-cursor';
        this.codeDisplay.appendChild(cursor);
    }

    removeCursor() {
        const cursor = document.getElementById('code-cursor');
        if (cursor) {
            cursor.remove();
        }
    }

    scrollToBottom() {
        if (this.codeDisplay.scrollHeight > this.codeDisplay.clientHeight) {
            this.codeDisplay.scrollTop = this.codeDisplay.scrollHeight - this.codeDisplay.clientHeight + 20;
        }
    }
}

// Initialize after page loads
document.addEventListener('DOMContentLoaded', function() {
    new CodeAnimator();
});

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
            // Hover highlighting
            line.addEventListener('mouseenter', () => this.highlightMeshPart(index));
            line.addEventListener('mouseleave', () => this.unhighlightMeshPart());
            
            // Click focusing
            line.addEventListener('click', () => this.focusMeshPart(index));
            
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
            });
            
            // Add mesh interaction events
            this.meshViewer.addEventListener('click', (event) => {
                this.onMeshClick(event);
            });
        }
    }

    indexMeshObjects() {
        // Wait a bit for model-viewer to fully initialize
        setTimeout(() => {
            try {
                // Access the Three.js scene from model-viewer
                const scene = this.meshViewer.model;
                this.meshObjects = {};
                this.originalMaterials = {};
                
                if (scene) {
                    scene.traverse((child) => {
                        if (child.isMesh && child.name) {
                            this.meshObjects[child.name] = child;
                            // Store original material for restoration
                            this.originalMaterials[child.name] = child.material.clone();
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
            const originalMaterial = this.originalMaterials[this.currentHighlightedMesh];
            
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
        
        // Simulate code execution and mesh update
        this.showExecutionFeedback();
        this.simulateMeshUpdate();
        
        // In a real implementation, this would:
        // 1. Parse the modified code
        // 2. Generate new mesh geometry
        // 3. Update the 3D model
        console.log('Updated code:', this.currentCode);
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
        // Simulate wireframe toggle
        if (this.meshViewer) {
            // In a real implementation, you would toggle wireframe rendering
            // For now, we'll just provide visual feedback
            const wireframeBtn = document.getElementById('wireframeBtn');
            if (wireframeBtn) {
                wireframeBtn.classList.toggle('is-active');
                const isWireframe = wireframeBtn.classList.contains('is-active');
                wireframeBtn.textContent = isWireframe ? 'Solid View' : 'Toggle Wireframe';
                console.log(`Wireframe mode: ${isWireframe ? 'ON' : 'OFF'}`);
            }
        }
    }
}

// Initialize shape editor when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure CodeAnimator initializes first
    setTimeout(() => {
        new ShapeEditor();
    }, 100);
});