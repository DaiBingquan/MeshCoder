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

# object name: sofa
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

