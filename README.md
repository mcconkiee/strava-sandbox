just playing with Strava api in typescript to clone activities for my dog's strava account

# Setup

* Setup strava for me. Let's call it (`master`)
* Setup another strava account for the dog. Let's call this one (`dog`)
* Login to `master`
* setup a new [strava app ](https://www.strava.com/settings/api)
* add your config details to src/config.ts per the [strava api details](https://www.strava.com/settings/api)
* start up the frontend and auth the master
* logout of strava
* back to this app, head to `/dogs` and auth your dog

Tokens will auto refresh from the activities page there after

# Dev
## Frontend
in the root dir
```
npm install
npm run start
```

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

## Todos

* firebase handles all strava activity
* automatically clone activites that are <= `N`miles/kms
* cron a token refresh
* support multiple dogs
