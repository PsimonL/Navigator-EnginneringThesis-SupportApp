from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('main.html')

@app.route('/panel')
def panel():
    return render_template('panel.html')

# @app.route('/panel/dij_a_aco')
# def dij_a_aco():
#     print("USED dij_a_aco")
#     return render_template('rrt_dij_a_aco.html')
#
#
# @app.route('/panel/rrt')
# def rrt():
#     print("USED rrt")
#     return render_template('rrt_dij_a_aco.html')
#
#
# @app.route('/panel/dqn')
# def dqn():
#     print("USED dqn")
#     return render_template('dqn.html')


if __name__ == '__main__':
    app.run(debug=True)
