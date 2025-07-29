import bpy
from math import radians, pi
from bpy_lib import *

delete_all()

# object name: cocktail table
# part_1: leg
create_polygon(name='hexagon_1', sides=6, radius=0.01)
create_curve(name='leg_1', profile_name='hexagon_1', control_points=[[-0.15, -0.5, -0.15], [-0.14, 0.18, -0.14], [-0.13, 0.47, -0.13]], points_radius=[1.0, 1.75, 1.75], handle_type=[1, 1, 1, 1, 1, 1], thickness=0.0, fill_caps='both')

# part_2: leg
create_polygon(name='hexagon_2', sides=6, radius=0.01)
create_curve(name='leg_2', profile_name='hexagon_2', control_points=[[-0.15, -0.5, 0.15], [-0.14, 0.18, 0.14], [-0.13, 0.47, 0.13]], points_radius=[1.0, 1.75, 1.75], handle_type=[1, 1, 1, 1, 1, 1], thickness=0.0, fill_caps='both')

# part_3: leg
create_polygon(name='hexagon_3', sides=6, radius=0.01)
create_curve(name='leg_3', profile_name='hexagon_3', control_points=[[0.15, -0.5, -0.15], [0.14, 0.18, -0.14], [0.13, 0.47, -0.13]], points_radius=[1.0, 1.75, 1.75], handle_type=[1, 1, 1, 1, 1, 1], thickness=0.0, fill_caps='both')

# part_4: leg
create_polygon(name='hexagon_4', sides=6, radius=0.01)
create_curve(name='leg_4', profile_name='hexagon_4', control_points=[[0.15, -0.5, 0.15], [0.14, 0.18, 0.14], [0.13, 0.47, 0.13]], points_radius=[1.0, 1.75, 1.75], handle_type=[1, 1, 1, 1, 1, 1], thickness=0.0, fill_caps='both')

# part_5: strecher
create_primitive(name='strecher_5', primitive_type='cylinder', location=[0.0, 0.2, -0.14], scale=[0.01, 0.01, 0.14], rotation=[0.52, 0.47, 0.53, 0.47])

# part_6: strecher
create_primitive(name='strecher_6', primitive_type='cylinder', location=[-0.14, 0.2, -0.0], scale=[0.01, 0.01, 0.14], rotation=[0.0, 0.05, 1.0, 0.0])

# part_7: strecher
create_primitive(name='strecher_7', primitive_type='cylinder', location=[-0.0, 0.2, 0.14], scale=[0.01, 0.01, 0.14], rotation=[0.52, 0.47, 0.53, 0.47])

# part_8: strecher
create_primitive(name='strecher_8', primitive_type='cylinder', location=[0.14, 0.2, 0.0], scale=[0.01, 0.01, 0.14], rotation=[0.0, 0.05, 1.0, 0.0])

# part_9: table top
create_primitive(name='table top_9', primitive_type='cube', location=[0.0, 0.49, 0.0], scale=[0.2, 0.2, 0.01], rotation=[0.5, 0.5, 0.5, -0.5])
bevel(name='table top_9', width=0.15, segments=9)