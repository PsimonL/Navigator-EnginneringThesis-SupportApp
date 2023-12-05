import pickle
import joblib
import os

dqn_model_folder = 'backend/Reinforcment_Learning_DQN/pickled_models'


def load_dqn_model():
    model_path = os.path.join(dqn_model_folder, 'model_dqn.pkl')
    with open(model_path, 'rb') as f:
        dqn_model = pickle.load(f)
    return dqn_model