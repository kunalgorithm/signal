from mongoengine import Document, EmailField, ListField, ReferenceField, StringField, URLField
from werkzeug.security import generate_password_hash, check_password_hash

class Users(Document):
    gid = StringField()
    fbid = StringField()
    friendList = ListField(ReferenceField('self'))
    name = StringField()
    picUrl = URLField()
    
