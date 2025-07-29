import bpy
from math import radians, pi
from bpy_lib import *

delete_all()

# object name: bowl
# part_1: bowl
create_curve(name='curve_1', control_points=[[0.0, 0.0, 0.0], [0.14, 0.0, 0.0], [0.147, 0.0, 0.0], [0.14, 0.03, 0.0], [0.44, 0.274, 0.0], [0.487, 0.547, 0.0]], handle_type=[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0])
bezier_rotation(name='bowl_1', profile_name='curve_1', location=[-0.0, -0.27, 0.0], rotation=[0.7, -0.7, 0.08, 0.09], thickness=0.009)