// Shape Understanding Interactive Features

class ShapeUnderstanding {
    constructor() {
        this.codeDisplay = null;
        this.isWrapMode = false;
        this.isProcessing = false;
        this.sofaCode = `# sofa mesh generation
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
`;
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        this.initCodeDisplay();
        this.renderCode();
        this.initProcessingState();
        this.syncHeights();
        this.setupHeightObserver();
    }

    initProcessingState() {
        // Hide processing dots by default
        const processingDots = document.querySelector('.processing-dots');
        if (processingDots) {
            processingDots.style.display = 'none';
        }
    }

    initCodeDisplay() {
        this.codeDisplay = document.getElementById('understandingCodeDisplay');
        if (!this.codeDisplay) {
            console.log('Understanding code display not found');
            return;
        }
    }

    renderCode() {
        if (!this.codeDisplay) return;

        const lines = this.sofaCode.split('\n');
        let html = '';
        
        lines.forEach((line, index) => {
            const lineNumber = index + 1;
            const highlightedLine = this.applySyntaxHighlighting(line);
            html += `<div class="code-line" data-line="${lineNumber}">`;
            html += `<span class="code-line-number">${lineNumber}</span>`;
            html += `<span class="code-content">${highlightedLine}</span>`;
            html += `</div>`;
        });

        this.codeDisplay.innerHTML = html;
    }

    applySyntaxHighlighting(line) {
        // Basic syntax highlighting for the sofa code
        let highlighted = line;
        
        // Comments
        highlighted = highlighted.replace(/(#.*$)/g, '<span class="comment">$1</span>');
        
        // Function names
        highlighted = highlighted.replace(/\b(create_primitive|create_curve)\b/g, '<span class="function">$1</span>');
        
        // Keywords
        highlighted = highlighted.replace(/\b(name|primitive_type|location|scale|control_points|smoothness|thickness)\b/g, '<span class="keyword">$1</span>');
        
        // Strings
        highlighted = highlighted.replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>');
        
        // Numbers
        highlighted = highlighted.replace(/\b(-?\d*\.?\d+)\b/g, '<span class="number">$1</span>');
        
        return highlighted;
    }



    setupEventListeners() {
        // Wrap toggle button
        const wrapToggleBtn = document.getElementById('understandingWrapToggleBtn');
        if (wrapToggleBtn) {
            wrapToggleBtn.addEventListener('click', () => this.toggleWrapMode());
        }

        // Question buttons
        const askButtons = document.querySelectorAll('.ask-button');
        askButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target.getAttribute('data-target');
                this.handleQuestion(target, button);
            });
        });

        // Question hover effects
        const qaItems = document.querySelectorAll('.qa-item');
        qaItems.forEach(item => {
            const questionType = item.getAttribute('data-question');
            
            item.addEventListener('mouseenter', () => {
                this.highlightCodeSection(questionType, true);
            });
            
            item.addEventListener('mouseleave', () => {
                this.highlightCodeSection(questionType, false);
            });
        });
    }

    toggleWrapMode() {
        this.isWrapMode = !this.isWrapMode;
        
        if (this.codeDisplay) {
            this.codeDisplay.classList.toggle('wrap-mode', this.isWrapMode);
        }
        
        const btn = document.getElementById('understandingWrapToggleBtn');
        if (btn) {
            btn.classList.toggle('active', this.isWrapMode);
        }
    }

    highlightCodeSection(questionType, highlight) {
        if (!this.codeDisplay) return;

        // Remove existing highlights
        const codeLines = this.codeDisplay.querySelectorAll('.code-line');
        codeLines.forEach(line => line.classList.remove('highlight'));

        if (!highlight) return;

        // Add highlights based on question type
        switch (questionType) {
            case 'legs':
                // Highlight all leg-related lines (leg_1 through leg_6)
                this.highlightLinesContaining(['leg_1', 'leg_2', 'leg_3', 'leg_4', 'leg_5', 'leg_6']);
                break;
            case 'arms':
                // Highlight armrest lines
                this.highlightLinesContaining(['arm_7', 'arm_10']);
                break;
            case 'components':
                // Highlight main structural components
                this.highlightLinesContaining(['back_sofa_board_8', 'sofa_board_9', 'cushion_11', 'cushion_12']);
                break;
            case 'geometry':
                // Highlight primitive type definitions
                this.highlightLinesContaining(['primitive_type', 'create_primitive', 'create_curve']);
                break;
            case 'positioning':
                // Highlight location and scale parameters
                this.highlightLinesContaining(['location', 'scale']);
                break;
        }
    }

    highlightLinesContaining(keywords) {
        if (!this.codeDisplay) return;

        const codeLines = this.codeDisplay.querySelectorAll('.code-line');
        codeLines.forEach(line => {
            const content = line.textContent.toLowerCase();
            if (keywords.some(keyword => content.includes(keyword.toLowerCase()))) {
                line.classList.add('highlight');
            }
        });
    }

    async handleQuestion(questionType, button) {
        if (this.isProcessing) return;

        this.isProcessing = true;
        const qaItem = button.closest('.qa-item');
        const answer = document.getElementById(`answer-${questionType}`);

        // Update UI states
        qaItem.classList.add('processing');
        button.textContent = 'Processing...';
        button.classList.add('processing');

        // Show processing animation
        this.startProcessingAnimation();

        // Highlight relevant code sections
        this.highlightCodeSection(questionType, true);

        // Simulate processing delay
        await this.simulateProcessing();

        // Show answer
        if (answer) {
            answer.style.display = 'block';
            qaItem.classList.remove('processing');
            qaItem.classList.add('active');
            button.textContent = 'Asked';
            button.classList.remove('processing');
            button.classList.add('answered');
            
            // Sync heights after answer is shown
            setTimeout(() => {
                this.syncHeights();
            }, 350);
        }

        // Stop processing animation
        this.stopProcessingAnimation();

        // Reset highlight after a delay
        setTimeout(() => {
            this.highlightCodeSection(questionType, false);
        }, 3000);

        this.isProcessing = false;
    }

    startProcessingAnimation() {
        const processingIcon = document.getElementById('processingIcon');
        const processingText = document.querySelector('.llm-processing-indicator p');
        const processingDots = document.querySelector('.processing-dots');
        
        if (processingIcon) {
            processingIcon.style.animation = 'pulse 1s ease-in-out infinite';
        }
        if (processingDots) {
            processingDots.style.display = 'block';
        }
        if (processingText) {
            processingText.textContent = 'Analyzing...';
        }
    }

    stopProcessingAnimation() {
        const processingIcon = document.getElementById('processingIcon');
        const processingText = document.querySelector('.llm-processing-indicator p');
        const processingDots = document.querySelector('.processing-dots');
        
        if (processingIcon) {
            processingIcon.style.animation = 'pulse 2s ease-in-out infinite';
        }
        if (processingDots) {
            processingDots.style.display = 'none';
        }
        if (processingText) {
            processingText.textContent = 'Generated code could help LLMs better understand the shape';
        }
    }

    simulateProcessing() {
        return new Promise((resolve) => {
            // Simulate variable processing time (1.5-3 seconds)
            const delay = 1500 + Math.random() * 1500;
            setTimeout(resolve, delay);
        });
    }

    // Handle window resize for code display
    handleResize() {
        // Code display automatically adjusts to container size
        if (this.codeDisplay) {
            // Trigger re-render if needed
            this.renderCode();
        }
        // Also sync heights on resize
        this.syncHeights();
    }

    // Sync left code display and middle LLM panel height with right QA container height
    syncHeights() {
        const qaContainer = document.querySelector('.understanding-qa-container');
        const codeDisplay = document.getElementById('understandingCodeDisplay');
        const llmContainer = document.querySelector('.llm-processing-container');
        
        if (qaContainer && (codeDisplay || llmContainer)) {
            // Get the actual height of the QA container content
            const qaHeight = qaContainer.offsetHeight;
            // For code display: subtract padding and header space (approximately 80px)
            const codeHeight = Math.max(200, qaHeight - 80);
            // For LLM container: subtract less padding since it has different structure (approximately 50px)
            const llmHeight = Math.max(200, qaHeight - 50);
            
            if (codeDisplay) {
                codeDisplay.style.height = `${codeHeight}px`;
            }
            
            if (llmContainer) {
                llmContainer.style.height = `${llmHeight}px`;
            }
        }
    }

    // Setup observer to watch for height changes in QA container
    setupHeightObserver() {
        const qaContainer = document.querySelector('.understanding-qa-container');
        
        if (qaContainer && window.ResizeObserver) {
            const resizeObserver = new ResizeObserver(() => {
                this.syncHeights();
            });
            resizeObserver.observe(qaContainer);
        }
        
        // Also observe for DOM changes in QA content
        const qaWrapper = document.querySelector('.qa-wrapper');
        if (qaWrapper && window.MutationObserver) {
            const mutationObserver = new MutationObserver(() => {
                // Delay sync to allow for animation completion
                setTimeout(() => {
                    this.syncHeights();
                }, 350);
            });
            
            mutationObserver.observe(qaWrapper, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style']
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const shapeUnderstanding = new ShapeUnderstanding();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        shapeUnderstanding.handleResize();
    });
});

export default ShapeUnderstanding; 