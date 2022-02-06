import requests
import json

config = {
    "enabled": True,
    "key": "AIzaSyC8qsoEPOkRDlH3A5E9EqKpUiCxjLVPlho",
    "email": "13702721856@139.com",
    "password": "yingfan202112",
    "verify": {
        "enabled": True,
        "code": "qmqq1122"
    },
    "configPath": "premium.json",
}

if(config["enabled"]):

    r = requests.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
                      config["key"],
                      data={
                          "email": config["email"],
                          "password": config["password"],
                          "returnSecureToken": True}
                      )

    f = open(config["configPath"], "r+")
    content = json.load(f)

    content["verify"] = config["verify"]
    content["key"] = config["key"]

    if(r.status_code == requests.codes.ok and r.json()["refreshToken"]):
        content["enabled"] = True
        content["token"]["refreshToken"] = r.json()["refreshToken"]
    else:
        content["enabled"] = False

    f.seek(0)
    json.dump(content, f)
    f.truncate()
    f.close()
