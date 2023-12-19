SESSION_KEY_SK = "session_key"
SESSION_KEY_UID = "uid"
SESSION_KEY_VERCODE = "vercode"

# error code, returned as "code"
SUCCESS = "0"
ERR_NOT_LOGIN = "10001"
ERR_NO_CREDITS = "10002"
ERR_TNS_FAIL = "10003"
ERR_PARAM_ILLEGAL = "10004"
ERR_NO_OPENID = "10005"
ERR_INVALID_VERCODE = "10006"
ERR_INVALID_USER_OR_PASSWORD = "10007"
ERR_INTERNAL_ERROR = "20001"

# consts
PROMPT_ZH_MAX_LEN = 128
PROMPT_DEFAULT_ADD = "RAW photo, 8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3,"
CREDITS_COST_PER_GENERATE = 1
SUPER_SESSION_KEY = []
SEND_TYPE_SIGNUP = "1"
SEND_TYPE_CHANGE_PASSWORD = "2"

# rate limit
GENERATE_RATE_LIMIT = '30/m' # 一分钟同一ip频控，限制30次