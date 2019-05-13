# Agora
# Making the Web Social Again
## Motivation
This is a chrome plugin that makes the private, isolated experience of surfing the web and watching Youtube videos a much more social and lively experience. This is a simple chrome plugin that tracks what videos you watch on Youtube and tells you if your friends have also watched the video to encourage discussion and strengthen your connections. Leverages FB friends.

## Setup
There are two parts to this app. The backend build in Flask uses a MongoDB Database hosted on MongoDB Atlas. The chrome plugin uses parcel to allow the usage of ES6 and importing libraries like Handlebars for HTML Templating.

### Chrome Plugin
You can activate developer mode for Chrome at chrome://extensions. Then simply load unpacked extension and select the chrome extension folder. Then select the options page and use the Click Me Login to authenicate with FB Login. You must be added as developer to the Agora application.

### Flask
Install pipenv if you haven't already Python 3.7
Get the .env file pointing to the Mongo database
`pipenv install`
`pipenv run flask run -p 3001`
