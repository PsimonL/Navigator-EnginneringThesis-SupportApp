import os.path

from flask import Flask, render_template, request
import json
import jsonpickle
import torch
from flask_sqlalchemy import SQLAlchemy
from backend.Graph_Algorithms.a_start_dijkstra.AStarDijkstra import a_star_dijkstra_driver
from backend.Graph_Algorithms.rrt_rrt_star import RRT_RRT_Star
from backend.Graph_Algorithms.ant_colony import AntColony

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'NavigatorDataBase.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
db.init_app(app)

# It must declared be here
from helpers import save_data_to_suggestions, get_input, save_data_to_dqn_request


@app.route('/contact_data_save', methods=['POST'])
def save_data():
    data = request.get_json()
    result = save_data_to_suggestions(data)
    print(result)
    return result


@app.route('/dqn_data_save', methods=['POST'])
def dqn_data_save():
    data = request.get_json()
    print('data')
    print(data)
    result = save_data_to_dqn_request(data)
    print('result')
    print(result)
    return result


@app.route('/')
def main():
    return render_template('main.html')


@app.route('/panel')
def panel():
    return render_template('panel.html')


@app.route('/panel/dij_a_aco')
def dij_a_aco():
    sel_alg, wp, ps, pk, p = get_input()
    print("selected_algorithm = ", sel_alg)
    if sel_alg == "Dijkstra's Algorithm" or sel_alg == "A* Algorithm":
        start_point, goal_point, obstacles, room_coords, ret_path = a_star_dijkstra_driver(sel_alg)

        return render_template('rrt_dij_a_aco.html',
                               start_point=json.dumps(start_point),
                               goal_point=json.dumps(goal_point),
                               obstacles=json.dumps(obstacles),
                               room_coords=json.dumps(room_coords),
                               ret_path=json.dumps(ret_path)
                               )

    return render_template('rrt_dij_a_aco.html')


@app.route('/panel/rrt')
def rrt():
    sel_alg, wp, ps, pk, p = get_input()
    print("selected_algorithm = ", sel_alg)
    return render_template('rrt_dij_a_aco.html')


@app.route('/panel/dqn')
def dqn():
    sel_alg, wp, ps, pk, p = get_input()
    print("selected_algorithm = ", sel_alg)
    return render_template('dqn.html')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
