import pygame
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
from mpl_toolkits.mplot3d import Axes3D
import plotly.graph_objects as go
import plotly.express as px

from backend.Graph_Algorithms.ConstVars import WIDTH, HEIGHT, WHITE, BLACK, ADJUST_VECTOR, NODE_SIZE, BLUE, YELLOW, GREEN, RED, \
    INNER_HEIGHT, \
    INNER_WIDTH, ORANGE


def ui_runner(start_pt, goal_pt, grid, obstacles, room_coords, path):
    fig = go.Figure()

    for node in grid:
        fig.add_trace(go.Scatter(x=[node.x], y=[node.y], mode='markers', marker=dict(size=NODE_SIZE, color='white')))

    for obstacle in obstacles:
        rect_x = [obstacle[0], obstacle[0] + obstacle[2], obstacle[0] + obstacle[2], obstacle[0], obstacle[0]]
        rect_y = [obstacle[1], obstacle[1], obstacle[1] + obstacle[3], obstacle[1] + obstacle[3], obstacle[1]]
        fig.add_trace(go.Scatter(x=rect_x, y=rect_y, mode='lines', line=dict(color='blue'), fill='toself', fillcolor='blue'))

    fig.add_trace(go.Scatter(x=[start_pt[0]], y=[start_pt[1]], mode='markers', marker=dict(size=NODE_SIZE * 8, color='yellow')))
    fig.add_trace(go.Scatter(x=[goal_pt[0]], y=[goal_pt[1]], mode='markers', marker=dict(size=NODE_SIZE * 8, color='green')))

    if path:
        path_x = [point[0] for point in path]
        path_y = [point[1] for point in path]
        fig.add_trace(go.Scatter(x=path_x, y=path_y, mode='lines', line=dict(color='red', width=NODE_SIZE * 2)))

    if len(room_coords) > 1:
        room_x = [coord[0] for coord in room_coords + [room_coords[0]]]
        room_y = [coord[1] for coord in room_coords + [room_coords[0]]]
        fig.add_trace(go.Scatter(x=room_x, y=room_y, mode='lines', line=dict(color='orange', width=NODE_SIZE)))

    fig.update_layout(
        autosize=False,
        width=800,
        height=800,
        showlegend=False,
        xaxis=dict(scaleanchor='y', scaleratio=1),
        yaxis=dict(scaleanchor='x', scaleratio=1),
    )

    fig.show()
