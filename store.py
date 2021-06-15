from flask.globals import current_app
import firebase_admin
from firebase_admin import credentials, firestore, auth
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import dotenv_values
import os  
from invokes import invoke_http
import json

config = dotenv_values(".env")
cred = credentials.Certificate("secretKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


app = Flask(__name__)
CORS(app)

@app.route("/createStore", methods=["POST"])
def createStore():
    data = request.get_json()
    try: 
        doc_ref = db.collection("store").document()
        doc_ref.set(data)
        return jsonify(
            {
                "code":200,
                "message":"Success"
            }
        ),200
    except Exception as e:
        return jsonify(
            {
                "code":501,
                "message": e
            }
        ),501

@app.route("/getStore/<string:storeID>")
def getStore(storeID):
    try: 
        doc_ref = db.collection("store").document(storeID)
        doc = doc_ref.get()
        return jsonify(
            {
                "code":200,
                "message": doc.to_dict()
            }
        ),200
    except Exception as e:
        return jsonify(
            {
                "code":501,
                "message": e
            }
        ),501

@app.route("/getAllStore")
def getAllStore():
    try: 
        docs = db.collection("store").stream()
        result = []
        for doc in docs:
            result.append(doc.id)
        return jsonify(
            {
                "code":200,
                "message": result
            }
        ),200
    except Exception as e:
        return jsonify(
            {
                "code":501,
                "message": e
            }
        ),501

@app.route('/addProduct', methods=["POST"])
def addProduct():
    data = request.get_json()
    doc_ref = db.collection('store').document(data["storeID"])
    doc = doc_ref.get()
    if doc.exists:
        try:
            curr_store = doc.to_dict()['product']
            curr_store.append(data["productID"])
            doc_ref.update({"products": curr_store})
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
            "message": "Could not find store"
        }
    ), 404



if __name__ == '__main__':
    app.run(port=5002, debug=True)