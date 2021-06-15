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


@app.route("/receipt", methods=["POST"])
def create_receipt():
    data = request.get_json()
    try: 
        doc_ref = db.collection("receipt").document()
        doc_ref.set({"products":data['products']})
        receipt = doc_ref.id
        new_data = {"userID": data["userID"],"receiptID": receipt}
        invoke_http("http://127.0.0.1:5000/addReceipt", method="POST", json=new_data)
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
        


@app.route("/getReceipt/<string:receiptID>")
def getReceipt(receiptID):
    try: 
        doc_ref = db.collection("receipt").document(receiptID)
        doc = doc_ref.get()
        return jsonify(
            {
                "code":200,
                "message": doc.to_dict()['products']
            }
        ),200
    except:
        return jsonify(
            {
                "code":501,
                "message": "error"
            }
        ),501

if __name__ == '__main__':
    app.run(port=5001, debug=True)