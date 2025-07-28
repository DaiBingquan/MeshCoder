/**
 * Native Three.js 3D Mesh Viewer
 * Replaces model-viewer with full control over scene, materials, and interactions
 */

import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';

export class ThreeViewer {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.meshObjects = {};
        this.originalMaterials = new Map();
        this.wireframeMaterials = new Map();
        this.isWireframe = false;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.currentHighlightedMesh = null;
        
        // Event callbacks
        this.onModelLoaded = null;
        this.onMeshHover = null;
        this.onMeshClick = null;
        
        this.init();
    }
    
    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupLights();
        this.setupEventListeners();
        this.animate();
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf5f5f5);
        
        // Add subtle environment
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
    }
    
    setupCamera() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        this.camera.position.set(0, 3, 10);
        this.camera.lookAt(0, 0, 0);
    }
    
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        this.container.appendChild(this.renderer.domElement);
    }
    
    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 1;
        this.controls.maxDistance = 20;
        this.controls.maxPolarAngle = Math.PI;
        
        // Set default orbit
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }
    
    setupLights() {
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        this.scene.add(directionalLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-5, 0, -5);
        this.scene.add(fillLight);
    }
    
    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Handle mouse interactions
        this.renderer.domElement.addEventListener('mousemove', (event) => this.onMouseMove(event));
        this.renderer.domElement.addEventListener('click', (event) => this.onMouseClick(event));
        this.renderer.domElement.addEventListener('mouseleave', () => this.onMouseLeave());
    }
    
    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    onMouseMove(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.raycastMeshes();
    }
    
    onMouseClick(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.raycastMeshes(true);
    }
    
    onMouseLeave() {
        this.unhighlightAllMeshes();
        if (this.onMeshHover) {
            this.onMeshHover(null);
        }
    }
    
    raycastMeshes(isClick = false) {
        if (!this.model) return;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Get all meshes from the scene
        const meshes = [];
        this.scene.traverse((child) => {
            if (child.isMesh) {
                meshes.push(child);
            }
        });
        
        const intersects = this.raycaster.intersectObjects(meshes, false);
        
        if (intersects.length > 0) {
            const intersectedMesh = intersects[0].object;
            
            if (isClick) {
                // Handle click
                if (this.onMeshClick) {
                    this.onMeshClick(intersectedMesh.name || 'unknown', intersectedMesh);
                }
            } else {
                // Handle hover
                if (intersectedMesh !== this.currentHighlightedMesh) {
                    this.unhighlightAllMeshes();
                    this.highlightMesh(intersectedMesh);
                    this.currentHighlightedMesh = intersectedMesh;
                    
                    if (this.onMeshHover) {
                        this.onMeshHover(intersectedMesh.name || 'unknown', intersectedMesh);
                    }
                }
            }
        } else {
            // No intersection
            if (!isClick && this.currentHighlightedMesh) {
                this.unhighlightAllMeshes();
                this.currentHighlightedMesh = null;
                
                if (this.onMeshHover) {
                    this.onMeshHover(null);
                }
            }
        }
    }
    
    highlightMesh(mesh) {
        if (!mesh || !mesh.material) return;
        
        // Store original material if not already stored
        if (!this.originalMaterials.has(mesh.uuid)) {
            this.originalMaterials.set(mesh.uuid, mesh.material.clone());
        }
        
        // Create highlight material
        const highlightMaterial = mesh.material.clone();
        
        if (highlightMaterial.emissive) {
            highlightMaterial.emissive.setHex(0x444444);
        }
        
        if (highlightMaterial.color) {
            highlightMaterial.color.multiplyScalar(1.2);
        }
        
        mesh.material = highlightMaterial;
    }
    
    unhighlightAllMeshes() {
        this.scene.traverse((child) => {
            if (child.isMesh && this.originalMaterials.has(child.uuid)) {
                const originalMaterial = this.originalMaterials.get(child.uuid);
                if (!this.isWireframe) {
                    child.material = originalMaterial;
                } else {
                    // If in wireframe mode, restore wireframe version
                    if (this.wireframeMaterials.has(child.uuid)) {
                        child.material = this.wireframeMaterials.get(child.uuid);
                    }
                }
            }
        });
    }
    
    async loadModel(url) {
        const loader = new GLTFLoader();
        
        try {
            const gltf = await new Promise((resolve, reject) => {
                loader.load(url, resolve, undefined, reject);
            });
            
            this.model = gltf.scene;
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(this.model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            // Center the model
            this.model.position.sub(center);
            
            // Scale to fit in view
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            this.model.scale.setScalar(scale);
            
            // Enable shadows
            this.model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    
                    // Index mesh objects by name
                    if (child.name) {
                        this.meshObjects[child.name] = child;
                        console.log(`Indexed mesh: ${child.name}`);
                    }
                    
                    // Store original materials
                    if (child.material) {
                        this.originalMaterials.set(child.uuid, child.material.clone());
                    }
                }
            });
            
            this.scene.add(this.model);
            
            // Update camera to frame the model
            this.frameModel();
            
            console.log('Model loaded successfully:', Object.keys(this.meshObjects));
            
            if (this.onModelLoaded) {
                this.onModelLoaded(this.model);
            }
            
        } catch (error) {
            console.error('Error loading model:', error);
            throw error;
        }
    }
    
    frameModel() {
        if (!this.model) return;
        
        const box = new THREE.Box3().setFromObject(this.model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = this.camera.fov * (Math.PI / 180);
        const distance = maxDim / (2 * Math.tan(fov / 2));
        
        // Add extra distance multiplier to move camera further back
        const distanceMultiplier = 2.5;
        
        this.camera.position.set(
            center.x + distance * distanceMultiplier * 0.8,
            center.y + distance * distanceMultiplier * 0.6,
            center.z + distance * distanceMultiplier
        );
        
        this.controls.target.copy(center);
        this.controls.update();
    }
    
    toggleWireframe() {
        if (!this.model) return;
        
        this.isWireframe = !this.isWireframe;
        
        this.scene.traverse((child) => {
            if (child.isMesh && child.material) {
                if (this.isWireframe) {
                    // Switch to wireframe
                    if (!this.wireframeMaterials.has(child.uuid)) {
                        const wireframeMaterial = child.material.clone();
                        wireframeMaterial.wireframe = true;
                        wireframeMaterial.color.setHex(0x000000);
                        wireframeMaterial.transparent = true;
                        wireframeMaterial.opacity = 0.8;
                        
                        // Remove textures for cleaner wireframe
                        if (wireframeMaterial.map) {
                            wireframeMaterial.map = null;
                        }
                        if (wireframeMaterial.normalMap) {
                            wireframeMaterial.normalMap = null;
                        }
                        
                        this.wireframeMaterials.set(child.uuid, wireframeMaterial);
                    }
                    
                    child.material = this.wireframeMaterials.get(child.uuid);
                } else {
                    // Switch back to solid
                    if (this.originalMaterials.has(child.uuid)) {
                        child.material = this.originalMaterials.get(child.uuid);
                    }
                }
            }
        });
        
        return this.isWireframe;
    }
    
    resetView() {
        this.frameModel();
    }
    
    // Get mesh by name for external highlighting
    getMeshByName(name) {
        return this.meshObjects[name] || null;
    }
    
    // Highlight specific mesh by name
    highlightMeshByName(name) {
        const mesh = this.getMeshByName(name);
        if (mesh) {
            this.unhighlightAllMeshes();
            this.highlightMesh(mesh);
            this.currentHighlightedMesh = mesh;
        }
    }
    
    // Get position for mesh picking (for external use)
    positionAndNormalFromPoint(x, y) {
        this.mouse.x = x;
        this.mouse.y = y;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        const meshes = [];
        this.scene.traverse((child) => {
            if (child.isMesh) {
                meshes.push(child);
            }
        });
        
        const intersects = this.raycaster.intersectObjects(meshes, false);
        
        if (intersects.length > 0) {
            return {
                position: intersects[0].point,
                normal: intersects[0].face?.normal || new THREE.Vector3(0, 1, 0)
            };
        }
        
        return null;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.controls) {
            this.controls.update();
        }
        
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
    
        // Create primitive geometry based on type
    createPrimitiveGeometry(primitiveType, scale = [1, 1, 1]) {
        switch (primitiveType.toLowerCase()) {
            case 'cube':
                return new THREE.BoxGeometry(scale[0], scale[1], scale[2]);
            case 'cylinder':
                return new THREE.CylinderGeometry(scale[0] * 0.5, scale[0] * 0.5, scale[1], 16);
            case 'sphere':
                return new THREE.SphereGeometry(scale[0] * 0.5, 16, 16);
            default:
                console.warn(`Unknown primitive type: ${primitiveType}, using cube`);
                return new THREE.BoxGeometry(scale[0], scale[1], scale[2]);
        }
    }

    // Update primitive type for demonstration
    updatePrimitiveType(primitiveType) {
        if (!this.model) return;
        
        // Find the first mesh to demonstrate the change
        let targetMesh = null;
        this.model.traverse((child) => {
            if (child.isMesh && !targetMesh) {
                targetMesh = child;
            }
        });
        
        if (targetMesh) {
            // Get current scale from the mesh
            const currentScale = [
                targetMesh.scale.x,
                targetMesh.scale.y,
                targetMesh.scale.z
            ];
            
            // Create new geometry
            const newGeometry = this.createPrimitiveGeometry(primitiveType, currentScale);
            
            // Dispose old geometry
            if (targetMesh.geometry) {
                targetMesh.geometry.dispose();
            }
            
            // Apply new geometry
            targetMesh.geometry = newGeometry;
            
            console.log(`Updated mesh geometry to: ${primitiveType}`);
            
            // Add visual feedback with brief color change
            if (targetMesh.material) {
                const originalColor = targetMesh.material.color.clone();
                targetMesh.material.color.setHex(0x00ff00);
                
                setTimeout(() => {
                    targetMesh.material.color.copy(originalColor);
                }, 1000);
            }
        }
    }

    dispose() {
        // Clean up resources
        if (this.renderer) {
            this.renderer.dispose();
            if (this.container.contains(this.renderer.domElement)) {
                this.container.removeChild(this.renderer.domElement);
            }
        }

        if (this.controls) {
            this.controls.dispose();
        }

        // Clean up materials
        this.originalMaterials.clear();
        this.wireframeMaterials.clear();

        // Remove event listeners
        window.removeEventListener('resize', this.onWindowResize);
    }
} 