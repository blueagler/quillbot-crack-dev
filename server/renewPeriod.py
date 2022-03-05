import requests
import json

config = {
    "enabled": True,
    "key": "AIzaSyC8qsoEPOkRDlH3A5E9EqKpUiCxjLVPlho",
    "tokenFile": "token.json",
}

if(config["enabled"]):

    tokenFile = open(config["tokenFile"], "r+")

    token = json.load(tokenFile)

    if (len(token["firebase"]) == 0):
        print("No firebase found.")
        tokenFile.close()
        exit()

    for index, firebase in enumerate(token["firebase"]):
        r = requests.post(
            "https://securetoken.googleapis.com/v1/token",
            params={
                "key": config["key"],
            },
            data={
                "grant_type": "refresh_token",
                "refresh_token": firebase["refreshToken"]
            }
        )

        if (r.status_code == requests.codes.ok):
            token["firebase"][index]["idToken"] = r.json()["id_token"]
            token["firebase"][index]["refreshToken"] = r.json()[
                "refresh_token"]
        else:
            del token["firebase"][index]

    token["enabled"] = not (len(token["firebase"]) == 0)

    tokenFile.seek(0)
    json.dump(token, tokenFile)
    tokenFile.truncate()
    tokenFile.close()
