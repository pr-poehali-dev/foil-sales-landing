import json
import os
import smtplib
from email.mime.text import MIMEText
from email.header import Header


def handler(event: dict, context) -> dict:
    '''
    Business: Принимает заявку с формы лендинга и отправляет её на email продавца.
    Args: event с httpMethod, body (name, contact, message); context с request_id.
    Returns: HTTP-ответ со статусом отправки заявки.
    '''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    name = (body.get('name') or '').strip()
    contact = (body.get('contact') or '').strip()
    message = (body.get('message') or '').strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Укажите имя и контакт'}),
        }

    host = os.environ.get('SMTP_HOST')
    port = int(os.environ.get('SMTP_PORT', '465'))
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASSWORD')
    recipient = os.environ.get('RECIPIENT_EMAIL')

    text = (
        'Новая заявка с сайта Олимпия\n\n'
        f'Имя: {name}\n'
        f'Контакт: {contact}\n'
        f'Сообщение: {message or "—"}\n'
    )

    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header('Новая заявка с сайта Олимпия', 'utf-8')
    msg['From'] = user
    msg['To'] = recipient

    with smtplib.SMTP_SSL(host, port) as server:
        server.login(user, password)
        server.sendmail(user, [recipient], msg.as_string())

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True}),
        'isBase64Encoded': False,
    }