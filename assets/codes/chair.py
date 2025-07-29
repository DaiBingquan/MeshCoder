import bpy
from math import radians, pi
from bpy_lib import *

delete_all()

# object name: chair
# part_1: leg
create_primitive(name='leg_1', primitive_type='cylinder', location=[-0.21, -0.16, -0.21], scale=[0.02, 0.02, 0.24], rotation=[0.68, -0.68, 0.2, 0.2])

# part_2: leg
create_primitive(name='leg_2', primitive_type='cylinder', location=[-0.21, -0.16, 0.17], scale=[0.02, 0.02, 0.24], rotation=[0.65, -0.65, -0.27, -0.27])

# part_3: leg
create_primitive(name='leg_3', primitive_type='cylinder', location=[0.21, -0.16, -0.21], scale=[0.02, 0.02, 0.24], rotation=[0.27, -0.27, 0.65, 0.65])

# part_4: leg
create_primitive(name='leg_4', primitive_type='cylinder', location=[0.21, -0.16, 0.17], scale=[0.02, 0.02, 0.24], rotation=[0.65, -0.65, -0.27, -0.27])

# part_5: leg decoration
create_primitive(name='leg decoration_5', primitive_type='cylinder', location=[-0.21, -0.15, -0.02], scale=[0.02, 0.02, 0.19], rotation=[0.0, -0.0, -0.0, -1.0])

# part_6: leg decoration
create_primitive(name='leg decoration_6', primitive_type='cylinder', location=[0.21, -0.15, -0.02], scale=[0.02, 0.02, 0.19], rotation=[0.0, -0.0, -0.0, -1.0])

# part_7: back decoration
create_curve(name=['line_1_7', 'line_2_7'], control_points=[[[-0.234, 0.467, -0.191], [-0.234, -0.021, -0.191]], [[0.236, 0.467, -0.191], [0.236, -0.021, -0.191]]], handle_type=[1, 1, 1, 1])
bridge_edge_loops(name='back decoration_7', profile_name=['line_1_7', 'line_2_7'], number_cuts=16, smoothness=0.84, profile_shape_factor=0.16)
solidify(name='back decoration_7', thickness=0.04)
bevel(name='back decoration_7', width=0.01, segments=7)

# part_8: seat
create_curve(name='seat_8', control_points=[[-0.0, -0.05, -0.23], [-0.24, -0.05, -0.23], [-0.24, -0.05, 0.09], [-0.24, -0.05, 0.19], [-0.0, -0.05, 0.24], [0.24, -0.05, 0.19], [0.24, -0.05, 0.09], [0.24, -0.05, -0.23], [-0.0, -0.05, -0.23]], handle_type=[0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0])
fill_grid(name='seat_8', thickness=0.0669)
bevel(name='seat_8', width=0.03, segments=1)

# part_9: back
create_primitive(name='back_9', primitive_type='cylinder', location=[-0.21, 0.23, -0.21], scale=[0.02, 0.02, 0.24], rotation=[0.27, -0.27, 0.65, 0.65])

# part_10: arm
create_rectangle(name='rectangle_10', width=0.03, length=0.05, rotation_rad=-0.49,center='MEDIAN',closed=True)
create_curve(name='arm_10', profile_name='rectangle_10', control_points=[[-0.2, -0.02, 0.18], [-0.19, 0.08, 0.18], [-0.19, 0.14, 0.19], [-0.19, 0.15, 0.14], [-0.19, 0.15, 0.01], [-0.19, 0.15, -0.05], [-0.19, 0.16, -0.12], [-0.2, 0.16, -0.21]], points_radius=[1.0, 1.0, 1.0, 1.0], handle_type=[0, 3, 3, 1, 1, 3, 3, 0], thickness=0.0, fill_caps='both')

# part_11: arm
create_rectangle(name='rectangle_11', width=0.03, length=0.05, rotation_rad=0.49,center='MEDIAN',closed=True)
create_curve(name='arm_11', profile_name='rectangle_11', control_points=[[0.2, -0.02, 0.18], [0.19, 0.08, 0.18], [0.19, 0.14, 0.19], [0.19, 0.15, 0.14], [0.19, 0.15, 0.01], [0.19, 0.15, -0.05], [0.19, 0.16, -0.12], [0.2, 0.16, -0.21]], points_radius=[1.0, 1.0, 1.0, 1.0], handle_type=[0, 3, 3, 1, 1, 3, 3, 0], thickness=0.0, fill_caps='both')

# part_12: back
create_primitive(name='back_12', primitive_type='cylinder', location=[0.21, 0.23, -0.21], scale=[0.02, 0.02, 0.24], rotation=[0.27, -0.27, 0.65, 0.65])