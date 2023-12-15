from v1.models import Record
import hashlib
import time, datetime

def get_user_records(uid):
    records = Record.objects.filter(uid=uid)
    return records

def save_user_records(record):
    record.save()