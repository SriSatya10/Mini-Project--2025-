from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)
CHAT_FILE = 'chat_history.json'

# Load existing chats
def load_chats():
    if os.path.exists(CHAT_FILE):
        with open(CHAT_FILE, 'r') as f:
            return json.load(f)
    return []

# Save chats
def save_chats(chats):
    with open(CHAT_FILE, 'w') as f:
        json.dump(chats, f)

@app.route('/save-chat', methods=['POST'])
def save_chat():
    data = request.json
    chats = load_chats()
    chats.append(data)  # data = {"sender": "user", "message": "Hello"}
    save_chats(chats)
    return jsonify({"status": "success"})

@app.route('/get-chats', methods=['GET'])
def get_chats():
    chats = load_chats()
    return jsonify(chats)

if __name__ == '__main__':
    app.run(debug=True)
