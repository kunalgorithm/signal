from flask import Flask
from flask_mongoengine import MongoEngine
from flask_login import LoginManager

#local config.py
from .config import config

db = MongoEngine()
login_manager = LoginManager()
login_manager.session_protection = 'strong'
# login_manager.login_view = 'main.index'

#Factory Creation of App Allowing Ez calling of other config rules
def create_app(config_name):
    app = Flask(__name__)
    #app.config is a dictionary object used for flask as well as package config
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    db.init_app(app)
    login_manager.init_app(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .main import user as user_blueprint
    app.register_blueprint(user_blueprint, url_prefix='/user')

    return app
