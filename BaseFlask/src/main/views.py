from flask import Blueprint, flash, render_template, request, redirect, url_for, jsonify
from ..models import Users
from ..fb import getUserInfo
import requests
import datetime

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template("index.html")

@main.route('/fblogin')
def fblogin():
    print("UID", request.args['state'])
    gid = request.args['state']
    print("TYPE", type(gid))
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
    userData = getUserInfo(access_token)
    userData['gid'] = gid
    print("USERS: ", userData)
    user = Users(**userData)
    user.save()
    return r.url
    
@main.route('/logVisit')
def logVisit():
    return True

@main.route('/getFriendVisits')
def getFriendVisits():
    now = str(datetime.datetime.now())
    data = [{'name': "Jorge J Fuentes", "picUrl": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1053964268130651&height=800&width=800&ext=1560247989&hash=AeRB-Mp1Gjpe-0cT", "timestamp": now}]
    return jsonify(data)

