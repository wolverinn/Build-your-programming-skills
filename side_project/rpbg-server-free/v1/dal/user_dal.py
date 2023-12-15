from v1.models import User
import hashlib
import time, datetime

def get_user_by_session(session_key):
    user = User.objects.get(session_key=session_key)
    return user

def user_login(email, password):
    try:
        user = User.objects.get(email=email)
        if user.password == password:
            return user, ""
    except User.DoesNotExist:
        return None, "用户未注册"
    return None, "密码错误"
