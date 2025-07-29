import bpy
from math import radians, pi
from bpy_lib import *

delete_all()

# object name: triangle shelf
# part_1: shelf leg
create_primitive(name='shelf leg_1', primitive_type='cube', location=[-0.27, 0.0, -0.26], scale=[0.5, 0.02, 0.02], rotation=[0.5, 0.5, 0.5, 0.5])

# part_2: shelf leg
create_primitive(name='shelf leg_2', primitive_type='cube', location=[-0.27, 0.0, 0.26], scale=[0.5, 0.02, 0.02], rotation=[0.5, 0.5, 0.5, 0.5])

# part_3: shelf leg
create_primitive(name='shelf leg_3', primitive_type='cube', location=[0.27, 0.0, 0.26], scale=[0.5, 0.02, 0.02], rotation=[0.5, 0.5, 0.5, 0.5])

# part_4: side board
create_primitive(name='side board_4', primitive_type='cube', location=[-0.27, -0.42, 0.0], scale=[0.27, 0.03, 0.02], rotation=[0.7, -0.0, -0.71, -0.0])

# part_5: shelf board
create_curve(name='curve_5', control_points=[[0.0, 0.0, 0.0], [0.54, -0.0, 0.0], [0.54, -0.07, 0.0], [0.07, -0.54, 0.0], [-0.0, -0.54, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], closed=True)
create_curve(name='shelf board_5', profile_name='curve_5', control_points=[[-0.27, -0.38, 0.27], [-0.27, -0.35, 0.27]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

# part_6: shelf board
create_curve(name='curve_6', control_points=[[0.0, 0.0, 0.0], [0.54, -0.0, 0.0], [0.54, -0.07, 0.0], [0.07, -0.54, 0.0], [-0.0, -0.54, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], closed=True)
create_curve(name='shelf board_6', profile_name='curve_6', control_points=[[-0.27, 0.01, 0.27], [-0.27, 0.04, 0.27]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

# part_7: side board
create_primitive(name='side board_7', primitive_type='cube', location=[-0.27, 0.37, 0.0], scale=[0.27, 0.03, 0.02], rotation=[0.7, -0.0, -0.71, -0.0])

# part_8: shelf board
create_curve(name='curve_8', control_points=[[0.0, 0.0, 0.0], [0.54, -0.0, 0.0], [0.54, -0.07, 0.0], [0.07, -0.54, 0.0], [-0.0, -0.54, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], closed=True)
create_curve(name='shelf board_8', profile_name='curve_8', control_points=[[-0.27, 0.4, 0.27], [-0.27, 0.43, 0.27]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')