from v1.core import consts
from v1.dal import user_dal
from v1.sdk import oss
import requests

import uuid
from io import BytesIO

def get_user_from_request(request):
    session_key = request.POST.get(consts.SESSION_KEY_SK)
    if not session_key:
        session_key = request.session.get(consts.SESSION_KEY_SK)
    if not session_key:
        return None, consts.ERR_NOT_LOGIN
    user_info = user_dal.get_user_by_session(session_key)
    if not user_info:
        return None, consts.ERR_NOT_LOGIN
    print("session key: {}".format(session_key))
    return user_info, ""


def get_img_upload_url_from_request(request, post_key):
    if not request.FILES[post_key]:
        return "" # ERR_PARAM_ILLEGAL
    image = request.FILES[post_key]
    image_io = BytesIO(image.read())
    img_bytes = image_io.getvalue()
    upload_img_name = 'pic/{}.png'.format(uuid.uuid1())
    oss.bucket.put_object(upload_img_name, img_bytes)
    upload_img_url = oss.image_tpl.format(upload_img_name)
    return upload_img_url

def upload_img_from_url(img_url):
    img_resp = requests.get(img_url)
    upload_img_name = 'pic/{}.png'.format(uuid.uuid1())
    oss.bucket.put_object(upload_img_name, img_resp.content)
    upload_img_url = oss.image_tpl.format(upload_img_name)
    return upload_img_url


def process_request_prompt_en(request, add_default: bool):
    prompt = request.POST.get("prompt")
    # 控制长度
    if not prompt:
        return "", consts.ERR_PARAM_ILLEGAL
    if len(prompt) > consts.PROMPT_ZH_MAX_LEN:
        prompt = prompt[:consts.PROMPT_ZH_MAX_LEN]
    prompt_en = prompt
    if len(prompt_en) <= 0:
        return "", consts.ERR_INTERNAL_ERROR
    if add_default:
        prompt_en = consts.PROMPT_DEFAULT_ADD + prompt_en
    return prompt_en, ""
