const ERR_NOT_LOGIN = "10001"
const ERR_NO_CREDITS = "10002"
const ERR_TNS_FAIL = "10003"
const ERR_PARAM_ILLEGAL = "10004"
const ERR_NO_OPENID = "10005"
const ERR_INVALID_VERCODE = "10006"
const ERR_INVALID_USER_OR_PASSWORD = "10007"
const ERR_INTERNAL_ERROR = "20001"

export function ParseErrCode({code}:{code: string}) {
  if (code == ERR_NOT_LOGIN) {
    return "User not logged in"
  } else if (code == ERR_NO_CREDITS) {
    return "Credits not enough"
  } else if (code == ERR_PARAM_ILLEGAL) {
    return "Invalid inputs"
  } else if (code == ERR_INVALID_VERCODE) {
    return "Verify code incorrect"
  } else if (code == ERR_INVALID_USER_OR_PASSWORD) {
    return "Password incorrect"
  } else if (code == ERR_INTERNAL_ERROR) {
    return "Internal Error"
  }
}