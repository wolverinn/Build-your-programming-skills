import oss2
from oss2.credentials import EnvironmentVariableCredentialsProvider
from util.token_store import OSS_ACCESS_KEY, OSS_ACCESS_SECRET

# 填写RAM用户的访问密钥（AccessKey ID和AccessKey Secret）。

auth = oss2.Auth(OSS_ACCESS_KEY, OSS_ACCESS_SECRET)
endpoint = 'oss-cn-beijing.aliyuncs.com'
bucket_name = 'wlb-team-rmbg'
image_tpl = 'https://wlb-team-rmbg.oss-cn-beijing.aliyuncs.com/{}'

bucket = oss2.Bucket(auth, endpoint, bucket_name)

