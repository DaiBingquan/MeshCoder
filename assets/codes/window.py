import bpy
from math import radians, pi
from bpy_lib import *

delete_all()

# object name: Window
# part_1: panel
create_rectangle(name='rectangle_1', width=0.04, length=0.11, rotation_rad=0.0,center='MEDIAN',closed=True)
create_rectangle(name='panel_1', profile_name='rectangle_1', width=0.85, length=0.97, location=[-0.0, -0.03, 0.0], rotation=[0.71, -0.71, 0.0, -0.0], closed=True, thickness=0.0, fill_caps='none')

# part_2: shutter_frame
create_rectangle(name='rectangle_2', width=0.04, length=0.11, rotation_rad=0.0,center='MEDIAN',closed=True)
create_rectangle(name='shutter_frame_2', profile_name='rectangle_2', width=0.80, length=0.91, location=[-0.0, -0.03, 0.0], rotation=[0.71, -0.71, 0.0, -0.0], closed=True, thickness=0.0, fill_caps='none')

# part_3: shutter
create_primitive(name='cube_3', primitive_type='cube', location=[-0.0, -0.033, 0.414], scale=[0.002, 0.379, 0.01], rotation=[0.0, 0.707, 0.707, -0.0], apply=True)
bevel(name='cube_3', width=0.0005, segments=1)
array_1d(name='cube_3', fit_type='FIXED_COUNT', count=50, constant_offset=[0.0, -0.0, -0.019])

# part_4: curtain_hold
create_primitive(name='curtain_hold_4', primitive_type='uv_sphere', location=[-0.42, 0.06, 0.46], scale=[0.02, 0.02, 0.02], rotation=[0.42, -0.26, -0.05, -0.87])

# part_5: curtain_hold
create_primitive(name='curtain_hold_5', primitive_type='cylinder', location=[-0.42, 0.04, 0.46], scale=[0.01, 0.01, 0.02], rotation=[0.5, -0.5, -0.5, -0.5])

# part_6: curtain_hold
create_polygon(name='hexagon_6', sides=6, radius=0.004)
create_curve(name='curtain_hold_6', profile_name='hexagon_6', control_points=[[0.42, 0.06, 0.46], [-0.42, 0.06, 0.46]], points_radius=[1.0, 1.0], handle_type=[1, 1, 1, 1], thickness=0.0, fill_caps='both')

# part_7: curtain
create_wave(name='wave_7', shift=0.56, frequency=3.4, altitude=0.03, length=0.39, rotation_rad=-0.0)
create_curve(name='curtain_7', profile_name='wave_7', control_points=[[-0.24, 0.06, 0.49], [-0.24, 0.06, -0.49]],handle_type=[1, 1, 1, 1], thickness=0.0)

# part_8: curtain
create_wave(name='wave_8', shift=0.56, frequency=3.26, altitude=0.03, length=0.38, rotation_rad=-0.0)
create_curve(name='curtain_8', profile_name='wave_8', control_points=[[0.27, 0.06, 0.49], [0.27, 0.06, -0.49]],handle_type=[1, 1, 1, 1], thickness=0.0)

# part_9: curtain_hold
create_primitive(name='curtain_hold_9', primitive_type='uv_sphere', location=[0.42, 0.06, 0.46], scale=[0.02, 0.02, 0.02], rotation=[0.42, -0.26, -0.05, -0.87])

# part_10: curtain_hold
create_primitive(name='curtain_hold_10', primitive_type='cylinder', location=[0.42, 0.04, 0.46], scale=[0.01, 0.01, 0.02], rotation=[0.45, -0.45, 0.55, 0.55])