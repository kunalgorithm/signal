from mongoengine import Document, EmailField, EmbeddedDocument, EmbeddedDocumentField, ListField, ReferenceField, StringField, URLField
from werkzeug.security import generate_password_hash, check_password_hash

class User(Document):
    gid = StringField()
    fbid = StringField(primary_key=True)
    fbToken = StringField()
    friendList = ListField(ReferenceField('self'))
    name = StringField()
    picUrl = URLField()

class Visit(Document):
    user = ReferenceField(User)
    timestamp = StringField()
    url = URLField()