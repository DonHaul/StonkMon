import yfinance as yf
from random_proxies import random_proxy
import requests
import requests_cache
requests_cache.install_cache(cache_name="cache_cache", backend='sqlite')

def FetchTickerInfo(value):
    
    randomproxy = random_proxy(use_cache=False,protocol='https')
    randomproxy = 'https://'+randomproxy
    ticker=  yf.Ticker(value).get_info(proxy = randomproxy)
    print("Ticker Fetched",value)
    return ticker


def FetchTickerInfo2(value):
    theurl = 'https://finance.yahoo.com/quote/'+value+'/'

    randomproxy = random_proxy(use_cache=False,protocol='https')
    randomproxy = 'https://'+randomproxy
    headers = {'https':randomproxy}
    petition = requests.get(theurl,headers=headers,timeout=10)

    print(value)
    return petition.content


def FetchTickerInfo3(value):
    theurl = 'https://finance.yahoo.com/quote/'+value+'/'

    randomproxy = random_proxy(use_cache=False,protocol='https')
    randomproxy = 'https://'+randomproxy
    headers = {'https':randomproxy}
    petition = requests.get(theurl,headers=headers,timeout=10)

    print(value)
    return value,petition.content