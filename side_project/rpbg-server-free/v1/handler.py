from django.shortcuts import render
from django.http import HttpResponse,JsonResponse,HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
import uuid

from v1.dal import user_dal, feedback_dal
from util import generate
from v1.core import logic, consts

# Create your handler here.

# ***************** webapp handler *****************

@csrf_exempt
def web_rpbg(request):
    user_info, code = logic.get_user_from_request(request)
    if code:
        return JsonResponse({"code": code})
    prompt_en, code = logic.process_request_prompt_en(request, True)
    if code:
        return JsonResponse({"code": code})
    upload_img_url = logic.get_img_upload_url_from_request(request, "image")
    if not upload_img_url:
        return JsonResponse({"err": consts.ERR_PARAM_ILLEGAL})
    
    # generate
    res_img_url, parameters = generate.replace_background(prompt_en, upload_img_url)
    if not res_img_url:
        return JsonResponse({"code": consts.ERR_INTERNAL_ERROR})

    # upload res image
    res_img_url = logic.upload_img_from_url(res_img_url)

    return JsonResponse({
        "img_url": res_img_url,
        "left_credits": 1,
        "code": "",
    })


@csrf_exempt
def web_rembg(request):
    user_info, code = logic.get_user_from_request(request)
    if code:
        return JsonResponse({"code": code})
    upload_img_url = logic.get_img_upload_url_from_request(request, "image")
    if not upload_img_url:
        return JsonResponse({"err": consts.ERR_PARAM_ILLEGAL})
    
    # generate
    res_img_url = generate.rembg(upload_img_url)
    if not res_img_url:
        return JsonResponse({"code": consts.ERR_INTERNAL_ERROR})

    # upload res image
    res_img_url = logic.upload_img_from_url(res_img_url)

    return JsonResponse({
        "img_url": res_img_url,
        "left_credits": 1,
        "code": "",
    })

@csrf_exempt
def get_web_user_session(request):
    session_key = request.GET.get(consts.SESSION_KEY_SK)
    if not session_key:
        odin_session = uuid.uuid1()
        return JsonResponse({
            "logged_in": False,
            consts.SESSION_KEY_SK: odin_session,
        })
    user_info = user_dal.get_user_by_session(session_key)
    if not user_info:
        return JsonResponse({
            "logged_in": False,
            consts.SESSION_KEY_SK: session_key,
        })
    return JsonResponse({
        "logged_in": True,
        consts.SESSION_KEY_SK: user_info.session_key,
        "credits": 1,
    })


@csrf_exempt
def sign_in(request):
    email = request.POST.get('email',None)
    password = request.POST.get('password',None)
    if not email or not password:
        return JsonResponse({"code": consts.ERR_PARAM_ILLEGAL})
    user_info, login_msg = user_dal.user_login(email, password)
    if login_msg == "":
        # request.session[SESSION_KEY_SK] = user_info.session_key
        return JsonResponse({
            consts.SESSION_KEY_SK: user_info.session_key
        })
    return JsonResponse({"code": consts.ERR_INVALID_USER_OR_PASSWORD})

@csrf_exempt
def create_feedback_v2(request):
    email = request.POST.get("email")
    name = request.POST.get("name")
    fb_text = request.POST.get("feedback")
    if not fb_text or not email or not name:
        return JsonResponse({
            "code": consts.ERR_PARAM_ILLEGAL,
        })
    feedback_dal.create_feedback_email(email, name, fb_text)
    return JsonResponse({})

# **************** test ***************

def temp_home(request):
    return render(request, "temp_home.html")

def json_test(request):
    data = {
        "data": 1,
    }
    return JsonResponse(data)

def rmbg_home(request):
    return render(request, "rmbg_home.html")
