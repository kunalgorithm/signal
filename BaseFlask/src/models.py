from mongoengine import Document, EmailField, StringField
from werkzeug.security import generate_password_hash, check_password_hash

class Users(Document):
    gid = StringField(required=True)
    email = EmailField()
    password_hash = StringField()
    
