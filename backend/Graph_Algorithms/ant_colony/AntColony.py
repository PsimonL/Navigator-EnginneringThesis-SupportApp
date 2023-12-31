import time
import random
import multiprocessing

from backend.Graph_Algorithms.ConstVars import THRASH_NODES
from backend.Graph_Algorithms.GeometryUtils import get_obstacles, is_obstacle_inside_room
from backend.Graph_Algorithms.ant_colony.GridUtils import create_grid, find_nodes_by_coordinates
from backend.Graph_Algorithms.ant_colony.Pathfinding import ant_colony
from backend.Graph_Algorithms.ant_colony.UiUtils import ui_runner

def driver():
    start_time = time.time()

    start_point = (50, 50)
    goal_point = (550, 550)

    room_coords = [(0, 0), (600, 0), (600, 600), (0, 600)]

    # obstacles_coords = []
    obstacles_coords = [[100, 1, 50, 350], [200, 100, 50, 499], [350, 1, 50, 500]]
    obstacles = get_obstacles(obstacles_coords)
    if not is_obstacle_inside_room(room_coords, obstacles_coords):
        raise Exception("Obstacles outside of room!")

    grid = create_grid(obstacles_coords, room_coords)

    start_node = find_nodes_by_coordinates(grid=grid, x=start_point[0], y=start_point[1])
    goal_node = find_nodes_by_coordinates(grid=grid, x=goal_point[0], y=goal_point[1])

    sorted_thrash_set = sorted(THRASH_NODES, key=lambda node: (node.x, node.y))
    for item in sorted_thrash_set:
        print("Thrash node: {}".format(item))

    if start_node and goal_node:
        print("Starting ACO")
        ret_path = ant_colony(start_node=start_node, goal_node=goal_node, grid=grid)
    else:
        raise Exception("Nodes don't found!")

    if ret_path:
        print("Path found.")
        print(ret_path)
        print("Path length = ", len(ret_path))
    else:
        print("Path not found!")
        print(ret_path)

    end_time = time.time()
    execution_time = end_time - start_time
    print(f"Czas wykonania algorytmu: {execution_time} sekundy")
    ui_runner(start_point, goal_point, grid, obstacles, room_coords, ret_path)


if __name__ == "__main__":
    start_time = time.time()
    print("Start")
    driver()
    end_time = time.time()
    execution_time = end_time - start_time
    print(f"Czas wykonania: {execution_time} sekundy")
