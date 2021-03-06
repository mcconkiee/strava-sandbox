just playing with Strava api in typescript to clone activities for my dog's strava account

# Setup

## Intro
main configs are in `functions/src/configs` - copy the sample and add your strava api details

```
configs.dev.ts -> .gitignore
configs.prod.ts -> .gitignore
configs.sample.ts
```

* Setup strava for you. Let's call it (`master`)
* Setup another strava account for the dog. Let's call this one (`dog`)
* Login to `master`
* setup a new [strava app ](https://www.strava.com/settings/api)
* add your config details to src/config.ts per the [strava api details](https://www.strava.com/settings/api)
* start up the frontend and auth the master
* logout of strava
* back to this app, head to `/dogs` and auth your dog

Tokens will auto refresh from the activities page there after


you can run the `dev.sh` script to configure config file

## Firebase

### Functions
we use firebase to build the gpx files and upload to strava. From the `functions` directory, 
```
nvm use 8.16.0
npm i
``` 

Once you are setup, you will need two tabs open, both in the `functions` dir

terminal tab 1
```
yarn build --watch
```

terminal tab 2
```
firebase serve --only functions
```

# Dev
## Frontend
in the root dir
```
ln -s /Users/ericmcconkie/Documents/personal/projects/sites/strava-sandbox/functions/src/config.ts ./src/globalConfig.ts
npm install
npm run start

```


# PRODUCTION
## Frontend
in the root dir
```
npm run build
firebase deploy --only hosting
```

### Functions

```
cd ./functions
firebase serve --only functions
```
### CI

circle ci watches master branch for ci deployment - the build number for the app is set in the configs

you can test the config locally assuming circleci CLI is installed

``
circleci local execute -e FIREBASE_DEPLOY_TOKEN=$FIREBASE_TOKEN_STRAVA -e STRAVA_CLIENT_ID=123 -e STRAVA_CLIENT_SECRET=XXX -e CONFIG_FILE_API_HOST=abc -e CONFIG_FILE_HOST=efg -e MAPBOX_API_KEY=hij
```

## Todos

* firebase handles all strava activity
* automatically clone activites that are <= `N`miles/kms
* cron a token refresh
* support multiple dogs
