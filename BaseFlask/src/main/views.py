from flask import Blueprint, flash, render_template, request, redirect, url_for, jsonify
from ..models import User, Visit
from ..fb import getUserInfo
import requests
import datetime

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template("index.html")

@main.route('/fblogin')
def fblogin():
    gid = request.args['state']
    p2Params = {
        'client_id': 824720791232936,
        'redirect_uri': "http://localhost:3001/fblogin",
        'client_secret': "52957b092f2da2048fc02e3201e7e59e",
        'code': request.args['code']
    }
    r = requests.get('https://graph.facebook.com/v3.3/oauth/access_token', params=p2Params)
    data = r.json()
    access_token = data['access_token']
    userData = getUserInfo(access_token) #need to constantly update friendList
    userData['gid'] = gid
    userData['fbToken'] = access_token
    print("USERS: ", userData)
    user = User(**userData)
    user.save()
    return r.url
    
@main.route('/logVisit')
def logVisit():
    gid = request.args.get('gid', None)
    url = request.args.get('url', None)
    if url == None or gid == None:
        response = jsonify({'message': "Please add valid query parameters of a gid and url"})
        response.status_code = 400
        return response

    user = User.objects(gid=gid).first()
    now = str(datetime.datetime.now())
    visit = Visit(user=user, timestamp=now, url=url)
    visit.save()
    return jsonify(visit)

@main.route('/getFriendVisits')
def getFriendVisits():
    gid = request.args.get('gid', None)
    url = request.args.get('url', None)
    if url == None or gid == None:
        response = jsonify({'message': "Please add valid query parameters of a gid and url"})
        response.status_code = 400
        return response
    
    user = User.objects(gid=gid).first()
    print("FL", user.friendList)
    visits = Visit.objects(url=url, user__in=user.friendList)
    visitedFriends = []
    seenFriends = set()
    for visit in visits:
        print(visit)
        if visit.user.fbid not in seenFriends:
            parsedFriend = {
                'name': visit.user.name,
                'picUrl': visit.user.picUrl,
                'timestamp': visit['timestamp'],
                'fbid': visit.user.fbid
            }
            visitedFriends.append(parsedFriend)
            seenFriends.add(visit.user.fbid)
    return jsonify(visitedFriends)

