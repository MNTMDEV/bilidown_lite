import requests
import re
import json

def down_flv(avu,url):
    headers={
        "Referer": avu,
        "Sec-Fetch-Mode":"no-cors",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
    }
    req=requests.get(url,headers=headers,stream=True)
    f = open("1.flv", "wb")
    for chunk in req.iter_content(chunk_size=1024):
        if chunk:
            f.write(chunk)
    print("Complete!")

def proc_request(avu,aid):
    cidText=requests.get("https://api.bilibili.com/x/web-interface/view?aid="+str(aid)).text
    cidText=json.loads(cidText)
    cidPages=cidText['data']['pages']
    print("Here are pages:")
    for i in range(len(cidPages)):
        print("Page "+str(i)+":"+cidPages[i]['part'])
    i=int(input("Select:"))
    cid=cidPages[i]['cid']
    # cid=cidText['data']['cid']
    print("You can select the following quality:")
    print("[1]360 [2]480")
    mode=input("Select:")
    if(mode=="1"):
        qn=16
    elif(mode=="2"):
        qn=32
    else:
        print("Invalid choice!")
        exit(0)
    url="https://api.bilibili.com/x/player/playurl?cid="+str(cid)+"&avid="+str(aid)+"&fnval=2&fnver=0&player=1&otype=json"
    url=url+"&qn="+str(qn)
    urlText=requests.get(url).text
    urlText=json.loads(urlText)
    url=urlText['data']['durl'][0]['url']
    down_flv(avu,url)

url=input("URL:")
ret=re.match("https://www.bilibili.com/video/av(\\d+)",url)
if(not ret):
    print("Invalid bilibili video url")
else:
    aid=ret.group(1)
    proc_request(url,aid)