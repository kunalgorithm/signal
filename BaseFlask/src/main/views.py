from flask import Blueprint, render_template, request, redirect, url_for
import requests

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template("index.html")

@main.route('/fblogin')
def fblogin():
  p2Params = {
    client_id: 824720791232936,
    redirect_uri: "http://localhost:3001/fblogin",
    client_secret: "52957b092f2da2048fc02e3201e7e59e",
    code: req.query['code']
  }
  # p2Url = 'https://graph.facebook.com/v3.3/oauth/access_token?' + utils.encodeQueryData(p2Params);
  # console.log(p2Url);
  # 
  # axios.get(p2Url)
  #   .then(response => {
  #     console.log("RESPONSE SUCCESSFUL");
  #     console.log(response.data);
  #   })
  #   .catch(error => {
  #     console.log(error);
  #   });
  # 
  # res.send(p2Url);
    return 'hi'