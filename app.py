from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)
DATABASE = 'database.db'


@app.route('/save_data', methods=['POST'])
def save_data():
    data = request.get_json()

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO suggestions (problem_desc, name, email, phone)
        VALUES (?, ?, ?, ?)
    ''', (data['problem_description'], data['name'], data['email'], data['phone']))

    conn.commit()
    conn.close()

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
    app.run(debug=True)
