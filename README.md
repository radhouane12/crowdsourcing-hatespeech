# Combat-Hate
Combat Hate was built to assist researchers and practioners in the field of online hate speech detection by providing a platform to annotate data, providing up-to-date labeled dataset with all information that may be relevant in the process.

# Live
https://combat-hate.space/

# Download
```bash
git clone git@github.com:radhouane12/crowdsourcing-hatespeech.git
```

# Running
## Production Frontend
```WSL/Ubunutu
ssh root@191.96.53.32
cd ~/usr/src/app/crowdsourcing-hatespeech
git pull
cd client
npm run build
rm -r /var/www/html/*
cp -r ~/usr/src/app/crowdsourcing-hatespeech/client/dist/* /var/www/html
```

## Production Frontend
```PM2
https://pm2.keymetrics.io/docs/usage/process-management/
sudo pm2 start npm --watch --name "start.js" -- run "prod"
```

## Production Database
```mongosh
use admin
db.auth("myUserAdmin", passwordPrompt())
use CrowdsourcingHatespeechDB
```

## Development Frontend
```bash
cd client
npm run serve
```
## Development Frontend
```bash
cd server
npm run dev
```

## Docker
Docker files are not ready for use !!