import bpy
from math import radians, pi
from bpy_lib import *

delete_all()

# object name: bed frame
# part_1: leg
create_primitive(name='leg_1', primitive_type='cylinder', location=[-0.45, -0.17, -0.47], scale=[0.02, 0.02, 0.11], rotation=[0.62, -0.62, -0.33, -0.33])

# part_2: leg
create_primitive(name='leg_2', primitive_type='cylinder', location=[-0.45, -0.17, 0.48], scale=[0.02, 0.02, 0.11], rotation=[0.65, -0.65, -0.27, -0.27])

# part_3: leg
create_primitive(name='leg_3', primitive_type='cylinder', location=[0.45, -0.17, -0.47], scale=[0.02, 0.02, 0.11], rotation=[0.62, -0.62, -0.33, -0.33])

# part_4: leg
create_primitive(name='leg_4', primitive_type='cylinder', location=[0.45, -0.17, 0.48], scale=[0.02, 0.02, 0.11], rotation=[0.27, -0.27, 0.65, 0.65])

# part_5: bottom rail
create_primitive(name='cube_5', primitive_type='cube', location=[-0.448, -0.154, -0.465], scale=[0.001, 0.089, 0.003], rotation=[0.0, -0.0, 0.0, 1.0], apply=True)
bevel(name='cube_5', width=0.0002, segments=1)
array_1d(name='cube_5', fit_type='FIXED_COUNT', count=100, constant_offset=[-0.0, 0.0, 0.011])

# part_6: bottom rail
create_primitive(name='cube_6', primitive_type='cube', location=[0.442, -0.154, -0.477], scale=[0.0, 0.089, 0.002], rotation=[0.0, -0.707, 0.0, 0.707], apply=True)
bevel(name='cube_6', width=0.0001, segments=1)
array_1d(name='cube_6', fit_type='FIXED_COUNT', count=100, constant_offset=[-0.009, 0.0, 0.0])

# part_7: bottom rail
create_primitive(name='cube_7', primitive_type='cube', location=[0.442, -0.154, 0.481], scale=[0.0, 0.089, 0.002], rotation=[0.0, -0.707, 0.0, 0.707], apply=True)
bevel(name='cube_7', width=0.0001, segments=1)
array_1d(name='cube_7', fit_type='FIXED_COUNT', count=100, constant_offset=[-0.009, 0.0, 0.0])

# part_8: bottom rail
create_primitive(name='cube_8', primitive_type='cube', location=[0.448, -0.148, -0.465], scale=[0.0, 0.084, 0.002], rotation=[0.0, -0.0, 0.0, 1.0], apply=True)
bevel(name='cube_8', width=0.0001, segments=1)
array_1d(name='cube_8', fit_type='FIXED_COUNT', count=100, constant_offset=[-0.0, 0.0, 0.011])

# part_9: grid
create_primitive(name='cube_9', primitive_type='cube', location=[-0.0, -0.063, 0.479], scale=[0.468, 0.021, 0.02], rotation=[0.0, -0.0, -0.707, 0.707], apply=True)
create_primitive(name='cube_2_9', primitive_type='cube', location=[0.448, -0.063, 0.004], scale=[0.021, 0.497, 0.02], rotation=[0.0, -0.0, -0.707, 0.707], apply=True)
array_1d(name='cube_9', fit_type='FIXED_COUNT', count=8, constant_offset=[0.0, 0.0, -0.137])
array_1d(name='cube_2_9', fit_type='FIXED_COUNT', count=3, constant_offset=[-0.448, 0.0, 0.0])
join_obj(name='grid_9', seq_name=['cube_9', 'cube_2_9'], weld_threshold=0.0001)
bevel(name='grid_9', width=0.0141, segments=4)

# part_10: head board
create_primitive(name='head board_10', primitive_type='cylinder', location=[-0.45, 0.1, -0.47], scale=[0.01, 0.01, 0.16], rotation=[0.65, -0.65, -0.27, -0.27])

# part_11: head board
create_primitive(name='head board_11', primitive_type='cube', location=[0.0, 0.1, -0.47], scale=[0.45, 0.16, 0.02], rotation=[1.0, -0.0, -0.0, -0.0])

# part_12: head board
create_primitive(name='head board_12', primitive_type='cylinder', location=[0.45, 0.1, -0.47], scale=[0.01, 0.01, 0.16], rotation=[0.27, -0.27, 0.65, 0.65])

# part_13: head board
create_primitive(name='head board_13', primitive_type='cone', location=[0.0, 0.27, -0.47], scale=[0.45, 0.02, 0.02], rotation=[0.71, -0.71, -0.0, -0.0])