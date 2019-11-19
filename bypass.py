import requests
url=input("URL:")
ref=input("Referer:")
headers={
"Referer": ref,
"Sec-Fetch-Mode":"no-cors",
"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
}
req=requests.get(url,headers=headers,stream=True)
f = open("1.tmp", "wb")
for chunk in req.iter_content(chunk_size=1024):
    if chunk:
        f.write(chunk)