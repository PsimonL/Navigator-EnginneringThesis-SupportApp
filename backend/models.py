from app import db

class Suggestions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    problem_description = db.Column(db.String(255))
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.Integer, unique=True, nullable=False)

    def __init__(self, problem_description, name, email, phone):
        self.problem_description = problem_description
        self.name = name
        self.email = email
        self.phone = phone

class dqnrequests(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    problem_description = db.Column(db.String(255))
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.Integer, unique=True, nullable=False)

    def __init__(self, problem_description, name, email, phone):
        self.problem_description = problem_description
        self.name = name
        self.email = email
        self.phone = phone
