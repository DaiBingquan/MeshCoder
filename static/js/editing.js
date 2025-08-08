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
        this.currentModel = 'sofa'; // Default model
        this.meshParts = [];
        this.isInitialized = false;
        this.currentHighlightedFunction = null;
        this.currentHighlightedBlock = null;
        
        this.lastHighlightedMesh = null;
        
        // Track user scroll activity to avoid interfering with auto-scroll
        this.lastUserScrollTime = 0;
        this.userScrollTimeout = null;
        
        // Predefined part names for each model (matching the actual object names in the 3D models)
        // Ordered by importance: main parts first, then supporting parts
        this.modelPartNames = {
            sofa: [
                'cushion_11', 'cushion_12', 'arm_7', 'arm_10', 'back sofa board_8', 'sofa board_9',
                'leg_1', 'leg_2', 'leg_3', 'leg_4', 'leg_5', 'leg_6'
            ],
            chair: [
                'seat_8', 'back_9', 'back_12', 'arm_10', 'arm_11', 'back decoration_7',
                'leg_1', 'leg_2', 'leg_3', 'leg_4', 'leg decoration_5', 'leg decoration_6'
            ],
            table: [
                'table top_9', 'strecher_5', 'strecher_6', 'strecher_7', 'strecher_8',
                'leg_1', 'leg_2', 'leg_3', 'leg_4'
            ],
            lamp: [
                'cylinder shade_4', 'bulb_12', 'bulb tube_5', 'bulb contact_7', 'lamp base_1',
                'lamp post_2', 'lamp post_3', 'lamp rack_6', 'lamp rack_8', 'lamp rack_10', 'lamp rack_11', 'lamp rack_13', 'spiral'
            ],
            door: [
                'door_1', 'frame_2', 'knob_4', 'knob_5', 'knob_6', 'knob_7', 'cube_3'
            ],
            window: [
                'panel_1', 'shutter_frame_2', 'curtain_7', 'curtain_8', 'curtain_hold_4', 'curtain_hold_5',
                'curtain_hold_6', 'curtain_hold_9', 'curtain_hold_10', 'cube_3'
            ],
            toilet: [
                'seat_4', 'tank_5', 'cover_6', 'cap_7', 'button_8', 'stand_1', 'back_2', 'tube_3', 'BridgeLoop_2_2'
            ],
            bowl: [
                'bowl_1'
            ],
            office_chair: [
                'seat_19', 'leg_17', 'leg_18', 'chair base_13', 'chair base_14', 'chair base_15', 'chair base_16',
                'wheel_1', 'wheel_4', 'wheel_6', 'wheel_7', 'wheel cap_2', 'wheel cap_3', 'wheel cap_5', 'wheel cap_8',
                'wheel axle_9', 'wheel axle_10', 'wheel axle_11', 'wheel axle_12'
            ],
            triangle_shelf: [
                'shelf board_5', 'shelf board_6', 'shelf board_8', 'side board_4', 'side board_7',
                'shelf leg_1', 'shelf leg_2', 'shelf leg_3'
            ]
        };

        // Model code templates for editing (simplified versions with actual mesh names)
        this.modelCodes = {
            sofa: `create_primitive(name='cushion_11', primitive_type='cube', location=[0.0, -0.2, -0.08], scale=[0.42, 0.32, 0.13], rotation=[0.5, -0.5, 0.5, 0.5])
bevel(name='cushion_11', width=0.28, segments=4)

create_curve(name=['curve_1_12', 'curve_2_12', 'curve_3_12', 'curve_4_12', 'curve_5_12'], control_points=[[[-0.34, 0.088, -0.154], [-0.34, 0.165, -0.214], [-0.339, 0.267, -0.212], [-0.339, 0.18, -0.151]], [[-0.293, -0.078, -0.097], [-0.292, 0.154, -0.246], [-0.292, 0.428, -0.261], [-0.293, 0.191, -0.119]], [[-0.003, -0.136, -0.075], [-0.001, 0.143, -0.289], [0.001, 0.486, -0.284], [0.002, 0.203, -0.075]], [[0.292, -0.078, -0.097], [0.293, 0.154, -0.246], [0.293, 0.428, -0.261], [0.292, 0.191, -0.119]], [[0.339, 0.088, -0.154], [0.339, 0.165, -0.214], [0.34, 0.267, -0.212], [0.34, 0.18, -0.151]]], points_radius=[1, 1, 1, 1], handle_type=[0, 0, 0, 0, 0, 0, 0, 0], closed=True)
bridge_edge_loops(name='cushion_12', profile_name=['curve_1_12', 'curve_2_12', 'curve_3_12', 'curve_4_12', 'curve_5_12'], number_cuts=4, smoothness=0.69, interpolation='SURFACE', fill_caps='both')

create_quad(name=['quad_1_7', 'quad_2_7', 'quad_3_7', 'quad_4_7'], control_points=[[[-0.278, 0.218, 0.499], [-0.215, -0.421, 0.499], [-0.46, -0.416, 0.499], [-0.474, 0.226, 0.499]], [[-0.278, 0.218, 0.188], [-0.215, -0.421, 0.188], [-0.46, -0.416, 0.188], [-0.474, 0.226, 0.188]], [[-0.273, 0.272, -0.137], [-0.215, -0.421, -0.137], [-0.46, -0.416, -0.137], [-0.468, 0.271, -0.137]], [[-0.262, 0.379, -0.499], [-0.215, -0.421, -0.499], [-0.46, -0.416, -0.499], [-0.455, 0.378, -0.499]]])
bridge_edge_loops(name='arm_7', profile_name=['quad_1_7', 'quad_2_7', 'quad_3_7', 'quad_4_7'], number_cuts=16, smoothness=0.75, interpolation='SURFACE', fill_caps='both')
bevel(name='arm_7', width=0.06, segments=2)

create_quad(name=['quad_1_10', 'quad_2_10', 'quad_3_10', 'quad_4_10'], control_points=[[[0.474, 0.226, 0.499], [0.46, -0.416, 0.499], [0.215, -0.421, 0.499], [0.278, 0.218, 0.499]], [[0.474, 0.226, 0.188], [0.46, -0.416, 0.188], [0.215, -0.421, 0.188], [0.278, 0.218, 0.188]], [[0.468, 0.271, -0.137], [0.46, -0.416, -0.137], [0.215, -0.421, -0.137], [0.273, 0.272, -0.137]], [[0.455, 0.378, -0.499], [0.46, -0.416, -0.499], [0.215, -0.421, -0.499], [0.262, 0.379, -0.499]]])
bridge_edge_loops(name='arm_10', profile_name=['quad_1_10', 'quad_2_10', 'quad_3_10', 'quad_4_10'], number_cuts=16, smoothness=0.75, interpolation='SURFACE', fill_caps='both')
bevel(name='arm_10', width=0.06, segments=2)

create_primitive(name='back sofa board_8', primitive_type='cube', location=[0.0, -0.1, -0.39], scale=[0.32, 0.31, 0.1], rotation=[0.0, 0.0, 0.0, 1.0])
bevel(name='back sofa board_8', width=0.27, segments=4)

create_primitive(name='sofa board_9', primitive_type='cube', location=[0.0, -0.37, 0.04], scale=[0.33, 0.33, 0.05], rotation=[0.71, -0.71, 0.0, 0.0])
bevel(name='sofa board_9', width=0.28, segments=4)

create_circle(name='circle_1', radius=0.01, center='MEDIAN')
create_curve(name='leg_1', profile_name='circle_1', control_points=[[-0.39, -0.4, -0.31], [-0.39, -0.48, -0.31]], points_radius=[1.0, 0.4], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

create_circle(name='circle_2', radius=0.01, center='MEDIAN')
create_curve(name='leg_2', profile_name='circle_2', control_points=[[-0.39, -0.4, 0.18], [-0.39, -0.48, 0.18]], points_radius=[1.0, 0.4], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

create_circle(name='circle_3', radius=0.01, center='MEDIAN')
create_curve(name='leg_3', profile_name='circle_3', control_points=[[-0.21, -0.4, 0.26], [-0.21, -0.49, 0.26]], points_radius=[1.0, 0.4], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

create_circle(name='circle_4', radius=0.01, center='MEDIAN')
create_curve(name='leg_4', profile_name='circle_4', control_points=[[0.21, -0.4, 0.26], [0.21, -0.49, 0.26]], points_radius=[1.0, 0.4], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

create_circle(name='circle_5', radius=0.01, center='MEDIAN')
create_curve(name='leg_5', profile_name='circle_5', control_points=[[0.39, -0.4, -0.31], [0.39, -0.48, -0.31]], points_radius=[1.0, 0.4], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

create_circle(name='circle_6', radius=0.01, center='MEDIAN')
create_curve(name='leg_6', profile_name='circle_6', control_points=[[0.39, -0.4, 0.18], [0.39, -0.48, 0.18]], points_radius=[1.0, 0.4], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

`,           
            chair:`create_curve(name='seat_8', control_points=[[-0.0, -0.05, -0.23], [-0.24, -0.05, -0.23], [-0.24, -0.05, 0.09], [-0.24, -0.05, 0.19], [-0.0, -0.05, 0.24], [0.24, -0.05, 0.19], [0.24, -0.05, 0.09], [0.24, -0.05, -0.23], [-0.0, -0.05, -0.23]], handle_type=[0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0])
fill_grid(name='seat_8', thickness=0.0669)
bevel(name='seat_8', width=0.03, segments=1)

create_primitive(name='back_9', primitive_type='cylinder', location=[-0.21, 0.23, -0.21], scale=[0.02, 0.02, 0.24], rotation=[0.27, -0.27, 0.65, 0.65])

create_primitive(name='back_12', primitive_type='cylinder', location=[0.21, 0.23, -0.21], scale=[0.02, 0.02, 0.24], rotation=[0.27, -0.27, 0.65, 0.65])

create_rectangle(name='rectangle_10', width=0.03, length=0.05, rotation_rad=-0.49,center='MEDIAN',closed=True)
create_curve(name='arm_10', profile_name='rectangle_10', control_points=[[-0.2, -0.02, 0.18], [-0.19, 0.08, 0.18], [-0.19, 0.14, 0.19], [-0.19, 0.15, 0.14], [-0.19, 0.15, 0.01], [-0.19, 0.15, -0.05], [-0.19, 0.16, -0.12], [-0.2, 0.16, -0.21]], points_radius=[1.0, 1.0, 1.0, 1.0], handle_type=[0, 3, 3, 1, 1, 3, 3, 0], thickness=0.0, fill_caps='both')

create_rectangle(name='rectangle_11', width=0.03, length=0.05, rotation_rad=0.49,center='MEDIAN',closed=True)
create_curve(name='arm_11', profile_name='rectangle_11', control_points=[[0.2, -0.02, 0.18], [0.19, 0.08, 0.18], [0.19, 0.14, 0.19], [0.19, 0.15, 0.14], [0.19, 0.15, 0.01], [0.19, 0.15, -0.05], [0.19, 0.16, -0.12], [0.2, 0.16, -0.21]], points_radius=[1.0, 1.0, 1.0, 1.0], handle_type=[0, 3, 3, 1, 1, 3, 3, 0], thickness=0.0, fill_caps='both')

create_curve(name=['line_1_7', 'line_2_7'], control_points=[[[-0.234, 0.467, -0.191], [-0.234, -0.021, -0.191]], [[0.236, 0.467, -0.191], [0.236, -0.021, -0.191]]], handle_type=[1, 1, 1, 1])
bridge_edge_loops(name='back decoration_7', profile_name=['line_1_7', 'line_2_7'], number_cuts=16, smoothness=0.84, profile_shape_factor=0.16)
solidify(name='back decoration_7', thickness=0.04)
bevel(name='back decoration_7', width=0.01, segments=7)

create_primitive(name='leg_1', primitive_type='cylinder', location=[-0.21, -0.16, -0.21], scale=[0.02, 0.02, 0.24], rotation=[0.68, -0.68, 0.2, 0.2])

create_primitive(name='leg_2', primitive_type='cylinder', location=[-0.21, -0.16, 0.17], scale=[0.02, 0.02, 0.24], rotation=[0.65, -0.65, -0.27, -0.27])

create_primitive(name='leg_3', primitive_type='cylinder', location=[0.21, -0.16, -0.21], scale=[0.02, 0.02, 0.24], rotation=[0.27, -0.27, 0.65, 0.65])

create_primitive(name='leg_4', primitive_type='cylinder', location=[0.21, -0.16, 0.17], scale=[0.02, 0.02, 0.24], rotation=[0.65, -0.65, -0.27, -0.27])

create_primitive(name='leg decoration_5', primitive_type='cylinder', location=[-0.21, -0.15, -0.02], scale=[0.02, 0.02, 0.19], rotation=[0.0, -0.0, -0.0, -1.0])

create_primitive(name='leg decoration_6', primitive_type='cylinder', location=[0.21, -0.15, -0.02], scale=[0.02, 0.02, 0.19], rotation=[0.0, -0.0, -0.0, -1.0])

`, 

            table: `create_primitive(name='table top_9', primitive_type='cube', location=[0.0, 0.49, 0.0], scale=[0.2, 0.2, 0.01], rotation=[0.5, 0.5, 0.5, -0.5])
bevel(name='table top_9', width=0.15, segments=9)

create_primitive(name='strecher_5', primitive_type='cylinder', location=[0.0, 0.2, -0.14], scale=[0.01, 0.01, 0.14], rotation=[0.52, 0.47, 0.53, 0.47])

create_primitive(name='strecher_6', primitive_type='cylinder', location=[-0.14, 0.2, -0.0], scale=[0.01, 0.01, 0.14], rotation=[0.0, 0.05, 1.0, 0.0])

create_primitive(name='strecher_7', primitive_type='cylinder', location=[-0.0, 0.2, 0.14], scale=[0.01, 0.01, 0.14], rotation=[0.52, 0.47, 0.53, 0.47])

create_primitive(name='strecher_8', primitive_type='cylinder', location=[0.14, 0.2, 0.0], scale=[0.01, 0.01, 0.14], rotation=[0.0, 0.05, 1.0, 0.0])

create_polygon(name='hexagon_1', sides=6, radius=0.01)
create_curve(name='leg_1', profile_name='hexagon_1', control_points=[[-0.15, -0.5, -0.15], [-0.14, 0.18, -0.14], [-0.13, 0.47, -0.13]], points_radius=[1.0, 1.75, 1.75], handle_type=[1, 1, 1, 1, 1, 1], thickness=0.0, fill_caps='both')

create_polygon(name='hexagon_2', sides=6, radius=0.01)
create_curve(name='leg_2', profile_name='hexagon_2', control_points=[[-0.15, -0.5, 0.15], [-0.14, 0.18, 0.14], [-0.13, 0.47, 0.13]], points_radius=[1.0, 1.75, 1.75], handle_type=[1, 1, 1, 1, 1, 1], thickness=0.0, fill_caps='both')

create_polygon(name='hexagon_3', sides=6, radius=0.01)
create_curve(name='leg_3', profile_name='hexagon_3', control_points=[[0.15, -0.5, -0.15], [0.14, 0.18, -0.14], [0.13, 0.47, -0.13]], points_radius=[1.0, 1.75, 1.75], handle_type=[1, 1, 1, 1, 1, 1], thickness=0.0, fill_caps='both')

create_polygon(name='hexagon_4', sides=6, radius=0.01)
create_curve(name='leg_4', profile_name='hexagon_4', control_points=[[0.15, -0.5, 0.15], [0.14, 0.18, 0.14], [0.13, 0.47, 0.13]], points_radius=[1.0, 1.75, 1.75], handle_type=[1, 1, 1, 1, 1, 1], thickness=0.0, fill_caps='both')

`,

            lamp: `create_curve(name='curve_4', control_points=[[0.166, 0.0, 0.0], [0.18, 0.09, 0.0], [0.207, 0.346, 0.0]], handle_type=[0, 0, 0, 0, 0, 0])
create_circle(name='cylinder shade_4', profile_name='curve_4', radius=0.11, location=[-0.0, 0.43, -0.0], rotation=[0.71, 0.71, 0.02, -0.03], thickness=0.0067)

create_curve(name='curve_12', control_points=[[0.032, 0.0, 0.0], [0.037, 0.011, 0.0], [0.044, 0.032, 0.0], [0.082, 0.118, 0.0], [0.074, 0.172, 0.0], [0.045, 0.206, 0.0], [0.0, 0.215, 0.0]], handle_type=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
bezier_rotation(name='bulb_12', profile_name='curve_12', location=[-0.0, 0.28, -0.0], rotation=[0.51, -0.51, 0.49, 0.49], thickness=0.0)

create_primitive(name='bulb tube_5', primitive_type='cylinder', location=[-0.0, 0.26, -0.0], scale=[0.03, 0.03, 0.02], rotation=[0.7, 0.7, -0.07, 0.07])

create_circle(name='circle_7', radius=0.03, center='MEDIAN')
create_curve(name='bulb contact_7', profile_name='circle_7', control_points=[[-0.0, 0.24, -0.0], [-0.0, 0.23, -0.0], [-0.0, 0.22, -0.0]], points_radius=[1.0, 0.55, 0.3], handle_type=[1, 1, 1, 1, 1, 1], thickness=0.0, fill_caps='both')

create_primitive(name='lamp base_1', primitive_type='cylinder', location=[-0.0, -0.47, -0.0], scale=[0.21, 0.21, 0.03], rotation=[0.7, 0.7, -0.07, 0.07])

create_primitive(name='lamp post_2', primitive_type='cylinder', location=[-0.0, -0.47, -0.0], scale=[0.02, 0.02, 0.03], rotation=[0.7, -0.7, -0.07, -0.07])

create_primitive(name='lamp post_3', primitive_type='cylinder', location=[-0.0, -0.11, -0.0], scale=[0.02, 0.02, 0.3], rotation=[0.7, -0.7, -0.07, -0.07])

create_primitive(name='lamp rack_6', primitive_type='cylinder', location=[-0.07, 0.34, -0.13], scale=[0.005, 0.005, 0.15], rotation=[0.09, -0.43, 0.84, 0.29])

create_primitive(name='lamp rack_8', primitive_type='cylinder', location=[-0.07, 0.34, 0.13], scale=[0.005, 0.005, 0.15], rotation=[0.39, 0.88, -0.17, 0.17])

create_circle(name='circle_10', radius=0.005, center='MEDIAN')
create_circle(name='lamp rack_10', profile_name='circle_10', radius=0.03, location=[-0.0, 0.24, -0.0], rotation=[0.7, 0.7, -0.1, 0.08], thickness=0.0, fill_caps='both')

create_primitive(name='lamp rack_11', primitive_type='cylinder', location=[0.15, 0.34, -0.0], scale=[0.005, 0.005, 0.15], rotation=[0.7, 0.56, -0.43, -0.06])

create_curve(name='curve_13', control_points=[[0.0, 0.0, 0.0], [-0.005, -0.005, 0.0], [0.003, -0.005, 0.0]], handle_type=[0, 0, 0, 0, 0, 0], closed=True, center='POINT')
create_circle(name='lamp rack_13', profile_name='curve_13', radius=0.27, location=[-0.0, 0.43, -0.0], rotation=[0.7, 0.7, -0.08, 0.06], thickness=0.0, fill_caps='none')

create_circle(name="circle", radius=0.003)
create_spiral(name="spiral", profile_name="circle", dif_z=0.01, radius=0.03, turns=5, thickness=0.0, location=[-0.0, 0.26, -0.0], rotation=[0.71, 0.71, -0.0, 0.0], fill_caps="both")

`,

            door: `create_primitive(name='door_1', primitive_type='cube', location=[0.0, 0.0, 0.0], scale=[0.5, 0.22, 0.01], rotation=[0.71, 0.0, -0.0, 0.71])

create_rectangle(name='rectangle_2', width=0.02, length=0.03, rotation_rad=-0.0, center='MEDIAN', closed=True)
create_rectangle(name='frame_2', profile_name='rectangle_2', width=0.35, length=0.36, location=[0.0, -0.03, 0.0], rotation=[0.0, -0.0, -1.0, 0.0], closed=True, thickness=0.0, fill_caps='none')

create_curve(name='curve_4', control_points=[[0.0, 0.0, 0.0], [0.017, 0.0, 0.0], [0.017, 0.006, 0.0], [0.008, 0.006, 0.0], [0.008, 0.035, 0.0], [0.0, 0.035, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
bezier_rotation(name='knob_4', profile_name='curve_4', location=[-0.2, -0.02, -0.01], rotation=[0.01, 0.07, 1.0, -0.0], thickness=0.0)

create_curve(name='curve_5', control_points=[[0.0, 0.0, 0.0], [0.017, 0.0, 0.0], [0.017, 0.006, 0.0], [0.008, 0.006, 0.0], [0.008, 0.035, 0.0], [0.0, 0.035, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
bezier_rotation(name='knob_5', profile_name='curve_5', location=[-0.2, -0.02, 0.01], rotation=[0.07, 0.01, -0.0, 1.0], thickness=0.0)

create_curve(name=['curve_1_6', 'curve_2_6', 'curve_3_6', 'curve_4_6', 'curve_5_6'], control_points=[[[-0.199, -0.023, -0.039], [-0.199, -0.025, -0.039], [-0.199, -0.026, -0.04], [-0.199, -0.024, -0.04]], [[-0.196, -0.019, -0.037], [-0.196, -0.024, -0.037], [-0.196, -0.03, -0.042], [-0.196, -0.024, -0.042]], [[-0.16, -0.017, -0.036], [-0.16, -0.025, -0.035], [-0.16, -0.032, -0.043], [-0.16, -0.024, -0.043]], [[-0.124, -0.019, -0.037], [-0.124, -0.024, -0.037], [-0.124, -0.03, -0.042], [-0.124, -0.024, -0.042]], [[-0.122, -0.023, -0.039], [-0.122, -0.025, -0.039], [-0.122, -0.026, -0.04], [-0.122, -0.024, -0.04]]], points_radius=[1, 1, 1, 1], handle_type=[0, 0, 0, 0, 0, 0, 0, 0], closed=True)
bridge_edge_loops(name='knob_6', profile_name=['curve_1_6', 'curve_2_6', 'curve_3_6', 'curve_4_6', 'curve_5_6'], number_cuts=4, smoothness=0.45, interpolation='SURFACE', fill_caps='both')

create_curve(name=['curve_1_7', 'curve_2_7', 'curve_3_7', 'curve_4_7', 'curve_5_7'], control_points=[[[-0.199, -0.023, 0.04], [-0.199, -0.024, 0.04], [-0.199, -0.026, 0.04], [-0.199, -0.025, 0.039]], [[-0.196, -0.019, 0.04], [-0.196, -0.024, 0.042], [-0.196, -0.03, 0.039], [-0.196, -0.024, 0.037]], [[-0.16, -0.017, 0.04], [-0.16, -0.024, 0.043], [-0.16, -0.032, 0.039], [-0.16, -0.025, 0.036]], [[-0.124, -0.019, 0.04], [-0.124, -0.024, 0.042], [-0.124, -0.03, 0.039], [-0.124, -0.024, 0.037]], [[-0.122, -0.023, 0.04], [-0.122, -0.024, 0.04], [-0.122, -0.026, 0.04], [-0.122, -0.025, 0.039]]], points_radius=[1, 1, 1, 1], handle_type=[0, 0, 0, 0, 0, 0, 0, 0], closed=True)
bridge_edge_loops(name='knob_7', profile_name=['curve_1_7', 'curve_2_7', 'curve_3_7', 'curve_4_7', 'curve_5_7'], number_cuts=4, smoothness=0.45, interpolation='SURFACE', fill_caps='both')

create_primitive(name='cube_3', primitive_type='cube', location=[0.0, -0.439, 0.0], scale=[0.002, 0.175, 0.01], rotation=[0.184, -0.682, -0.685, -0.178], apply=True)
array_1d(name='cube_3', fit_type='FIXED_COUNT', count=41, constant_offset=[0.0, 0.01, 0.0])

`,

            window: `create_rectangle(name='rectangle_1', width=0.04, length=0.11, rotation_rad=0.0, center='MEDIAN', closed=True)
create_rectangle(name='panel_1', profile_name='rectangle_1', width=0.85, length=0.97, location=[-0.0, -0.03, 0.0], rotation=[0.71, -0.71, 0.0, -0.0], closed=True, thickness=0.0, fill_caps='none')

create_rectangle(name='rectangle_2', width=0.04, length=0.11, rotation_rad=0.0, center='MEDIAN', closed=True)
create_rectangle(name='shutter_frame_2', profile_name='rectangle_2', width=0.80, length=0.91, location=[-0.0, -0.03, 0.0], rotation=[0.71, -0.71, 0.0, -0.0], closed=True, thickness=0.0, fill_caps='none')

create_wave(name='wave_7', shift=0.56, frequency=3.4, altitude=0.03, length=0.39, rotation_rad=-0.0)
create_curve(name='curtain_7', profile_name='wave_7', control_points=[[-0.24, 0.06, 0.49], [-0.24, 0.06, -0.49]], handle_type=[1, 1, 1, 1], thickness=0.0)

create_wave(name='wave_8', shift=0.56, frequency=3.26, altitude=0.03, length=0.38, rotation_rad=-0.0)
create_curve(name='curtain_8', profile_name='wave_8', control_points=[[0.27, 0.06, 0.49], [0.27, 0.06, -0.49]], handle_type=[1, 1, 1, 1], thickness=0.0)

create_primitive(name='curtain_hold_4', primitive_type='uv_sphere', location=[-0.42, 0.06, 0.46], scale=[0.02, 0.02, 0.02], rotation=[0.42, -0.26, -0.05, -0.87])

create_primitive(name='curtain_hold_5', primitive_type='cylinder', location=[-0.42, 0.04, 0.46], scale=[0.01, 0.01, 0.02], rotation=[0.5, -0.5, -0.5, -0.5])

create_polygon(name='hexagon_6', sides=6, radius=0.004)
create_curve(name='curtain_hold_6', profile_name='hexagon_6', control_points=[[0.42, 0.06, 0.46], [-0.42, 0.06, 0.46]], points_radius=[1.0, 1.0], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

create_primitive(name='curtain_hold_9', primitive_type='uv_sphere', location=[0.42, 0.06, 0.46], scale=[0.02, 0.02, 0.02], rotation=[0.42, -0.26, -0.05, -0.87])

create_primitive(name='curtain_hold_10', primitive_type='cylinder', location=[0.42, 0.04, 0.46], scale=[0.01, 0.01, 0.02], rotation=[0.45, -0.45, 0.55, 0.55])

create_primitive(name='cube_3', primitive_type='cube', location=[-0.0, -0.033, 0.414], scale=[0.002, 0.379,]()_

`,

            toilet: `create_curve(name='loop_1_4', control_points=[[0.174, -0.061, 0.422], [0.001, -0.061, 0.422], [-0.172, -0.061, 0.422], [-0.244, -0.061, 0.234], [-0.244, -0.061, 0.052], [-0.244, -0.061, -0.12], [-0.145, -0.061, -0.174], [-0.145, -0.061, -0.24], [0.15, -0.061, -0.24], [0.15, -0.061, -0.174], [0.244, -0.061, -0.12], [0.244, -0.061, 0.052], [0.244, -0.061, 0.234]], handle_type=[3, 3, 3, 3, 0, 1,1, 1, 1, 1, 1, 0, 3, 3], closed=True)
create_curve(name='loop_2_4', control_points=[[0.133, -0.061, 0.336], [0.001, -0.061, 0.336], [-0.131, -0.061, 0.336], [-0.185, -0.061, 0.188], [-0.185, -0.061, 0.052], [-0.185, -0.061, -0.08], [-0.095, -0.061, -0.114], [0.001, -0.061, -0.13], [0.097, -0.061, -0.114], [0.185, -0.061, -0.08], [0.185, -0.061, 0.052], [0.185, -0.061, 0.188]], handle_type=[3, 3, 3, 3, 3, 3, 3, 3], closed=True)
bridge_edge_loops(name='seat_4', profile_name=['loop_1_4', 'loop_2_4'], fill_caps='none', number_cuts=0)
solidify(name='seat_4', thickness=0.02)

create_curve(name='loop_3_2', control_points=[[0.24, -0.041, 0.152], [0.134, -0.253, 0.152], [0.026, -0.356, 0.152], [-0.022, -0.356, 0.152], [-0.127, -0.253, 0.152], [-0.23, -0.041, 0.152]], handle_type=[1, 1, 0, 0, 1, 1], closed=True)
create_curve(name='loop_4_2', control_points=[[0.18, -0.041, -0.412], [0.099, -0.253, -0.412], [0.018, -0.356, -0.412], [-0.017, -0.356, -0.412], [-0.106, -0.253, -0.412], [-0.188, -0.041, -0.412]], handle_type=[1, 1, 0, 0, 1, 1], closed=True)
corrective_smooth(name=['loop_3_2', 'loop_4_2'])
bridge_edge_loops(name='back_2', profile_name=['loop_3_2', 'loop_4_2'], number_cuts=8, flip_normals=True, fill_caps='end')
boolean_operation(name1='back_2', name2='BridgeLoop_2_2', operation='DIFFERENCE', solver_mode='EXACT')

create_curve(name=['loop_1_6', 'loop_2_6'], control_points=[[
    [-0.186, 0.49, 0.131], [0.001, 0.49, 0.131], [0.187, 0.49, 0.131], [0.245, 0.34, 0.032], [0.245, 0.177, -0.081],
    [0.245, 0.047, -0.17], [0.15, -0.008, -0.213], [0.15, -0.053, -0.246], [-0.145, -0.053, -0.246],
    [-0.145, -0.008, -0.213], [-0.244, 0.047, -0.17], [-0.244, 0.177, -0.081], [-0.244, 0.34, 0.032]
], [
    [-0.186, 0.502, 0.121], [0.001, 0.502, 0.121], [0.187, 0.502, 0.121], [0.245, 0.352, 0.021], [0.245, 0.189, -0.099],
    [0.245, 0.059, -0.188], [0.15, -0.001, -0.231], [0.15, -0.046, -0.264], [-0.145, -0.046, -0.264],
    [-0.145, -0.001, -0.231], [-0.244, 0.059, -0.188], [-0.244, 0.189, -0.099], [-0.244, 0.352, 0.021]
]], handle_type=[3, 3, 3, 3, 0, 1, 1, 1, 1, 1, 1, 0, 3, 3], closed=True)
bridge_edge_loops(name='cover_6', profile_name=['loop_1_6', 'loop_2_6'], fill_caps='both', number_cuts=0)

create_primitive(name='cap_7', primitive_type='cube', location=[0.0, 0.21, -0.33], scale=[0.19, 0.08, 0.02], rotation=[0.0, 0.0, 0.71, 0.71])

create_primitive(name='button_8', primitive_type='cylinder', location=[0.0, 0.23, -0.33], scale=[0.02, 0.02, 0.01], rotation=[0.45, 0.45, 0.54, -0.55])

create_curve(name=['loop_1_1', 'loop_2_1'], control_points=[[[-0.102, -0.503, 0.244], [0.001, -0.503, 0.244], [0.105, -0.503, 0.244], [0.136, -0.503, 0.129], [0.136, -0.503, 0.022], [0.136, -0.503, -0.052], [0.08, -0.503, -0.109], [0.001, -0.503, -0.109], [-0.078, -0.503, -0.109], [-0.136, -0.503, -0.052], [-0.136, -0.503, 0.022], [-0.136, -0.503, 0.129]], [[-0.085, -0.331, 0.187], [0.001, -0.331, 0.187], [0.087, -0.331, 0.187], [0.127, -0.314, 0.129], [0.127, -0.314, 0.022], [0.127, -0.314, -0.052], [0.076, -0.314, -0.104], [0.001, -0.314, -0.104], [-0.074, -0.314, -0.104], [-0.127, -0.314, -0.052], [-0.127, -0.314, 0.022], [-0.127, -0.314, 0.129]]], handle_type=[3, 3, 3, 3, 3, 3, 3, 3], closed=True)
bridge_edge_loops(name='stand_1', profile_name=['loop_1_1', 'loop_2_1'], number_cuts=12, smoothness=1., profile_shape_factor=0.1, flip_normals=False)

create_curve(name=['loop_1_3', 'loop_2_3', 'loop_3_3'], control_points=[[[-0.158, -0.065, 0.358], [0.001, -0.065, 0.359], [0.159, -0.065, 0.36], [0.185, -0.069, 0.162], [0.186, -0.069, 0.044], [0.187, -0.069, -0.055], [0.097, -0.069, -0.127], [0.002, -0.069, -0.128], [-0.092, -0.069, -0.129], [-0.185,]()]()]()
            
`,

            bowl: `create_curve(name='curve_1', control_points=[[0.0, 0.0, 0.0], [0.14, 0.0, 0.0], [0.147, 0.0, 0.0], [0.14, 0.03, 0.0], [0.44, 0.274, 0.0], [0.487, 0.547, 0.0]], handle_type=[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0])
bezier_rotation(name='bowl_1', profile_name='curve_1', location=[-0.0, -0.27, 0.0], rotation=[0.7, -0.7, 0.08, 0.09], thickness=0.009)

`,

            office_chair: `create_primitive(name='seat_19', primitive_type='cylinder', location=[-0.0, -0.09, 0.0], scale=[0.02, 0.02, 0.08], rotation=[0.71, -0.7, 0.05, 0.05])
create_circle(name=['Circle_0_19', 'Circle_1_19', 'Circle_2_19', 'Circle_3_19', 'Circle_4_19', 'Circle_5_19', 'Circle_6_19', 'Circle_7_19', 'Circle_8_19'], location=[[-0.01, 1.03, 0.03], [-0.01, 1.02, 0.03], [-0.01, 0.98, 0.03], [-0.01, 0.74, 0.02], [-0.0, 0.24, 0.01], [-0.01, 0.45, 0.02], [-0.0, 0.05, 0.01], [-0.0, -0.01, 0.01], [-0.0, -0.02, 0.01]], rotation=[[0.72, -0.7, 0.0, -0.0]]*9, scale=[[0.01, 0.002, 0.44], [0.12, 0.002, 0.44], [0.15, 0.002, 0.44], [0.2, 0.02, 0.44], [0.26, 0.02, 0.44], [0.2, 0.02, 0.44], [0.21, 0.002, 0.44], [0.18, 0.002, 0.44], [0.01, 0.002, 0.44]])
bridge_edge_loops(name=['seat_19', 'BridgeLoop_2_19', 'BrigdeLoop_3_19', 'BridgeLoop_4_19', 'BridgeLoop_5_19'], profile_name=[['Circle_7_19', 'Circle_6_19', 'Circle_5_19'], ['Circle_4_19', 'Circle_3_19', 'Circle_2_19', 'Circle_1_19'], ['Circle_8_19', 'Circle_7_19'], ['Circle_1_19', 'Circle_0_19'], ['Circle_5_19', 'Circle_4_19']], number_cuts=[8, 32, 8, 8, 4], smoothness=[0.08, 0.19, 0.02, 0.46, 0.02], profile_shape_factor=[0.0, 0.03, 0.0, 0.01, 0.01], interpolation='SURFACE', fill_caps=['none', 'none', 'both', 'both', 'both'])
join_obj(name='seat_19', seq_name=['seat_19', 'BridgeLoop_2_19', 'BrigdeLoop_3_19', 'BridgeLoop_4_19', 'BridgeLoop_5_19'], weld_threshold=1e-4)
add_simple_deform_modifier(name='seat_19', angle=0.08, origin=[-0.0, -0.02, 0.01], rotation=[0.72, -0.7, 0.0, -0.0])
create_curve(name='curve_19', control_points=[[-0.0, 0.005, 0.266], [-0.0, -0.06, -0.531], [-0.0, 0.079, -0.092], [-0.0, 0.427, -0.234]], points_radius=[1, 1], handle_type=[0, 3, 3, 0])
add_curve_modifier_to_object(name='seat_19', curve_name='curve_19', origin=[-0.0, -0.02, 0.01], rotation=[0.72, -0.7, 0.0, -0.0], axis='POS_Z')

create_primitive(name='leg_17', primitive_type='cylinder', location=[-0.0, -0.28, 0.0], scale=[0.02, 0.02, 0.12], rotation=[0.71, -0.7, 0.05, 0.05])

create_primitive(name='leg_18', primitive_type='cylinder', location=[-0.0, -0.09, 0.0], scale=[0.02, 0.02, 0.08], rotation=[0.71, -0.7, 0.05, 0.05])

create_curve(name='curve_13', control_points=[[0.0, 0.0, 0.0], [0.0, -0.03, 0.0], [0.051, -0.03, 0.0], [0.051, 0.0, 0.0]], handle_type=[1]*8, closed=True)
bevel(name='curve_13', width=0.01, segments=8)
create_curve(name='chair base_13', profile_name='curve_13', control_points=[[-0.17, -0.37, -0.15], [-0.01, -0.37, 0.01]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

create_curve(name='curve_14', control_points=[[0.0, 0.0, 0.0], [0.0, -0.03, 0.0], [0.051, -0.03, 0.0], [0.051, 0.0, 0.0]], handle_type=[1]*8, closed=True)
bevel(name='curve_14', width=0.01, segments=8)
create_curve(name='chair base_14', profile_name='curve_14', control_points=[[-0.15, -0.37, 0.17], [0.01, -0.37, 0.01]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

create_curve(name='curve_15', control_points=[[0.0, 0.0, 0.0], [0.0, -0.03, 0.0], [0.051, -0.03, 0.0], [0.051, 0.0, 0.0]], handle_type=[1]*8, closed=True)
bevel(name='curve_15', width=0.01, segments=8)
create_curve(name='chair base_15', profile_name='curve_15', control_points=[[0.15, -0.42, 0.17], [-0.01, -0.42, 0.01]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

create_curve(name='curve_16', control_points=[[0.0, 0.0, 0.0], [0.0, -0.03, 0.0], [0.051, -0.03, 0.0], [0.051, 0.0, 0.0]], handle_type=[1]*8, closed=True)
bevel(name='curve_16', width=0.01, segments=8)
create_curve(name='chair base_16', profile_name='curve_16', control_points=[[0.17, -0.42, -0.15], [0.01, -0.42, 0.01]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

create_primitive(name='wheel_1', primitive_type='cylinder', location=[-0.17, -0.46, -0.13], scale=[0.03, 0.03, 0.02], rotation=[0.32, 0.04, -0.95, -0.01])
bevel(name='wheel_1', width=0.12, segments=2)

create_primitive(name='wheel_4', primitive_type='cylinder', location=[-0.13, -0.46, 0.16], scale=[0.03, 0.03, 0.02], rotation=[0.41, 0.09, 0.91, 0.04])
bevel(name='wheel_4', width=0.12, segments=2)

create_primitive(name='wheel_6', primitive_type='cylinder', location=[0.13, -0.46, -0.17], scale=[0.03, 0.03, 0.02], rotation=[0.41, 0.09, 0.91, 0.04])
bevel(name='wheel_6', width=0.12, segments=2)

create_primitive(name='wheel_7', primitive_type='cylinder', location=[0.16, -0.46, 0.13], scale=[0.03, 0.03, 0.02], rotation=[0.32, 0.32, -0.83, -0.16])
bevel(name='wheel_7', width=0.12, segments=2)

create_arc_by_3Dpoints(name='wheel cap_2', profile_name='rectangle_2', control_points=[[-0.2, -0.48, -0.1], [-0.17, -0.42, -0.13], [-0.14, -0.48, -0.15]], thickness=0.0, fill_caps='both')

create_arc_by_3Dpoints(name='wheel cap_3', profile_name='rectangle_3', control_points=[[-0.15, -0.48, 0.14], [-0.13, -0.42, 0.16], [-0.11, -0.48, 0.19]], thickness=0.0, fill_caps='both')

create_arc_by_3Dpoints(name='wheel cap_5', profile_name='rectangle_5', control_points=[[0.11, -0.48, -0.19], [0.13, -0.42, -0.17], [0.15, -0.48, -0.14]], thickness=0.0, fill_caps='both')

create_arc_by_3Dpoints(name='wheel cap_8', profile_name='rectangle_8', control_points=[[0.19, -0.48, 0.1], [0.16, -0.42, 0.13], [0.14, -0.48, 0.15]], thickness=0.0, fill_caps='both')

create_primitive(name='wheel axle_9', primitive_type='cylinder', location=[-0.14, -0.43, -0.15], scale=[0.01, 0.01, 0.01], rotation=[0.67, 0.67, 0.22, -0.22])

create_primitive(name='wheel axle_10', primitive_type='cylinder', location=[-0.14, -0.43, 0.15], scale=[0.01, 0.01, 0.01], rotation=[0.66, -0.66, -0.26, -0.26])

create_primitive(name='wheel axle_11', primitive_type='cylinder', location=[0.14, -0.43, -0.15], scale=[0.01, 0.01, 0.01], rotation=[0.63, 0.63, -0.32, 0.32])

create_primitive(name='wheel axle_12', primitive_type='cylinder', location=[0.14, -0.43, 0.15], scale=[0.01, 0.01, 0.01], rotation=[0.65, -0.65, 0.28, 0.28])

`,

            triangle_shelf: `create_curve(name='curve_5', control_points=[[0.0, 0.0, 0.0], [0.54, -0.0, 0.0], [0.54, -0.07, 0.0], [0.07, -0.54, 0.0], [-0.0, -0.54, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], closed=True)
create_curve(name='shelf board_5', profile_name='curve_5', control_points=[[-0.27, -0.38, 0.27], [-0.27, -0.35, 0.27]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

create_curve(name='curve_6', control_points=[[0.0, 0.0, 0.0], [0.54, -0.0, 0.0], [0.54, -0.07, 0.0], [0.07, -0.54, 0.0], [-0.0, -0.54, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], closed=True)
create_curve(name='shelf board_6', profile_name='curve_6', control_points=[[-0.27, 0.01, 0.27], [-0.27, 0.04, 0.27]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

create_curve(name='curve_8', control_points=[[0.0, 0.0, 0.0], [0.54, -0.0, 0.0], [0.54, -0.07, 0.0], [0.07, -0.54, 0.0], [-0.0, -0.54, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], closed=True)
create_curve(name='shelf board_8', profile_name='curve_8', control_points=[[-0.27, 0.4, 0.27], [-0.27, 0.43, 0.27]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

create_primitive(name='side board_4', primitive_type='cube', location=[-0.27, -0.42, 0.0], scale=[0.27, 0.03, 0.02], rotation=[0.7, -0.0, -0.71, -0.0])

create_primitive(name='side board_7', primitive_type='cube', location=[-0.27, 0.37, 0.0], scale=[0.27, 0.03, 0.02], rotation=[0.7, -0.0, -0.71, -0.0])

create_primitive(name='shelf leg_1', primitive_type='cube', location=[-0.27, 0.0, -0.26], scale=[0.5, 0.02, 0.02], rotation=[0.5, 0.5, 0.5, 0.5])

create_primitive(name='shelf leg_2', primitive_type='cube', location=[-0.27, 0.0, 0.26], scale=[0.5, 0.02, 0.02], rotation=[0.5, 0.5, 0.5, 0.5])

create_primitive(name='shelf leg_3', primitive_type='cube', location=[0.27, 0.0, 0.26], scale=[0.5, 0.02, 0.02], rotation=[0.5, 0.5, 0.5, 0.5])
            
`,
        };
        
        // Default code for editing
        this.defaultCode = this.modelCodes.sofa;
        
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
        this.currentCode = this.modelCodes[this.currentModel] || this.defaultCode;
        this.renderCodeInEditor();
    }
    
    renderCodeInEditor() {
        const lines = this.currentCode.split('\n');
        const htmlBlocks = [];

        const orderedNames = this.modelPartNames[this.currentModel] || [];

        orderedNames.forEach((meshName, index) => {
            // 找到包含 meshName 的首个出现位置
            const lineIndex = lines.findIndex(line =>
                line.includes(`name='${meshName}'`) || line.includes(`name="${meshName}"`)
            );
            if (lineIndex === -1) return;

            // 🟦 向上扩展到空行（或文件头）
            let startIndex = lineIndex;
            while (startIndex > 0 && lines[startIndex - 1].trim() !== '') {
                startIndex--;
            }

            // 🟥 向下扩展到空行（或文件尾）
            let endIndex = lineIndex;
            while (endIndex + 1 < lines.length && lines[endIndex + 1].trim() !== '') {
                endIndex++;
            }

            const blockLines = lines.slice(startIndex, endIndex + 1);
            const blockCode = blockLines.join('\n');
            const functionType = this.getFunctionType(blockCode);

            htmlBlocks.push(`
                <div class="code-function-block" data-mesh-name="${meshName}" data-function-index="${index}">
                    <div class="function-header">
                        <span class="function-name">${meshName}</span>
                        <span class="function-type ${functionType}">${functionType}</span>
                    </div>
                    <textarea class="function-code-area" spellcheck="false">${blockCode}</textarea>
                    <div class="function-syntax-overlay">${this.applySyntaxHighlightingToBlock(blockCode)}</div>
                </div>
            `);
        });


        this.codeEditor.innerHTML = htmlBlocks.join('\n');
        this.setupFunctionBlockEvents();
    }



    getFunctionType(firstLine) {
        if (firstLine.includes('create_primitive')) return 'primitive';
        if (firstLine.includes('create_curve')) return 'curve';
        if (firstLine.includes('create_circle')) return 'circle';
        if (firstLine.includes('create_quad')) return 'quad';
        if (firstLine.includes('create_rectangle')) return 'rectangle';
        if (firstLine.includes('create_polygon')) return 'polygon';
        if (firstLine.includes('create_wave')) return 'wave';
        if (firstLine.includes('create_spiral')) return 'spiral';
        if (firstLine.includes('create_arc_by_3Dpoints')) return 'arc';
        if (firstLine.includes('bezier_rotation')) return 'bezier';
        if (firstLine.includes('fill_grid')) return 'grid';
        if (firstLine.includes('solidify')) return 'solidify';
        if (firstLine.includes('corrective_smooth')) return 'smooth';
        if (firstLine.includes('join_obj')) return 'join';
        if (firstLine.includes('add_simple_deform_modifier')) return 'modifier';
        if (firstLine.includes('add_curve_modifier_to_object')) return 'modifier';
        if (firstLine.includes('array_1d')) return 'array';
        if (firstLine.includes('boolean_operation')) return 'boolean';
        if (firstLine.includes('bridge_edge_loops')) return 'bridge';
        if (firstLine.includes('bevel')) return 'bevel';
        return 'function';
    }

    isOperationLine(line) {
        // Check for various mesh operations
        const operations = [
            'create_primitive',
            'create_curve', 
            'create_circle',
            'create_quad',
            'create_rectangle',
            'create_polygon',
            'create_wave',
            'create_spiral',
            'create_arc_by_3Dpoints',
            'bezier_rotation',
            'fill_grid',
            'solidify',
            'corrective_smooth',
            'join_obj',
            'add_simple_deform_modifier',
            'add_curve_modifier_to_object',
            'array_1d',
            'boolean_operation',
            'bevel',
            'bridge_edge_loops',
            'extrude',
            'subdivide',
            'smooth',
            'merge',
            'split',
            'join',
            'separate',
            'delete',
            'duplicate',
            'transform',
            'scale',
            'rotate',
            'translate',
            'mirror',
            'array',
            'boolean',
            'union',
            'difference',
            'intersection'
        ];
        
        return operations.some(op => line.includes(op));
    }

    extractOperationInfo(line) {
        const operationInfo = {
            operation: 'unknown',
            name: null
        };
        
        // Extract operation type
        if (line.includes('create_primitive')) {
            operationInfo.operation = 'create_primitive';
        } else if (line.includes('create_curve')) {
            operationInfo.operation = 'create_curve';
        } else if (line.includes('create_circle')) {
            operationInfo.operation = 'create_circle';
        } else if (line.includes('create_quad')) {
            operationInfo.operation = 'create_quad';
        } else if (line.includes('create_rectangle')) {
            operationInfo.operation = 'create_rectangle';
        } else if (line.includes('create_polygon')) {
            operationInfo.operation = 'create_polygon';
        } else if (line.includes('create_wave')) {
            operationInfo.operation = 'create_wave';
        } else if (line.includes('create_spiral')) {
            operationInfo.operation = 'create_spiral';
        } else if (line.includes('create_arc_by_3Dpoints')) {
            operationInfo.operation = 'create_arc_by_3Dpoints';
        } else if (line.includes('bezier_rotation')) {
            operationInfo.operation = 'bezier_rotation';
        } else if (line.includes('fill_grid')) {
            operationInfo.operation = 'fill_grid';
        } else if (line.includes('solidify')) {
            operationInfo.operation = 'solidify';
        } else if (line.includes('corrective_smooth')) {
            operationInfo.operation = 'corrective_smooth';
        } else if (line.includes('join_obj')) {
            operationInfo.operation = 'join_obj';
        } else if (line.includes('add_simple_deform_modifier')) {
            operationInfo.operation = 'add_simple_deform_modifier';
        } else if (line.includes('add_curve_modifier_to_object')) {
            operationInfo.operation = 'add_curve_modifier_to_object';
        } else if (line.includes('array_1d')) {
            operationInfo.operation = 'array_1d';
        } else if (line.includes('boolean_operation')) {
            operationInfo.operation = 'boolean_operation';
        } else if (line.includes('bevel')) {
            operationInfo.operation = 'bevel';
        } else if (line.includes('bridge_edge_loops')) {
            operationInfo.operation = 'bridge_edge_loops';
        } else if (line.includes('extrude')) {
            operationInfo.operation = 'extrude';
        } else if (line.includes('subdivide')) {
            operationInfo.operation = 'subdivide';
        } else if (line.includes('smooth')) {
            operationInfo.operation = 'smooth';
        } else if (line.includes('merge')) {
            operationInfo.operation = 'merge';
        } else if (line.includes('split')) {
            operationInfo.operation = 'split';
        } else if (line.includes('join')) {
            operationInfo.operation = 'join';
        } else if (line.includes('separate')) {
            operationInfo.operation = 'separate';
        } else if (line.includes('delete')) {
            operationInfo.operation = 'delete';
        } else if (line.includes('duplicate')) {
            operationInfo.operation = 'duplicate';
        } else if (line.includes('transform')) {
            operationInfo.operation = 'transform';
        } else if (line.includes('scale')) {
            operationInfo.operation = 'scale';
        } else if (line.includes('rotate')) {
            operationInfo.operation = 'rotate';
        } else if (line.includes('translate')) {
            operationInfo.operation = 'translate';
        } else if (line.includes('mirror')) {
            operationInfo.operation = 'mirror';
        } else if (line.includes('array')) {
            operationInfo.operation = 'array';
        } else if (line.includes('boolean')) {
            operationInfo.operation = 'boolean';
        } else if (line.includes('union')) {
            operationInfo.operation = 'union';
        } else if (line.includes('difference')) {
            operationInfo.operation = 'difference';
        } else if (line.includes('intersection')) {
            operationInfo.operation = 'intersection';
        }
        
        // Extract name parameter if present
        const nameMatch = line.match(/name=['"]([^'"]+)['"]/);
        if (nameMatch) {
            operationInfo.name = nameMatch[1];
        }
        
        return operationInfo;
    }

    setupFunctionBlockEvents() {
        const normalize = name => name.replace(/[\s_-]/g, '').toLowerCase();
        const functionBlocks = this.codeEditor.querySelectorAll('.code-function-block');

        functionBlocks.forEach(block => {
            const rawName = block.dataset.meshName;
            const normalizedName = normalize(rawName);
            const textarea = block.querySelector('.function-code-area');

            // Hover events
            block.addEventListener('mouseenter', () => {
                // Find meshName from Three.js that matches
                const matchedMeshName = Object.keys(this.threeViewer.meshObjects || {}).find(
                    meshName => normalize(meshName) === normalizedName
                );

                if (matchedMeshName) {
                    this.highlightMeshObject(matchedMeshName);
                } else {
                    console.warn(`No matching mesh found for block: ${rawName}`);
                }

                this.highlightCodeFunctionBlock(block);
            });

            block.addEventListener('mouseleave', () => {
                this.unhighlightMeshObject();
            });

            // Editing
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
        
        // Add function blocks (code blocks)
        functionBlocks.forEach((block, index) => {
            const textarea = block.querySelector('.function-code-area');
            if (textarea) {
                newCode += textarea.value;
                // Add empty line between blocks (except after the last one)
                if (index < functionBlocks.length - 1) {
                    newCode += '\n\n';
                }
            }
        });
        
        this.currentCode = newCode;
        // this.identifyMeshParts(); // Re-parse after changes
    }

    applySyntaxHighlightingToLine(line) {
        let highlighted = line;
        
        // Keywords - expanded to include all operations
        const operations = [
            'create_primitive', 'create_curve', 'create_circle', 'create_quad',
            'create_rectangle', 'create_polygon', 'create_wave', 'create_spiral',
            'create_arc_by_3Dpoints', 'bezier_rotation', 'fill_grid', 'solidify',
            'corrective_smooth', 'join_obj', 'add_simple_deform_modifier',
            'add_curve_modifier_to_object', 'array_1d', 'boolean_operation',
            'bridge_edge_loops', 'bevel', 'extrude', 'subdivide',
            'smooth', 'merge', 'split', 'join', 'separate',
            'delete', 'duplicate', 'transform', 'scale', 'rotate',
            'translate', 'mirror', 'array', 'boolean', 'union',
            'difference', 'intersection'
        ];
        const operationsRegex = new RegExp(`\\b(${operations.join('|')})\\b`, 'g');
        highlighted = highlighted.replace(operationsRegex, '<span class="editor-function">$1</span>');
        
        // Parameters - expanded to include more parameters
        const parameters = [
            'name', 'primitive_type', 'location', 'scale', 'rotation',
            'control_points', 'thickness', 'smoothness', 'radius',
            'closed', 'segments', 'amount', 'offset', 'factor',
            'mode', 'type', 'operation', 'source', 'target'
        ];
        const parametersRegex = new RegExp(`\\b(${parameters.join('|')})\\b`, 'g');
        highlighted = highlighted.replace(parametersRegex, '<span class="editor-variable">$1</span>');
        
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

    autoScrollToCodeBlock(functionBlock) {
        if (!functionBlock || !this.codeEditor) return;

        // Don't auto-scroll if user has recently scrolled (within last 2 seconds)
        const timeSinceUserScroll = Date.now() - this.lastUserScrollTime;
        if (timeSinceUserScroll < 2000) {
            console.log('Skipping auto-scroll due to recent user scroll activity');
            return;
        }

        // Get the position of the function block relative to the code editor
        const codeEditorRect = this.codeEditor.getBoundingClientRect();
        const functionBlockRect = functionBlock.getBoundingClientRect();
        
        // Check if the function block is already visible in the viewport
        // Consider it visible if at least 50% of the block is in view
        const blockHeight = functionBlockRect.height;
        const visibleTop = Math.max(functionBlockRect.top, codeEditorRect.top);
        const visibleBottom = Math.min(functionBlockRect.bottom, codeEditorRect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const isVisible = visibleHeight >= blockHeight * 0.5;
        
        // Only scroll if the block is not sufficiently visible
        if (!isVisible) {
            // Calculate the scroll position needed to bring the function block to the top
            const scrollOffset = functionBlockRect.top - codeEditorRect.top + this.codeEditor.scrollTop;
            
            // Add a small padding to avoid cutting off the block at the very top
            const padding = 10;
            const targetScrollTop = Math.max(0, scrollOffset - padding);
            
            // Smooth scroll to the target position
            this.codeEditor.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth'
            });
            
            console.log(`Auto-scrolling to code block for: ${functionBlock.dataset.meshName}`);
        } else {
            console.log(`Code block for ${functionBlock.dataset.meshName} is already visible, skipping scroll`);
        }
    }

    unhighlightCodeFunction() {
        // Remove all function highlights
        const highlightedBlocks = this.codeEditor.querySelectorAll('.function-highlighted');
        highlightedBlocks.forEach(block => block.classList.remove('function-highlighted'));
        this.currentHighlightedBlock = null;
    }

    highlightMeshPartByName(meshName) {
        // helper
        const normalize = name => name.replace(/[\s_-]/g, '').toLowerCase();

        // Skip redundant highlighting
        if (this.lastHighlightedMesh === meshName) return;

        console.log(`Attempting to highlight mesh: ${meshName}`);
        console.log('Available mesh parts:', this.meshParts.map(p => p.name));

        const normalizedMeshName = normalize(meshName);

        // Try direct normalized match to function block DOM
        const allBlocks = Array.from(this.codeEditor.querySelectorAll('[data-mesh-name]'));
        let functionBlock = allBlocks.find(el => normalize(el.dataset.meshName) === normalizedMeshName);

        // Try searching in meshParts metadata if DOM match fails
        if (!functionBlock) {
            const meshPart = this.meshParts.find(part => {
                // check function name list
                if (part.functions && part.functions.some(fn => normalize(fn) === normalizedMeshName)) {
                    return true;
                }
                return normalize(part.name) === normalizedMeshName;
            });

            if (meshPart) {
                functionBlock = allBlocks.find(el => normalize(el.dataset.meshName) === normalize(meshPart.name));
                console.log(`Found matching meshPart: ${meshName} -> ${meshPart.name}`);
            }
        }

        // Final result
        if (functionBlock) {
            this.highlightCodeFunctionBlock(functionBlock);
            this.autoScrollToCodeBlock(functionBlock);
            this.highlightMeshObject(meshName);
            this.lastHighlightedMesh = meshName;
            console.log(`✅ Successfully highlighted mesh: ${meshName}`);
        } else {
            console.warn(`❌ Function block not found for mesh: ${meshName}`);
            console.log('Available function blocks:', allBlocks.map(b => b.dataset.meshName));
            console.warn(`NAMING MISMATCH: Mesh "${meshName}" not found in code. Check if:\n1. The mesh name in .glb matches a function name in code.\n2. Consider normalizing names like: ${this.meshParts.map(p => p.name).join(', ')}`);
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
            this.autoScrollToCodeBlock(functionBlock);
            
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
            
            // Load the current model
            const modelPath = `assets/models/${this.currentModel}.glb`;
            console.log(`Loading initial model: ${modelPath}`);
            this.threeViewer.loadModel(modelPath);
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
        const galleryLabel = document.querySelector('.gallery-label');
        const galleryDropdown = document.getElementById('galleryDropdown');
        
        if (resetViewBtn) {
            resetViewBtn.addEventListener('click', () => this.resetView());
        }
        
        if (wireframeBtn) {
            wireframeBtn.addEventListener('click', () => this.toggleWireframe());
        }
        
        // Track user scroll activity on code editor
        if (this.codeEditor) {
            this.codeEditor.addEventListener('scroll', () => {
                this.lastUserScrollTime = Date.now();
                
                // Clear any existing timeout
                if (this.userScrollTimeout) {
                    clearTimeout(this.userScrollTimeout);
                }
                
                // Set a timeout to reset the user scroll flag after 2 seconds
                this.userScrollTimeout = setTimeout(() => {
                    this.lastUserScrollTime = 0;
                }, 2000);
            });
        }
        
        // Gallery functionality
        if (galleryLabel && galleryDropdown) {
            // Toggle gallery dropdown on click
            galleryLabel.addEventListener('click', (e) => {
                e.stopPropagation();
                const isVisible = galleryDropdown.style.display !== 'none';
                galleryDropdown.style.display = isVisible ? 'none' : 'block';
                
                // Mark current model as selected
                this.updateGallerySelection();
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!galleryLabel.contains(e.target) && !galleryDropdown.contains(e.target)) {
                    galleryDropdown.style.display = 'none';
                }
            });
            
            // Handle gallery dropdown item clicks
            const galleryItems = galleryDropdown.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const modelName = item.dataset.model;
                    if (modelName !== this.currentModel) {
                        this.switchModel(modelName);
                    }
                    galleryDropdown.style.display = 'none';
                });
            });
        }
        
        // Handle gallery image clicks
        const galleryImageItems = document.querySelectorAll('.gallery-image-item[data-model]');
        galleryImageItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const modelName = item.dataset.model;
                if (modelName && modelName !== this.currentModel) {
                    this.switchModel(modelName);
                    this.updateGalleryImageSelection(item);
                }
            });
            
            // Add hover effects for gallery images
            item.addEventListener('mouseenter', () => {
                const img = item.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.05)';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const img = item.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    updateGallerySelection() {
        const galleryDropdown = document.getElementById('galleryDropdown');
        if (!galleryDropdown) return;
        
        // Remove previous selection
        const galleryItems = galleryDropdown.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => item.classList.remove('selected'));
        
        // Add selection to current model
        const currentItem = galleryDropdown.querySelector(`[data-model="${this.currentModel}"]`);
        if (currentItem) {
            currentItem.classList.add('selected');
        }
    }
    
    updateGalleryImageSelection(selectedItem) {
        // Remove previous selection from all gallery images
        const galleryImageItems = document.querySelectorAll('.gallery-image-item[data-model]');
        galleryImageItems.forEach(item => item.classList.remove('selected'));
        
        // Add selection to clicked item
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }
    }
    
    switchModel(modelName) {
        if (!this.modelCodes[modelName]) {
            console.warn(`Model ${modelName} not found in modelCodes`);
            return;
        }
        
        console.log(`Switching to model: ${modelName}`);
        
        // Clear all timers and state
        this.clearHighlightingState();
        
        // Clear the previous model first
        this.clearCurrentModel();
        
        // Update current model
        this.currentModel = modelName;
        
        // Update code
        this.currentCode = this.modelCodes[modelName];
        
        // Re-render code editor
        this.renderCodeInEditor();
        
        // Load 3D model
        if (this.threeViewer) {
            const modelPath = `assets/models/${modelName}.glb`;
            console.log(`Loading model from: ${modelPath}`);
            this.threeViewer.loadModel(modelPath);
        }
        
        // Update gallery selections
        this.updateGallerySelection();
        
        console.log(`Model switched to: ${modelName}`);
    }
    
    clearCurrentModel() {
        if (this.threeViewer && this.threeViewer.scene) {
            // Remove the current model from the scene
            if (this.threeViewer.model) {
                this.threeViewer.scene.remove(this.threeViewer.model);
                this.threeViewer.model = null;
            }
            
            // Clear mesh objects and materials
            this.threeViewer.meshObjects = {};
            this.threeViewer.originalMaterials.clear();
            this.threeViewer.wireframeMaterials.clear();
            this.threeViewer.currentHighlightedMesh = null;
            
            console.log('Previous model cleared from scene');
        }
    }
    
    getModelDisplayName(modelName) {
        const displayNames = {
            sofa: 'Sofa',
            chair: 'Chair', 
            table: 'Table',
            lamp: 'Lamp',
            door: 'Door',
            window: 'Window',
            toilet: 'Toilet',
            bowl: 'Bowl',
            office_chair: 'Office Chair',
            triangle_shelf: 'Triangle Shelf'
        };
        return displayNames[modelName] || modelName;
    }
    
    
    highlightMeshObject(meshName) {
        if (this.threeViewer) {
            this.threeViewer.highlightMeshByName(meshName);
        } else {
            console.log(`Highlighting mesh: ${meshName} (ThreeViewer not available)`);
        }
    }
    
    clearHighlightingState() {
        // Clear all timers
        if (this.userScrollTimeout) {
            clearTimeout(this.userScrollTimeout);
            this.userScrollTimeout = null;
        }
        
        // Reset state
        this.lastHighlightedMesh = null;
        this.lastUserScrollTime = 0;
    }
    
    unhighlightMeshPart() {
        this.lastHighlightedMesh = null;
        
        this.unhighlightCodeFunction();
        
        // Unhighlight mesh through ThreeViewer
        if (this.threeViewer) {
            this.threeViewer.unhighlightAllMeshes();
        }
    }
    
    focusMeshPartAlternative(meshName) {
        const meshPart = this.meshParts.find(part => part.name === meshName);
        if (meshPart) {
            const functionBlock = this.codeEditor.querySelector(`[data-mesh-name="${meshName}"]`);
            if (functionBlock) {
                // Temporarily highlight the function block
                this.highlightCodeFunctionBlock(functionBlock);
                this.autoScrollToCodeBlock(functionBlock);
                
                setTimeout(() => {
                    this.unhighlightCodeFunction();
                }, 2000);
            }
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