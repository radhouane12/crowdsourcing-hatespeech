const cron = require('node-cron');
const { PythonShell } = require('python-shell')
const fs = require('fs');
const Tweet = require('mongoose').model('Tweet')
const Dictionary = require('mongoose').model('Dictionary')


async function getDicts() {
    const dicts = await Dictionary.find()
    return dicts
}

async function saveTweets () {
    var json = require('../../../scraper/finaltweets.json');
    console.log(json.length)
    for(let i = 0; i < json.length; i++) {
        try {
            var tweet = new Tweet(json[i])
            await tweet.save()
            console.log("tweet saved")
        } catch (error) {
            i=i+1
        }
    }
    fs.writeFile('../scraper/finaltweets.json', JSON.stringify([]), 'utf8',(err) => {
        if (err) console.log(err)
      });
} 

module.exports = () => {
    cron.schedule('*/5 * * * *', () => {
        console.log("started Cron")
        getDicts().then(res => { 
            var pyshell = new PythonShell('../scraper/scraper.py');
            pyshell.send(JSON.stringify(res), { mode: 'json' });
            pyshell.on('message', function (message) {
                console.log(message);
              });
            pyshell.end(err => {
                if (err) console.log(err)
                console.log("entering saveTweets")
                saveTweets()
            });
        }).catch(err => console.log(err))
    });
}