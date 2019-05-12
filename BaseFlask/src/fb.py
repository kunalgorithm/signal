import requests

def getUserInfo(access_token):
    params = {
        'fields': 'friends, name, id, picture.width(800).height(800)',
        'access_token': access_token
    }
    r = requests.get('https://graph.facebook.com/me', params=params)

    data = r.json()
    # print("Data: ", data)
    friends = data['friends']
    # total_friends = friends.summary.total_count
    friendList = friends['data']
    friendList = list(map(lambda x: x['id'], friendList))
    parsedUser = {
        'fbid': data['id'],
        'friendList': friendList,
        'name': data['name'],
        'picUrl': data['picture']['data']['url']
    }
    # print("User", parsedUser)
    return parsedUser