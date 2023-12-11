from flask import request, jsonify
from backend.models import dqnrequests, Suggestions, db


def save_data_to_dqn_request(data):
    try:
        dqn_request = dqnrequests(
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