import bpy
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
bridge_edge_loops(name='cushion_12', profile_name=['curve_1_12', 'curve_2_12', 'curve_3_12', 'curve_4_12', 'curve_5_12'], number_cuts=4, smoothness=0.69, interpolation='SURFACE', fill_caps='both')
