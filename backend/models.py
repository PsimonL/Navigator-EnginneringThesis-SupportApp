from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Suggestions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    problem_description = db.Column(db.String(255))
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.Integer, unique=True, nullable=False)