just playing with Strava api in typescript to clone activities for my dog's strava account

## Setup

* Setup strava for me. Let's call it (`master`)
* Setup another strava account for the dog. Let's call this one (`dog`)
* Login to `master`
* setup a new [strava app ](https://www.strava.com/settings/api)
* add your config details to src/config.ts per the [strava api details](https://www.strava.com/settings/api)
* start up the frontend and auth the master
* logout of strava
* back to this app, head to `/dogs` and auth your dog


## Frontend
in the root dir
```
npm install
```

#### Dev
```
npm run start
```

## Firebase
we use firebase to build the gpx files and upload to strava. From the `functions` directory, 
```
npm i
``` 
#### Dev
terminal tab 1
```
yarn build --watch
```

terminal tab 2
```
firebase serve --only functions
```

## Todos

* firebase handles all strava activity
* cron a token refresh
* support multiple dogs
