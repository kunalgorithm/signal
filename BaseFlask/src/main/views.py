from flask import Blueprint, flash, render_template, request, redirect, url_for
from ..models import Users
from ..fb import getFriends, getMe
import requests

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template("index.html")

@main.route('/fblogin')
def fblogin():
    print("UID", request.args['state'])
    
    p2Params = {
        'client_id': 824720791232936,
        'redirect_uri': "http://localhost:3001/fblogin",
        'client_secret': "52957b092f2da2048fc02e3201e7e59e",
        'code': request.args['code']
    }
    r = requests.get('https://graph.facebook.com/v3.3/oauth/access_token', params=p2Params)
    data = r.json()
    print("As", data)
    access_token = data['access_token']
    friendList = getFriends(access_token)
    me = getMe(access_token)
    return r.url


