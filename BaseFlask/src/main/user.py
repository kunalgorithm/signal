from flask import Blueprint, flash, render_template, request, redirect, url_for
from flask import current_app as app
from flask_login import login_required, current_user, login_user, logout_user
from passlib.hash import pbkdf2_sha256

from ..models import Users
from ..forms import RegistrationForm

user = Blueprint('user', __name__)

@user.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        #Todo: not use wtf form and also verify confirmation
        form = RegistrationForm(request.form)
        if not form.validate():
            flash("Form validation fails")
            return render_template('register.html')
        passwordHash = pbkdf2_sha256.hash(form.password.data)
        user = Users(form.email.data, passwordHash)
        user.save()
        login_user(user)
        flash('Im a flash: Thanks for registering')
        return redirect(url_for('main.index'))

    return render_template('register.html')
    
@user.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = Users.objects(email=request.form["email"]).first()
        if user is not None: 
            if pbkdf2_sha256.verify(request.form["password"], user.password_hash):
                login_user(user)
                return redirect(url_for('main.index'))
        flash("Incorrect Login Credientials")
    return render_template('login.html')

@user.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('main.index'))