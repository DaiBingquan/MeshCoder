import bpy
from math import radians, pi
from bpy_lib import *

delete_all()

# object name: office chair
# part_1: wheel
create_primitive(name='wheel_1', primitive_type='cylinder', location=[-0.19, -0.47, -0.04], scale=[0.03, 0.03, 0.01], rotation=[0.53, 0.45, -0.6, -0.39])
bevel(name='wheel_1', width=0.12, segments=2)

# part_2: wheel cap
create_rectangle(name='rectangle_2', width=0.002, length=0.03, rotation_rad=-0.42,center='MEDIAN',closed=True)
create_arc_by_3Dpoints(name='wheel cap_2', profile_name='rectangle_2', control_points=[[-0.18, -0.49, -0.07], [-0.19, -0.44, -0.04], [-0.2, -0.49, -0.0]], thickness=0.0, fill_caps='both')

# part_3: wheel cap
create_rectangle(name='rectangle_3', width=0.002, length=0.03, rotation_rad=0.15,center='MEDIAN',closed=True)
create_arc_by_3Dpoints(name='wheel cap_3', profile_name='rectangle_3', control_points=[[-0.12, -0.49, 0.16], [-0.1, -0.44, 0.18], [-0.07, -0.49, 0.2]], thickness=0.0, fill_caps='both')

# part_4: wheel
create_primitive(name='wheel_4', primitive_type='cylinder', location=[-0.1, -0.47, 0.18], scale=[0.03, 0.03, 0.01], rotation=[0.16, 0.77, 0.58, 0.21])
bevel(name='wheel_4', width=0.12, segments=2)

# part_5: wheel cap
create_rectangle(name='rectangle_5', width=0.002, length=0.03, rotation_rad=-0.03,center='MEDIAN',closed=True)
create_arc_by_3Dpoints(name='wheel cap_5', profile_name='rectangle_5', control_points=[[0.01, -0.49, -0.2], [-0.02, -0.44, -0.2], [-0.05, -0.49, -0.2]], thickness=0.0, fill_caps='both')

# part_6: wheel
create_primitive(name='wheel_6', primitive_type='cylinder', location=[-0.02, -0.47, -0.2], scale=[0.03, 0.03, 0.01], rotation=[0.03, -0.88, -0.47, 0.05])
bevel(name='wheel_6', width=0.12, segments=2)

# part_7: wheel
create_primitive(name='wheel_7', primitive_type='cylinder', location=[0.14, -0.47, 0.15], scale=[0.03, 0.03, 0.01], rotation=[0.24, -0.73, -0.55, 0.32])
bevel(name='wheel_7', width=0.12, segments=2)

# part_8: wheel cap
create_rectangle(name='rectangle_8', width=0.002, length=0.03, rotation_rad=-0.21,center='MEDIAN',closed=True)
create_arc_by_3Dpoints(name='wheel cap_8', profile_name='rectangle_8', control_points=[[0.16, -0.49, 0.13], [0.14, -0.44, 0.15], [0.12, -0.49, 0.17]], thickness=0.0, fill_caps='both')

# part_9: wheel cap
create_rectangle(name='rectangle_9', width=0.002, length=0.03, rotation_rad=0.35,center='MEDIAN',closed=True)
create_arc_by_3Dpoints(name='wheel cap_9', profile_name='rectangle_9', control_points=[[0.19, -0.49, -0.11], [0.19, -0.44, -0.08], [0.18, -0.49, -0.05]], thickness=0.0, fill_caps='both')

# part_10: wheel
create_primitive(name='wheel_10', primitive_type='cylinder', location=[0.19, -0.47, -0.08], scale=[0.03, 0.03, 0.01], rotation=[0.53, -0.45, 0.6, -0.4])
bevel(name='wheel_10', width=0.12, segments=2)

# part_11: wheel axle
create_primitive(name='wheel axle_11', primitive_type='cylinder', location=[-0.18, -0.45, -0.06], scale=[0.01, 0.01, 0.01], rotation=[0.6, 0.6, 0.38, -0.38])

# part_12: wheel axle
create_primitive(name='wheel axle_12', primitive_type='cylinder', location=[-0.12, -0.45, 0.16], scale=[0.01, 0.01, 0.01], rotation=[0.65, 0.65, -0.28, 0.28])

# part_13: wheel axle
create_primitive(name='wheel axle_13', primitive_type='cylinder', location=[0.0, -0.45, -0.2], scale=[0.01, 0.01, 0.01], rotation=[0.71, 0.71, -0.01, 0.01])

# part_14: wheel axle
create_primitive(name='wheel axle_14', primitive_type='cylinder', location=[0.12, -0.45, 0.16], scale=[0.01, 0.01, 0.01], rotation=[0.67, -0.67, 0.23, 0.23])

# part_15: wheel axle
create_primitive(name='wheel axle_15', primitive_type='cylinder', location=[0.19, -0.45, -0.06], scale=[0.01, 0.01, 0.01], rotation=[0.42, 0.42, 0.57, -0.57])

# part_16: chair base
create_curve(name='curve_16', control_points=[[0.0, 0.0, 0.0], [0.0, -0.02, 0.0], [0.03, -0.02, 0.0], [0.03, 0.0, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1], closed=True)
bevel(name='curve_16', width=0.01, segments=8)
create_curve(name='chair base_16', profile_name='curve_16', control_points=[[-0.2, -0.4, -0.06], [-0.0, -0.4, 0.02]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

# part_17: chair base
create_curve(name='curve_17', control_points=[[0.0, 0.0, 0.0], [-0.0, -0.02, 0.0], [0.03, -0.02, 0.0], [0.03, -0.0, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1], closed=True)
bevel(name='curve_17', width=0.01, segments=8)
create_curve(name='chair base_17', profile_name='curve_17', control_points=[[0.01, -0.44, 0.01], [-0.12, -0.44, 0.19]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

# part_18: chair base
create_curve(name='curve_18', control_points=[[0.0, 0.0, 0.0], [-0.02, -0.0, 0.0], [-0.02, -0.03, 0.0], [0.0, -0.03, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1], closed=True)
bevel(name='curve_18', width=0.01, segments=8)
create_curve(name='chair base_18', profile_name='curve_18', control_points=[[0.01, -0.44, -0.22], [0.01, -0.44, 0.0]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

# part_19: chair base
create_curve(name='curve_19', control_points=[[0.0, 0.0, 0.0], [0.0, -0.02, 0.0], [0.03, -0.02, 0.0], [0.03, 0.0, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1], closed=True)
bevel(name='curve_19', width=0.01, segments=8)
create_curve(name='chair base_19', profile_name='curve_19', control_points=[[0.22, -0.44, -0.06], [0.01, -0.44, 0.02]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

# part_20: leg
create_primitive(name='leg_20', primitive_type='cylinder', location=[0.0, -0.28, 0.0], scale=[0.02, 0.02, 0.13], rotation=[0.71, -0.71, 0.02, 0.02])

# part_21: chair base
create_curve(name='curve_21', control_points=[[0.0, 0.0, 0.0], [0.0, -0.02, 0.0], [0.03, -0.02, 0.0], [0.03, 0.0, 0.0]], handle_type=[1, 1, 1, 1, 1, 1, 1, 1], closed=True)
bevel(name='curve_21', width=0.01, segments=8)
create_curve(name='chair base_21', profile_name='curve_21', control_points=[[0.12, -0.44, 0.19], [-0.0, -0.44, 0.01]], points_radius=[1.0, 1.0], handle_type=[0, 1, 1, 0], thickness=0.0, fill_caps='both')

# part_22: leg
create_primitive(name='leg_22', primitive_type='cylinder', location=[0.0, -0.08, 0.0], scale=[0.01, 0.01, 0.08], rotation=[0.71, -0.7, 0.05, 0.05])

# part_23: seat
create_circle(name=['Circle_0_23', 'Circle_1_23', 'Circle_2_23', 'Circle_3_23', 'Circle_4_23', 'Circle_5_23', 'Circle_6_23', 'Circle_7_23', 'Circle_8_23'], location=[[-0.01, 0.98, 0.01], [-0.01, 0.97, 0.01], [-0.01, 0.94, 0.01], [-0.0, 0.7, 0.01], [0.0, 0.22, 0.0], [-0.0, 0.43, 0.0], [0.0, 0.06, 0.0], [0.0, 0.0, 0.0], [0.0, -0.01, 0.0]], rotation=[[0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0], [0.72, -0.7, 0.0, -0.0]], scale=[[0.01, 0.002, 0.17], [0.1, 0.002, 0.17], [0.12, 0.002, 0.17], [0.14, 0.01, 0.17], [0.21, 0.01, 0.17], [0.14, 0.01, 0.17], [0.14, 0.002, 0.17], [0.12, 0.002, 0.17], [0.01, 0.002, 0.17]])
bridge_edge_loops(name=['seat_23', 'BridgeLoop_2_23', 'BrigdeLoop_3_23', 'BridgeLoop_4_23', 'BridgeLoop_5_23'], profile_name=[['Circle_7_23', 'Circle_6_23', 'Circle_5_23'], ['Circle_4_23', 'Circle_3_23', 'Circle_2_23', 'Circle_1_23'], ['Circle_8_23', 'Circle_7_23'], ['Circle_1_23', 'Circle_0_23'], ['Circle_5_23', 'Circle_4_23']], number_cuts=[8, 32, 8, 8, 4], smoothness=[0.08, 0.19, 0.03, 0.18, 0.09], profile_shape_factor=[0.0, 0.02, 0.0, 0.01, 0.01], interpolation='SURFACE', fill_caps=['none', 'none', 'both', 'both', 'both'])
join_obj(name='seat_23', seq_name=['seat_23', 'BridgeLoop_2_23', 'BrigdeLoop_3_23', 'BridgeLoop_4_23', 'BridgeLoop_5_23'], weld_threshold=1e-4)
add_simple_deform_modifier(name='seat_23', angle=0.08, origin=[0.0, -0.01, 0.0], rotation=[0.72, -0.7, 0.0, -0.0])
create_curve(name='curve_23', control_points=[[0.003, 0.008, 0.218], [0.003, -0.052, -0.4], [0.003, 0.075, -0.088], [-0.001, 0.45, -0.202]], points_radius=[1, 1], handle_type=[0, 3, 3, 0])
add_curve_modifier_to_object(name='seat_23', curve_name='curve_23', origin=[0.0, -0.01, 0.0], rotation=[0.72, -0.7, 0.0, -0.0], axis='POS_Z')