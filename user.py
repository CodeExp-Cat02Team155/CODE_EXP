from flask.globals import current_app
import firebase_admin
from firebase_admin import credentials, firestore, auth
import pyrebase
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import dotenv_values
import os  
from invokes import invoke_http
import json

Firebase_API_KEY = {"apiKey": "AIzaSyBj7z_OcbMHqTs_Wi9ArMYnENW2OfH4ST0","authDomain": "codeexp2021.firebaseapp.com","projectId": "codeexp2021","storageBucket": "codeexp2021.appspot.com","messagingSenderId": "1021334246721","appId": "1:1021334246721:web:fddc4f6d41715274443dc0","measurementId": "G-HKK92WHSWN", "databaseURL":"https://codeexp2021-default-rtdb.firebaseio.com/"}


config = dotenv_values(".env")
cred = credentials.Certificate("secretKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
firebase = pyrebase.initialize_app(Firebase_API_KEY)
Login_Auth = firebase.auth()

app = Flask(__name__)
CORS(app)




def userTable(data, uid):
    try:
        db.collection('user').document(uid).set(data)
        return True
    except:
        return False

@app.route("/" , methods=['POST'])
def signup():
    data = request.get_json()
    if data['password'] == data["confirmPassword"]:
        try:
            user = auth.create_user(email=data["email"],password=data['password'])
            final = {"email":data["email"], "password":data['password']}
            final['favourite']=[]
            final['item'] = {}
            final['cart'] = {}
            result = userTable(final, user.uid)
            if result:   
                return jsonify(
                    {
                        "code": 201,
                        "data": user.uid
                    }
                ), 201
            else:
                return jsonify(
                {
                    "code": 501,
                    "message": "Error in creating user table"
                }
            ), 501
        except:
            return jsonify(
                {
                    "code": 502,
                    "message": "Error in creating user"
                }
            ), 502

    return jsonify(
                {
                    "code": 503,
                    "message": "Confirm Password do not match with Password"
                }
            ), 503

@app.route('/login/<string:email>/<string:password>')
def login(email, password):
    # data = request.get_json()
    # print(data)
    print(email, password)
    try:
        user = Login_Auth.sign_in_with_email_and_password(email,password)
        user = Login_Auth.refresh(user['refreshToken'])
        return jsonify(
            {
                "code": 201,
                "data": user['userId']
            }
        ), 201
    except:
        return jsonify(
            {
                "code": 401,
                "message": "Invalid User or Password. Try Again."
            }
        ), 401

@app.route('/addCart', methods=["POST"])
def addCart():
    data = request.get_json()
    doc_ref = db.collection('user').document(data["userID"])
    doc = doc_ref.get()
    if doc.exists:
        try:
            curr_cart = doc.to_dict()['cart']
            if data["product"] in curr_cart:
                curr_cart[data["product"]] += data["qty"]
            else:
                curr_cart[data["product"]] = data["qty"]
            doc_ref.update({"cart": curr_cart})
            return jsonify(
                {
                    "code":201,
                    "message": "Append Success"
                }
            ),201
        except:
            return jsonify(
                {
                    "code":500,
                    "message": "Error"
                }
            ),500
    else:
        return jsonify(
        {
            "code": 404,
            "message": "Could not find user"
        }
    ), 404

@app.route('/removeCart', methods=["POST"])
def removeCart():
    data = request.get_json()
    doc_ref = db.collection('user').document(data["userID"])
    doc = doc_ref.get()
    if doc.exists:
        try:
            curr_cart  = doc.to_dict()['cart']
            if data["option"] == "qty":
                curr_cart[data["product"]] -= 1
            else:
                curr_cart.pop(data["product"])
            doc_ref.update({"cart": curr_cart})
            return jsonify(
                {
                    "code":201,
                    "message": "pop Success"
                }
            ),201
        except:
            return jsonify(
                {
                    "code":500,
                    "message": "Error"
                }
            ),500
    else:
        return jsonify(
        {
            "code": 404,
            "message": "Could not find user"
        }
    ), 404


@app.route('/addFav', methods=["POST"])
def addFavourite():
    data = request.get_json()
    doc_ref = db.collection('user').document(data["userID"])
    doc = doc_ref.get()
    if doc.exists:
        try:
            curr_fav = doc.to_dict()['favourite']
            curr_fav.append(data["product"])
            doc_ref.update({"favourite": curr_fav})
            return jsonify(
                {
                    "code":201,
                    "message": "Append Success"
                }
            ),201
        except:
            return jsonify(
                {
                    "code":500,
                    "message": "Error"
                }
            ),500
    else:
        return jsonify(
        {
            "code": 404,
            "message": "Could not find user"
        }
    ), 404

@app.route('/removeFav', methods=["POST"])
def removeFavourite():
    data = request.get_json()
    doc_ref = db.collection('user').document(data["userID"])
    doc = doc_ref.get()
    if doc.exists:
        try:
            curr_fav = doc.to_dict()['favourite']
            print(curr_fav)
            curr_fav.remove(data["product"])
            doc_ref.update({"favourite": curr_fav})
            return jsonify(
                {
                    "code":201,
                    "message": "pop Success"
                }
            ),201
        except:
            return jsonify(
                {
                    "code":500,
                    "message": "Error"
                }
            ),500
    else:
        return jsonify(
        {
            "code": 404,
            "message": "Could not find user"
        }
    ), 404

@app.route("/addReceipt", methods=["POST"])
def addReceipt():
    data = request.get_json()
    doc_ref = db.collection('user').document(data["userID"])
    doc = doc_ref.get()
    if doc.exists:
        try:
            curr_receipt = doc.to_dict()['receipt']
            print(curr_receipt)
            curr_receipt.append(data["receiptID"])
            doc_ref.update({"receipt": curr_receipt})
            return jsonify(
                {
                    "code":201,
                    "message": "append Success"
                }
            ),201
        except:
            return jsonify(
                {
                    "code":500,
                    "message": "Error"
                }
            ),500
    else:
        return jsonify(
        {
            "code": 404,
            "message": "Could not find user"
        }
    ), 404

@app.route("/getReceiptID/<string:userID>")
def getReceipt(userID):
    try: 
        doc_ref = db.collection("user").document(userID)
        doc = doc_ref.get()
        return jsonify(
            {
                "code":200,
                "message": doc.to_dict()['receipt']
            }
        ),200
    except:
        return jsonify(
            {
                "code":501,
                "message": "error"
            })

if __name__ == '__main__':
    app.run(port=5000, debug=True)