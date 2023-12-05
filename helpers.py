import pickle
import joblib
import os

from backend.models import db, Suggestions
from flask import request, jsonify

dqn_model_folder = 'backend/Reinforcment_Learning_DQN/pickled_models'


def load_dqn_model():
    model_path = os.path.join(dqn_model_folder, 'model_dqn.pkl')
    with open(model_path, 'rb') as f:
        dqn_model = pickle.load(f)
    return dqn_model


def save_data_to_database(data):
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
