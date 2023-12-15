from v1.dal.api_cnt import incr_api_gen_time
from django.urls import get_resolver, URLPattern
from django.http import HttpResponse,JsonResponse


resolver = get_resolver(None)
url_patterns = resolver.url_patterns
paths = []
for pattern in url_patterns:
    if isinstance(pattern, URLPattern):
        path = str(pattern.pattern).strip("/")
        paths.append(path)

# path调用次数统计器，仅统计urls.py中注册的path
class APICntMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        try:
            path = request.path
            path = path.strip("/")
            if not isinstance(response, JsonResponse):
                if path in paths:
                    incr_api_gen_time(path)
            else:
                if path in paths:
                    incr_api_gen_time(path)
        except Exception as e:
            print("ApiCntMiddleware panic: ", e)
            pass
        return response