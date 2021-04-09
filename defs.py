import yfinance as yf

def FetchTickerInfo(value):
    
    ticker=  yf.Ticker(value).info
    print("Ticker Fetched",value)
    return ticker
