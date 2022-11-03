##This sccript uses twint to scrape tweets from twitter:
# this process is applied to every word (vocabulary) of every category (these are passed through sys.stdin).
# the clean tweets function filters the tweets (based on language, no photos, no links etc),
# then an extraction of only relevants attributes happens in the same function, the final json exists in finaltweets.json
# finaltweet.json's initial value should be []


import sys, json
import twint, datetime,time
from json.decoder import JSONDecodeError

#data is our list of objects
for line in sys.stdin:
  data = json.loads(line)


def cleanTweets(j,w):
    tweets = []
    for line in open("../scraper/tweets.json", 'r', encoding='utf-8'):
        tweets.append(json.loads(line))
    deletions = []
    for k in tweets:
        if ( k["language"] != "en" or k["tweet"].lower().find(j.lower()) == -1 or len(k["photos"]) != 0 or len(k["reply_to"]) != 0 or len(k["thumbnail"]) or len(k["urls"]) or len(k["cashtags"]) or k["video"] != 0):      
            deletions.append(k)
    for l in deletions:
        tweets.remove(l) 
    with open("../scraper/cleantweets.json", 'a', encoding='utf-8') as f:
        json.dump(tweets, f,  indent=1)
    
    
    final=[]
    with open("../scraper/cleantweets.json", "r", encoding='utf-8') as f:
        try:
            content = json.load(f)
            if (len(content)>0):
                y = 0
                for x in content:
                    final.append ({key:val for key, val in content[y].items() if key in ["created_at","tweet"]}) # possibly more
                    final[-1]['category']= [w]
                    final[-1]['created_at']= final[-1]['created_at'][0:10]
                    y=y+1
        except JSONDecodeError as e:
            print ("error: " + str(e))
            pass
    content=[]
    with open("../scraper/finaltweets.json", "r", encoding='utf-8') as f:
        try:
            content = json.load(f)
            content.extend(final)
        except JSONDecodeError as e:
            print ("error: " + str(e))
            pass
    with open("../scraper/finaltweets.json", "w") as f:
        json.dump(content, f, indent= 1)
     
    open("../scraper/tweets.json", "w").close()
    open("../scraper/cleantweets.json", "w").close()
    
    
    return

##iterating through every word of each category and running twint
for i in data:
    for j in i["vocabulary"]:
        config = twint.Config()
        config.Search = j
        config.Store_json = True
        today = datetime.date.today()
        yesterday = str(today - datetime.timedelta(days=1))
        dayBefore =  str(today - datetime.timedelta(days=2))
        config.Since = dayBefore + " 22:00:00" ## Local time is UTC+2 ==> to be changed to 23:00:00 in winter time 
        #config.Until = yesterday + " 22:00:00" ##
        config.Limit = 40
        config.Output = "../scraper/tweets.json"
        twint.run.Search(config)
        cleanTweets(j,i["category"])
