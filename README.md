# MeshLLM Web Demo

This project is a web-based demo for **MeshLLM: LLM-Powered Structured Mesh Code Generation from Point Clouds**. MeshLLM automatically converts point cloud data into editable Blender Python code and generates structured 3D meshes.

## Features

- Visualizes the workflow from point cloud to structured mesh
- Animated code display with syntax highlighting, line numbers, and typing animation
- One-to-one correspondence between code and 3D structure for easy understanding and editing
- Responsive design, works on various devices
- Supports multiple 3D object case studies

## Directory Structure

```
web/MeshCoder/
├── index.html           # Main web page
├── code.html            # Animated code display page
├── static/
│   ├── css/             # Stylesheets (Bulma, FontAwesome, custom CSS, etc.)
│   └── js/              # JavaScript (animation, interaction, carousel, etc.)
├── assets/
│   ├── gifs/            # Animation GIFs (point cloud, mesh, etc.)
│   └── imgs/            # Image resources
└── README.md            # Project documentation
```

## Dependencies

- Pure front-end project, no backend required
- Main dependencies:
  - [Bulma](https://bulma.io/) (CSS framework)
  - [FontAwesome](https://fontawesome.com/) (icon library)
  - [Academicons](https://jpswalsh.github.io/academicons/) (academic icons)
  - [jQuery](https://jquery.com/) (for some interactions)
  - Custom JS/CSS in `static/`

## How to Run

1. **Local Preview**
   - Simply open `index.html` in your browser. No build or server is required.
   - Recommended browsers: Chrome, Edge, Firefox, etc.

2. **Local Server (Optional)**
   - For best compatibility (e.g., with local resource loading), you can start a simple HTTP server:
     ```bash
     cd web/MeshCoder
     python3 -m http.server 8080
     ```
   - Then visit [http://localhost:8080](http://localhost:8080) in your browser.

## Main Files

- `index.html`: Main page with project intro, animation demo, and case switching
- `code.html`: Animated code display with syntax highlighting and line numbers
- `static/css/index.css`: Custom styles
- `static/js/index.js`: Custom interaction logic
- `assets/gifs/`: Demo animations for point cloud and mesh

## Contribution & Feedback

If you have suggestions, find bugs, or want to contribute, feel free to open an Issue or Pull Request. 