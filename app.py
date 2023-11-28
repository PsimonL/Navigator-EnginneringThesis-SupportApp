from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/dij_a_aco')
def dij_a_aco():
    return render_template('dij_a_aco.html')


@app.route('/rrt')
def rrt():
    return render_template('rrt.html')


@app.route('/dqn')
def dqn():
    return render_template('dqn.html')


if __name__ == '__main__':
    app.run(debug=True)

