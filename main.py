# main.py
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO


socketio = SocketIO()

def create_app():
    app = Flask(__name__)
#    app.config['SECRET_KEY'] = 'secret!'
    socketio.init_app(app)
    return app

if __name__ == '__main__':
    app = create_app()
    socketio.run(app)

app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')

# Example API route for sending a message
@app.route('/send_message', methods=['POST'])
def send_message():
  message = request.form.get('message')
  # ... (process message, save to database)
  return jsonify({'status': 'success'})
