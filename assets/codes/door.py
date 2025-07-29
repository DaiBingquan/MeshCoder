import bpy
from math import radians, pi
from bpy_lib import *

delete_all()

# object name: louver door
# part_1: door
create_primitive(name='door_1', primitive_type='cube', location=[0.0, 0.0, 0.0], scale=[0.5, 0.22, 0.01], rotation=[0.71, 0.0, -0.0, 0.71])

# part_2: frame
create_rectangle(name='rectangle_2', width=0.02, length=0.03, rotation_rad=-0.0,center='MEDIAN',closed=True)
create_rectangle(name='frame_2', profile_name='rectangle_2', width=0.35, length=0.36, location=[0.0, -0.03, 0.0], rotation=[0.0, -0.0, -1.0, 0.0], closed=True, thickness=0.0, fill_caps='none')

# part_3: louver
create_primitive(name='cube_3', primitive_type='cube', location=[0.0, -0.439, 0.0], scale=[0.002, 0.175, 0.01], rotation=[0.184, -0.682, -0.685, -0.178], apply=True)
array_1d(name='cube_3', fit_type='FIXED_COUNT', count=41, constant_offset=[0.0, 0.01, 0.0])

# part_4: knob
create_curve(name='curve_4', control_points=[[0.0, 0.0, 0.0], [0.017, 0.0, 0.0], [0.017, 0.006, 0.0], [0.008, 0.006, 0.0], [0.008, 0.035, 0.0], [0.0, 0.035, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
bezier_rotation(name='knob_4', profile_name='curve_4', location=[-0.2, -0.02, -0.01], rotation=[0.01, 0.07, 1.0, -0.0], thickness=0.0)

# part_5: knob
create_curve(name='curve_5', control_points=[[0.0, 0.0, 0.0], [0.017, 0.0, 0.0], [0.017, 0.006, 0.0], [0.008, 0.006, 0.0], [0.008, 0.035, 0.0], [0.0, 0.035, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
bezier_rotation(name='knob_5', profile_name='curve_5', location=[-0.2, -0.02, 0.01], rotation=[0.07, 0.01, -0.0, 1.0], thickness=0.0)

# part_6: knob
create_curve(name=['curve_1_6', 'curve_2_6', 'curve_3_6', 'curve_4_6', 'curve_5_6'], control_points=[[[-0.199, -0.023, -0.039], [-0.199, -0.025, -0.039], [-0.199, -0.026, -0.04], [-0.199, -0.024, -0.04]], [[-0.196, -0.019, -0.037], [-0.196, -0.024, -0.037], [-0.196, -0.03, -0.042], [-0.196, -0.024, -0.042]], [[-0.16, -0.017, -0.036], [-0.16, -0.025, -0.035], [-0.16, -0.032, -0.043], [-0.16, -0.024, -0.043]], [[-0.124, -0.019, -0.037], [-0.124, -0.024, -0.037], [-0.124, -0.03, -0.042], [-0.124, -0.024, -0.042]], [[-0.122, -0.023, -0.039], [-0.122, -0.025, -0.039], [-0.122, -0.026, -0.04], [-0.122, -0.024, -0.04]]], points_radius=[1, 1, 1, 1], handle_type=[0, 0, 0, 0, 0, 0, 0, 0], closed=True)
bridge_edge_loops(name='knob_6', profile_name=['curve_1_6', 'curve_2_6', 'curve_3_6', 'curve_4_6', 'curve_5_6'], number_cuts=4, smoothness=0.45, interpolation='SURFACE', fill_caps='both')

# part_7: knob
create_curve(name=['curve_1_7', 'curve_2_7', 'curve_3_7', 'curve_4_7', 'curve_5_7'], control_points=[[[-0.199, -0.023, 0.04], [-0.199, -0.024, 0.04], [-0.199, -0.026, 0.04], [-0.199, -0.025, 0.039]], [[-0.196, -0.019, 0.04], [-0.196, -0.024, 0.042], [-0.196, -0.03, 0.039], [-0.196, -0.024, 0.037]], [[-0.16, -0.017, 0.04], [-0.16, -0.024, 0.043], [-0.16, -0.032, 0.039], [-0.16, -0.025, 0.036]], [[-0.124, -0.019, 0.04], [-0.124, -0.024, 0.042], [-0.124, -0.03, 0.039], [-0.124, -0.024, 0.037]], [[-0.122, -0.023, 0.04], [-0.122, -0.024, 0.04], [-0.122, -0.026, 0.04], [-0.122, -0.025, 0.039]]], points_radius=[1, 1, 1, 1], handle_type=[0, 0, 0, 0, 0, 0, 0, 0], closed=True)
bridge_edge_loops(name='knob_7', profile_name=['curve_1_7', 'curve_2_7', 'curve_3_7', 'curve_4_7', 'curve_5_7'], number_cuts=4, smoothness=0.45, interpolation='SURFACE', fill_caps='both')