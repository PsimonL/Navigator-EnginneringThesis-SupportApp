from flask import Flask, render_template, request, jsonify
import json
import jsonpickle
import torch

# from backend.models import db
from backend.Graph_Algorithms.a_start_dijkstra.AStarDijkstra import a_star_dijkstra_driver
from backend.Graph_Algorithms.rrt_rrt_star import RRT_RRT_Star
from backend.Graph_Algorithms.ant_colony import AntColony
# from helpers import save_data_to_suggestions, get_input, save_data_to_dqn_request

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///NavigatorDataBase.sqlite'
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)


class Suggestions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    problem_description = db.Column(db.String(255))
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.Integer, unique=True, nullable=False)

class DQN_Requests(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    problem_description = db.Column(db.String(255))
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.Integer, unique=True, nullable=False)
def save_data_to_dqn_request(data):
    try:
        dqn_request = DQN_Requests(
            problem_description=data['problem_description'],
            name=data['name'],
            email=data['email'],
            phone=int(data['phone'])
        )

        db.session.add(dqn_request)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Data saved successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error: {str(e)}'})


def save_data_to_suggestions(data):
    try:
        suggestion = Suggestions(
            problem_description=data['problem_description'],
            name=data['name'],
            email=data['email'],
            phone=int(data['phone'])
        )

        db.session.add(suggestion)
        db.session.commit()

        return jsonify({'success': True, 'message': 'Data saved successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error: {str(e)}'})


def get_input():
    selected_algorithm = request.args.get('selectedAlgorithm')
    wymiary_pomieszczenia = request.args.get('wymiary_pomieszczenia')
    punkt_startowy = request.args.get('punkt_startowy')
    punkt_koncowy = request.args.get('punkt_koncowy')
    przeszkody = request.args.get('przeszkody')
    return selected_algorithm, wymiary_pomieszczenia, punkt_startowy, punkt_koncowy, przeszkody


@app.route('/contact_data_save', methods=['POST'])
def save_data():
    data = request.get_json()
    result = save_data_to_suggestions(data)
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
    db.create_all()
    app.run(debug=True)
