import json
import os

# django里的路径都是从manage.py的目录开始的
# 或者直接写死绝对路径
dir_path = os.path.dirname(os.path.abspath(__file__))
# print(dir_path)
TOKEN_FILE_PATH = os.path.join(dir_path, "token_secret.json") # prod environment
token_json = json.load(open(TOKEN_FILE_PATH, 'r'))

REPLICATE_TOKEN = ""
if REPLICATE_TOKEN == "":
    REPLICATE_TOKEN = token_json.get("replicate_key")
os.environ["REPLICATE_API_TOKEN"] = REPLICATE_TOKEN

OSS_ACCESS_KEY = ""
if OSS_ACCESS_KEY == "":
    OSS_ACCESS_KEY = token_json.get("oss_access_key")

OSS_ACCESS_SECRET = ""
if OSS_ACCESS_SECRET == "":
    OSS_ACCESS_SECRET = token_json.get("oss_access_secret")
