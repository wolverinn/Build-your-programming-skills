import time
import requests
import json
import replicate


# 背景替换
def replace_background(prompt: str, image_uri) -> (str, str):
    # backup: https://replicate.com/catacolabs/sdxl-ad-inpaint
    start = time.time()
    output = replicate.run(
        "wolverinn/realistic-background:f77210f166f419c82faf53e313a8b18b24c2695d58116b4a77a900b2715f595a",
        input={
            "image": image_uri,
            "prompt": prompt,
            "max_width": 512,
            "max_height": 512,
        }
    )
    end = time.time()
    print("rpbg replicate cost(milli seconds): {}".format(end*1e3-start*1e3))
    # print("chill resp: ", output)
    if not output:
        return "", ""
    return output.get("image",""), output.get("payload","")

# 去除背景
def rembg(image_uri) -> str:
    # backup: https://replicate.com/cjwbw/rembg
    # using: https://replicate.com/ilkerc/rembg/api
    start = time.time()
    output = replicate.run(
        "ilkerc/rembg:e809cddc666ccfd38a044f795cf65baab62eedc4273d096bf05935b9a3059b59",
        input={"image_url": image_uri}
    )
    end = time.time()
    print("rembg replicate cost(milli seconds): {}".format(end*1e3-start*1e3))
    # print("chill resp: ", output)
    if not output:
        return ""
    return output
