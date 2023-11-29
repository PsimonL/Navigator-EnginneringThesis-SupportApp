from flask import Flask, render_template, request, jsonify
import sqlite3
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///NavigatorDataBasetifier.sqlite'
db = SQLAlchemy(app)


class Suggestions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    problem_description = db.Column(db.String(255))
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.Integer, unique=True, nullable=False)


@app.route('/save_data', methods=['POST'])
def save_data():
    print("ŁAPIE")
    data = request.get_json()

    suggestion = Suggestions(
        problem_description=data['problem_description'],
        name=data['name'],
        email=data['email'],
        phone=int(data['phone'])
    )

    db.session.add(suggestion)
    db.session.commit()
    print("ZŁAPAŁO")

    return jsonify({'message': 'Data saved successfully'})


@app.route('/')
def main():
    return render_template('main.html')


@app.route('/panel')
def panel():
    return render_template('panel.html')


@app.route('/panel/dij_a_aco')
def dij_a_aco():
    print("USED dij_a_aco")
    return render_template('rrt_dij_a_aco.html')


@app.route('/panel/rrt')
def rrt():
    print("USED rrt")
    return render_template('rrt_dij_a_aco.html')


@app.route('/panel/dqn')
def dqn():
    print("USED dqn")
    return render_template('dqn.html')


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
