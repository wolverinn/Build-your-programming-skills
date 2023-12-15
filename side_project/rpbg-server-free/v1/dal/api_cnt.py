from v1.models import ApiCount
from django.db.models import F

base_cnt_for_api = {
    "stable_api": 3000,
    "gpt_api": 10000,
    "stable_cos": 100,
    "replicate_stable_cos": 1600,
    "canny_api": 200,
}

def get_api_cnt(path: str) -> int:
    cnt = 0
    try:
        res = ApiCount.objects.get(path=path)
        cnt = res.gen_times
    except:
        pass
    if path in base_cnt_for_api.keys():
        cnt += base_cnt_for_api[path]
    if cnt % 10 == 0:
        cnt += 1
    return cnt

def incr_api_gen_time(path: str):
    if ApiCount.objects.filter(path=path).exists():
        ApiCount.objects.filter(path=path).update(gen_times=F('gen_times')+1)
    else:
        api = ApiCount(path=path)
        api.save()
    return
