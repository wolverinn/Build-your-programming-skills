import Cookies from "js-cookie";

const HOST = "https://stable-ai.tech/zlai";

export async function userSession() {
  await new Promise((resolve) => setTimeout(resolve, 600));
  let sk = "";
  let sk_stored = Cookies.get("session_key");
  if (sk_stored) {
    console.log("get stored session key: ", sk_stored);
    sk = sk_stored;
  } else {
    return {
      logged_in: false,
      credits: 0
    };
  }
  const res = await fetch(HOST + "/api/web/get_session/?session_key=" + sk, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status !== 200) {
    console.log("get user session error: ", res.status);
  } else {
    let resJson = await res.json();
    if (resJson["logged_in"]) {
      // setLogin(true);
      return {
        logged_in: true,
        credits: resJson["credits"],
      }
    }
  }
  return {
    logged_in: false,
    credits: 0
  }
}

export function GetHost() {
  return HOST
}