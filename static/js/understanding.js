// Shape Understanding Interactive Features
import * as THREE from 'three';

class ShapeUnderstanding {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mesh = null;
        this.originalMesh = null;
        this.isWireframe = false;
        this.isProcessing = false;
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        this.initViewer();
        this.loadMesh();
    }

    initViewer() {
        const container = document.getElementById('understandingMeshViewer');
        if (!container) return;

        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf5f5f5);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            container.offsetWidth / container.offsetHeight,
            0.1,
            1000
        );
        this.camera.position.set(3, 2, 3);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Clear loading indicator and add renderer
        container.innerHTML = '';
        container.appendChild(this.renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        // Controls (simplified mouse interaction)
        this.setupMouseControls();

        // Start render loop
        this.animate();
    }

    loadMesh() {
        // Create a sofa-like geometry for demonstration
        const sofaGroup = new THREE.Group();

        // Base/seat
        const seatGeometry = new THREE.BoxGeometry(1.8, 0.2, 0.8);
        const seatMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const seat = new THREE.Mesh(seatGeometry, seatMaterial);
        seat.position.set(0, 0.5, 0);
        seat.userData = { part: 'seat', highlight: false };
        sofaGroup.add(seat);

        // Backrest
        const backGeometry = new THREE.BoxGeometry(1.8, 0.6, 0.1);
        const backMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        const backrest = new THREE.Mesh(backGeometry, backMaterial);
        backrest.position.set(0, 0.8, -0.35);
        backrest.userData = { part: 'backrest', highlight: false };
        sofaGroup.add(backrest);

        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.4);
        const legMaterial = new THREE.MeshLambertMaterial({ color: 0x2F1B14 });
        
        const legPositions = [
            [-0.8, 0.2, -0.3],
            [0.8, 0.2, -0.3],
            [-0.8, 0.2, 0.3],
            [0.8, 0.2, 0.3]
        ];

        legPositions.forEach((pos, index) => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(pos[0], pos[1], pos[2]);
            leg.userData = { part: 'legs', highlight: false, legIndex: index };
            sofaGroup.add(leg);
        });

        // Arms
        const armGeometry = new THREE.BoxGeometry(0.15, 0.5, 0.8);
        const armMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
        
        [-1, 1].forEach((side, index) => {
            const arm = new THREE.Mesh(armGeometry, armMaterial);
            arm.position.set(side * 0.975, 0.75, 0);
            arm.userData = { part: 'arms', highlight: false, armIndex: index };
            sofaGroup.add(arm);
        });

        this.mesh = sofaGroup;
        this.originalMesh = sofaGroup.clone();
        this.scene.add(sofaGroup);

        // Center the camera on the object
        const box = new THREE.Box3().setFromObject(sofaGroup);
        const center = box.getCenter(new THREE.Vector3());
        this.camera.lookAt(center);
    }

    setupMouseControls() {
        let isMouseDown = false;
        let mouseX = 0;
        let mouseY = 0;

        const container = this.renderer.domElement;

        container.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        container.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;

            const deltaX = e.clientX - mouseX;
            const deltaY = e.clientY - mouseY;

            // Rotate camera around the object
            const spherical = new THREE.Spherical();
            spherical.setFromVector3(this.camera.position);
            spherical.theta -= deltaX * 0.01;
            spherical.phi += deltaY * 0.01;
            spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

            this.camera.position.setFromSpherical(spherical);
            this.camera.lookAt(0, 0.5, 0);

            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        container.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        container.addEventListener('wheel', (e) => {
            const scale = e.deltaY > 0 ? 1.1 : 0.9;
            this.camera.position.multiplyScalar(scale);
        });
    }

    setupEventListeners() {
        // Reset view button
        const resetBtn = document.getElementById('understandingResetViewBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetView());
        }

        // Wireframe toggle
        const wireframeBtn = document.getElementById('understandingWireframeBtn');
        if (wireframeBtn) {
            wireframeBtn.addEventListener('click', () => this.toggleWireframe());
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
                this.highlightMeshPart(questionType, true);
            });
            
            item.addEventListener('mouseleave', () => {
                this.highlightMeshPart(questionType, false);
            });
        });
    }

    resetView() {
        this.camera.position.set(3, 2, 3);
        this.camera.lookAt(0, 0.5, 0);
    }

    toggleWireframe() {
        this.isWireframe = !this.isWireframe;
        
        if (this.mesh) {
            this.mesh.traverse((child) => {
                if (child.isMesh) {
                    child.material.wireframe = this.isWireframe;
                }
            });
        }
        
        const btn = document.getElementById('understandingWireframeBtn');
        if (btn) {
            btn.textContent = this.isWireframe ? 'Hide Wireframe' : 'Toggle Wireframe';
        }
    }

    highlightMeshPart(questionType, highlight) {
        if (!this.mesh) return;

        const highlightColor = 0xff6b6b;
        const originalColors = {
            seat: 0x8B4513,
            backrest: 0x654321,
            legs: 0x2F1B14,
            arms: 0x654321
        };

        this.mesh.traverse((child) => {
            if (child.isMesh && child.userData.part) {
                let shouldHighlight = false;

                switch (questionType) {
                    case 'legs':
                        shouldHighlight = child.userData.part === 'legs';
                        break;
                    case 'cushion':
                        shouldHighlight = child.userData.part === 'seat' || child.userData.part === 'backrest';
                        break;
                    case 'material':
                    case 'dimensions':
                    case 'style':
                        shouldHighlight = true; // Highlight entire object
                        break;
                }

                if (shouldHighlight) {
                    child.material.color.setHex(highlight ? highlightColor : originalColors[child.userData.part] || originalColors.seat);
                }
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

        // Highlight relevant mesh parts
        this.highlightMeshPart(questionType, true);

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
        }

        // Stop processing animation
        this.stopProcessingAnimation();

        // Reset highlight after a delay
        setTimeout(() => {
            this.highlightMeshPart(questionType, false);
        }, 3000);

        this.isProcessing = false;
    }

    startProcessingAnimation() {
        const processingIcon = document.getElementById('processingIcon');
        const processingText = document.querySelector('.llm-processing-indicator p');
        
        if (processingIcon) {
            processingIcon.style.animation = 'pulse 1s ease-in-out infinite';
        }
        if (processingText) {
            processingText.textContent = 'Analyzing...';
        }
    }

    stopProcessingAnimation() {
        const processingIcon = document.getElementById('processingIcon');
        const processingText = document.querySelector('.llm-processing-indicator p');
        
        if (processingIcon) {
            processingIcon.style.animation = 'pulse 2s ease-in-out infinite';
        }
        if (processingText) {
            processingText.textContent = 'Processing...';
        }
    }

    simulateProcessing() {
        return new Promise((resolve) => {
            // Simulate variable processing time (1.5-3 seconds)
            const delay = 1500 + Math.random() * 1500;
            setTimeout(resolve, delay);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    // Handle window resize
    handleResize() {
        const container = document.getElementById('understandingMeshViewer');
        if (!container || !this.camera || !this.renderer) return;

        this.camera.aspect = container.offsetWidth / container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);
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