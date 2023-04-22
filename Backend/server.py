from flask_ngrok import run_with_ngrok
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from chat import get_response

app = Flask(__name__)
run_with_ngrok(app)
CORS(app)

@app.route('/', methods=['POST', 'GET'])
@cross_origin(origins=['http://localhost:3000', 'https://example.com'])

def predict():
    data = request.json.get('data')
    res = get_response(data)
    return jsonify({ 'text': res })
    
app.run()