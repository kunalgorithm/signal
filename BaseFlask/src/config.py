import os
import ssl

class Config:
    SECRET_KEY=os.environ.get('SECRET_KEY') or 'hard to guess string'

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG=True

    #Mongoengine Variables
    MONGODB_SETTINGS={
        'host': os.environ.get('MONGODB_HOST'), 
        #below two are needed if `+srv` in uri like for Mongo Atlas
        'ssl': True, 
        'ssl_cert_reqs': ssl.CERT_NONE
    }

config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}
