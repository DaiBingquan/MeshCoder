import bpy
from math import radians, pi
from bpy_lib import *

delete_all()

# object name: desk lamp
# part_1: lamp base
create_primitive(name='lamp base_1', primitive_type='cylinder', location=[-0.0, -0.47, -0.0], scale=[0.21, 0.21, 0.03], rotation=[0.7, 0.7, -0.07, 0.07])

# part_2: lamp post
create_primitive(name='lamp post_2', primitive_type='cylinder', location=[-0.0, -0.47, -0.0], scale=[0.02, 0.02, 0.03], rotation=[0.7, -0.7, -0.07, -0.07])

# part_3: lamp post
create_primitive(name='lamp post_3', primitive_type='cylinder', location=[-0.0, -0.11, -0.0], scale=[0.02, 0.02, 0.3], rotation=[0.7, -0.7, -0.07, -0.07])

# part_4: cylinder shade
create_curve(name='curve_4', control_points=[[0.166, 0.0, 0.0], [0.18, 0.09, 0.0], [0.207, 0.346, 0.0]], handle_type=[0, 0, 0, 0, 0, 0])
create_circle(name='cylinder shade_4', profile_name='curve_4', radius=0.11, location=[-0.0, 0.43, -0.0], rotation=[0.71, 0.71, 0.02, -0.03], thickness=0.0067)

# part_5: bulb tube
create_primitive(name='bulb tube_5', primitive_type='cylinder', location=[-0.0, 0.26, -0.0], scale=[0.03, 0.03, 0.02], rotation=[0.7, 0.7, -0.07, 0.07])

# part_6: lamp rack
create_primitive(name='lamp rack_6', primitive_type='cylinder', location=[-0.07, 0.34, -0.13], scale=[0.005, 0.005, 0.15], rotation=[0.09, -0.43, 0.84, 0.29])

# part_7: bulb contact
create_circle(name='circle_7', radius=0.03, center='MEDIAN')
create_curve(name='bulb contact_7', profile_name='circle_7', control_points=[[-0.0, 0.24, -0.0], [-0.0, 0.23, -0.0], [-0.0, 0.22, -0.0]], points_radius=[1.0, 0.55, 0.3], handle_type=[1, 1, 1, 1, 1, 1], thickness=0.0, fill_caps='both')

# part_8: lamp rack
create_primitive(name='lamp rack_8', primitive_type='cylinder', location=[-0.07, 0.34, 0.13], scale=[0.005, 0.005, 0.15], rotation=[0.39, 0.88, -0.17, 0.17])

# part_9: spiral light tube
create_circle(name="circle",radius=0.003)
create_spiral(name="spiral",profile_name="circle",dif_z=0.01,radius=0.03,turns=5,thickness=0.0,location=[-0.0, 0.26, -0.0],rotation=[0.71, 0.71, -0.0, 0.0],fill_caps="both")

# part_10: lamp rack
create_circle(name='circle_10', radius=0.005, center='MEDIAN')
create_circle(name='lamp rack_10', profile_name='circle_10', radius=0.03, location=[-0.0, 0.24, -0.0], rotation=[0.7, 0.7, -0.1, 0.08], thickness=0.0, fill_caps='both')

# part_11: lamp rack
create_primitive(name='lamp rack_11', primitive_type='cylinder', location=[0.15, 0.34, -0.0], scale=[0.005, 0.005, 0.15], rotation=[0.7, 0.56, -0.43, -0.06])

# part_12: bulb
create_curve(name='curve_12', control_points=[[0.032, 0.0, 0.0], [0.037, 0.011, 0.0], [0.044, 0.032, 0.0], [0.082, 0.118, 0.0], [0.074, 0.172, 0.0], [0.045, 0.206, 0.0], [0.0, 0.215, 0.0]], handle_type=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
bezier_rotation(name='bulb_12', profile_name='curve_12', location=[-0.0, 0.28, -0.0], rotation=[0.51, -0.51, 0.49, 0.49], thickness=0.0)

# part_13: lamp rack
create_curve(name='curve_13', control_points=[[0.0, 0.0, 0.0], [-0.005, -0.005, 0.0], [0.003, -0.005, 0.0]], handle_type=[0, 0, 0, 0, 0, 0], closed=True, center='POINT')
create_circle(name='lamp rack_13', profile_name='curve_13', radius=0.27, location=[-0.0, 0.43, -0.0], rotation=[0.7, 0.7, -0.08, 0.06], thickness=0.0, fill_caps='none')