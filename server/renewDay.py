import requests
import json

config = {
    "enabled": True,
    "key": "AIzaSyC8qsoEPOkRDlH3A5E9EqKpUiCxjLVPlho",
    "accountFile": "account.json",
    "tokenFile": "token.json",
}

if(config["enabled"]):

    accountFile = open(config["accountFile"], "r+")
    tokenFile = open(config["tokenFile"], "r+")

    token = json.load(tokenFile)
    accountList = json.load(accountFile)

    accountFile.close()

    if (len(accountList) == 0):
        print("No account found.")
        tokenFile.close()
        exit()

    token["firebase"] = []
    for account in accountList:
        r = requests.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
            params={
                "key": config["key"],
            },
            data={
                "email": account["email"],
                "password": account["password"],
                "returnSecureToken": True
            }
        )

        if (r.status_code == requests.codes.ok):
            token["firebase"].append({
                "idToken": r.json()["idToken"],
                "refreshToken": r.json()["refreshToken"]
            })

    token["enabled"] = not (len(token["firebase"]) == 0)

    tokenFile.seek(0)
    json.dump(token, tokenFile)
    tokenFile.truncate()
    tokenFile.close()
