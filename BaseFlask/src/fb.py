import requests

def getFriends(access_token):
    # "data": [
    #   { "name": "Julia Goulia", "id": "julia's-user-id" },
    #   { "name": "Steven Even", "id": "steven's-user-id"} 
    # ],
    # "summary": { "total_count": 156 }
    params = {
        'fields': 'friends',
        'access_token': access_token
    }
    r = requests.get('https://graph.facebook.com/me', params=params)

    data = r.json()
    print("FRIENDS: ", data)
    friends = data['friends']
    # total_friends = friends.summary.total_count
    friendList = friends['data']
    friendList = list(map(lambda x: x['id'], friendList))
    print("FL:", friendList)
    return friendList
    
def getMe(access_token):
    # {'name': 'Jorge J Fuentes', 'id': '1053964268130651'}
    params = {
        'access_token': access_token
    }
    r = requests.get('https://graph.facebook.com/me', params=params)
    data = r.json()
    print("ME: ", data)
    return data