#Este archivo envia mensajes de error, y limpia el codigo solo se manda a llamar
from flask import jsonify


def send_error( message, status_code):
    return jsonify({"status": "error", "message": message}), status_code

def send_success(message,data , status_code):
    return jsonify({"status": "success", "body": data, "message": message}), status_code