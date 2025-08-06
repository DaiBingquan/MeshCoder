import bpy
from math import radians, pi
from bpy_lib import *

delete_all()

# object name: office chair
# part_1: wheel
create_primitive(name='wheel_1', primitive_type='cylinder', location=[-0.17, -0.46, -0.13], scale=[0.03, 0.03, 0.02], rotation=[0.32, 0.04, -0.95, -0.01])
bevel(name='wheel_1', width=0.12, segments=2)

# part_2: wheel cap
create_rectangle(name='rectangle_2', width=0.003, length=0.03, rotation_rad=-0.2,center='MEDIAN',closed=True)
create_arc_by_3Dpoints(name='wheel cap_2', profile_name='rectangle_2', control_points=[[-0.2, -0.48, -0.1], [-0.17, -0.42, -0.13], [-0.14, -0.48, -0.15]], thickness=0.0, fill_caps='both')

# part_3: wheel cap
create_rectangle(name='rectangle_3', width=0.003, length=0.03, rotation_rad=0.26,center='MEDIAN',closed=True)
create_arc_by_3Dpoints(name='wheel cap_3', profile_name='rectangle_3', control_points=[[-0.15, -0.48, 0.14], [-0.13, -0.42, 0.16], [-0.11, -0.48, 0.19]], thickness=0.0, fill_caps='both')

# part_4: wheel
create_primitive(name='wheel_4', primitive_type='cylinder', location=[-0.13, -0.46, 0.16], scale=[0.03, 0.03, 0.02], rotation=[0.41, 0.09, 0.91, 0.04])
bevel(name='wheel_4', width=0.12, segments=2)

# part_5: wheel cap
create_rectangle(name='rectangle_5', width=0.003, length=0.03, rotation_rad=0.26,center='MEDIAN',closed=True)
create_arc_by_3Dpoints(name='wheel cap_5', profile_name='rectangle_5', control_points=[[0.11, -0.48, -0.19], [0.13, -0.42, -0.17], [0.15, -0.48, -0.14]], thickness=0.0, fill_caps='both')

# part_6: wheel
create_primitive(name='wheel_6', primitive_type='cylinder', location=[0.13, -0.46, -0.17], scale=[0.03, 0.03, 0.02], rotation=[0.41, 0.09, 0.91, 0.04])
bevel(name='wheel_6', width=0.12, segments=2)

# part_7: wheel
create_primitive(name='wheel_7', primitive_type='cylinder', location=[0.16, -0.46, 0.13], scale=[0.03, 0.03, 0.02], rotation=[0.32, 0.32, -0.83, -0.16])
bevel(name='wheel_7', width=0.12, segments=2)

# part_8: wheel cap
create_rectangle(name='rectangle_8', width=0.003, length=0.03, rotation_rad=-0.2,center='MEDIAN',closed=True)
create_arc_by_3Dpoints(name='wheel cap_8', profile_name='rectangle_8', control_points=[[0.19, -0.48, 0.1], [0.16, -0.42, 0.13], [0.14, -0.48, 0.15]], thickness=0.0, fill_caps='both')

# part_9: wheel axle
create_primitive(name='wheel axle_9', primitive_type='cylinder', location=[-0.14, -0.43, -0.15], scale=[0.01, 0.01, 0.01], rotation=[0.67, 0.67, 0.22, -0.22])

# part_10: wheel axle
create_primitive(name='wheel axle_10', primitive_type='cylinder', location=[-0.14, -0.43, 0.15], scale=[0.01, 0.01, 0.01], rotation=[0.66, -0.66, -0.26, -0.26])

# part_11: wheel axle
create_primitive(name='wheel axle_11', primitive_type='cylinder', location=[0.14, -0.43, -0.15], scale=[0.01, 0.01, 0.01], rotation=[0.63, 0.63, -0.32, 0.32])

# part_12: wheel axle
create_primitive(name='wheel axle_12', primitive_type='cylinder', location=[0.14, -0.43, 0.15], scale=[0.01, 0.01, 0.01], rotation=[0.65, -0.65, 0.28, 0.28])

# part_13: chair base
create_curve(name='curve_13', control_points=[[0.0, 0.0, 0.0], [0.0, -0.03, 0.0], [0.051, -0.03, 0.0], [0.051, 0.0, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1], closed=True)
bevel(name='curve_13', width=0.01, segments=8)
create_curve(name='chair base_13', profile_name='curve_13', control_points=[[-0.17, -0.37, -0.15], [-0.01, -0.37, 0.01]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

# part_14: chair base
create_curve(name='curve_14', control_points=[[0.0, 0.0, 0.0], [0.0, -0.03, 0.0], [0.051, -0.03, 0.0], [0.051, 0.0, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1], closed=True)
bevel(name='curve_14', width=0.01, segments=8)
create_curve(name='chair base_14', profile_name='curve_14', control_points=[[-0.15, -0.37, 0.17], [0.01, -0.37, 0.01]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

# part_15: chair base
create_curve(name='curve_15', control_points=[[0.0, 0.0, 0.0], [0.0, -0.03, 0.0], [0.051, -0.03, 0.0], [0.051, 0.0, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1], closed=True)
bevel(name='curve_15', width=0.01, segments=8)
create_curve(name='chair base_15', profile_name='curve_15', control_points=[[0.15, -0.42, 0.17], [-0.01, -0.42, 0.01]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

# part_16: chair base
create_curve(name='curve_16', control_points=[[0.0, 0.0, 0.0], [0.0, -0.03, 0.0], [0.051, -0.03, 0.0], [0.051, 0.0, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1], closed=True)
bevel(name='curve_16', width=0.01, segments=8)
create_curve(name='chair base_16', profile_name='curve_16', control_points=[[0.17, -0.42, -0.15], [0.01, -0.42, 0.01]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

# part_17: leg
create_primitive(name='leg_17', primitive_type='cylinder', location=[-0.0, -0.28, 0.0], scale=[0.02, 0.02, 0.12], rotation=[0.71, -0.7, 0.05, 0.05])

# part_18: leg
create_primitive(name='leg_18', primitive_type='cylinder', location=[-0.0, -0.09, 0.0], scale=[0.02, 0.02, 0.08], rotation=[0.71, -0.7, 0.05, 0.05])

# part_19: seat
create_circle(name=['Circle_0_19', 'Circle_1_19', 'Circle_2_19', 'Circle_3_19', 'Circle_4_19', 'Circle_5_19', 'Circle_6_19', 'Circle_7_19', 'Circle_8_19'], location=[[-0.01, 1.03, 0.03], [-0.01, 1.02, 0.03], [-0.01, 0.98, 0.03], [-0.01, 0.74, 0.02], [-0.0, 0.24, 0.01], [-0.01, 0.45, 0.02], [-0.0, 0.05, 0.01], [-0.0, -0.01, 0.01], [-0.0, -0.02, 0.01]], rotation=[[0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0]], scale=[[0.01, 0.002, 0.44], [0.12, 0.002, 0.44], [0.15, 0.002, 0.44], [0.2, 0.02, 0.44], [0.26, 0.02, 0.44], [0.2, 0.02, 0.44], [0.21, 0.002, 0.44], [0.18, 0.002, 0.44], [0.01, 0.002, 0.44]])
bridge_edge_loops(name=['seat_19', 'BridgeLoop_2_19', 'BrigdeLoop_3_19', 'BridgeLoop_4_19', 'BridgeLoop_5_19'], profile_name=[['Circle_7_19', 'Circle_6_19', 'Circle_5_19'], ['Circle_4_19', 'Circle_3_19', 'Circle_2_19', 'Circle_1_19'], ['Circle_8_19', 'Circle_7_19'], ['Circle_1_19', 'Circle_0_19'], ['Circle_5_19', 'Circle_4_19']], number_cuts=[8, 32, 8, 8, 4], smoothness=[0.08, 0.19, 0.02, 0.46, 0.02], profile_shape_factor=[0.0, 0.03, 0.0, 0.01, 0.01], interpolation='SURFACE', fill_caps=['none', 'none', 'both', 'both', 'both'])
join_obj(name='seat_19', seq_name=['seat_19', 'BridgeLoop_2_19', 'BrigdeLoop_3_19', 'BridgeLoop_4_19', 'BridgeLoop_5_19'], weld_threshold=1e-4)
add_simple_deform_modifier(name='seat_19', angle=0.08, origin=[-0.0, -0.02, 0.01], rotation=[0.72, -0.7, 0.0, -0.0])
create_curve(name='curve_19', control_points=[[-0.0, 0.005, 0.266], [-0.0, -0.06, -0.531], [-0.0, 0.079, -0.092], [-0.0, 0.427, -0.234]], points_radius=[1, 1], handle_type=[0, 3, 3, 0])
add_curve_modifier_to_object(name='seat_19', curve_name='curve_19', origin=[-0.0, -0.02, 0.01], rotation=[0.72, -0.7, 0.0, -0.0], axis='POS_Z')