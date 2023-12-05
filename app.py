from flask import Flask, render_template, request, jsonify
import json
import jsonpickle
import torch


from backend.models import db, Suggestions
from backend.Graph_Algorithms.a_start_dijkstra.AStarDijkstra import a_star_dijkstra_driver
from backend.Graph_Algorithms.rrt_rrt_star import RRT_RRT_Star
from backend.Graph_Algorithms.ant_colony import AntColony
from helpers import load_dqn_model

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///NavigatorDataBasetifier.sqlite'
db.init_app(app)




@app.route('/save_data', methods=['POST'])
def save_data():
    data = request.get_json()

    suggestion = Suggestions(
        problem_description=data['problem_description'],
        name=data['name'],
        email=data['email'],
        phone=int(data['phone'])
    )

    db.session.add(suggestion)
    db.session.commit()

    return jsonify({'message': 'Data saved successfully'})


def get_input():
    selected_algorithm = request.args.get('selectedAlgorithm')
    wymiary_pomieszczenia = request.args.get('wymiary_pomieszczenia')
    punkt_startowy = request.args.get('punkt_startowy')
    punkt_koncowy = request.args.get('punkt_koncowy')
    przeszkody = request.args.get('przeszkody')
    return selected_algorithm, wymiary_pomieszczenia, punkt_startowy, punkt_koncowy, przeszkody


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

    dqn_model = load_dqn_model()

    input_data = 0

    prediction = dqn_model.predict(input_data)

    # return render_template('dqn.html', prediction=prediction)
    return render_template('dqn.html')


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
