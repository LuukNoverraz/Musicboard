# How to use

To use this application, you will have to first off insert your own Spotify API client ID and secret into the code at ```auth-server/authorization_code/app.js``` to ensure you will be able to log in with Spotify while using the app. After this, you will have to install the node modules used. These are:
## Bower
```
$ npm install -g bower
```
Install any other dependencies with npm as needed if application does not boot succesfully.

## Open application in browser
After having installed these modules, you can host the site locally with the two following steps.
```
cd client
npm start
```
and after having gone back to the root folder:
```
cd auth-server
node authorization_code/app.js
```
## How to use the app

When having opened the application in the browser, just login with your Spotify account and the currently playing song will display on the screen. If there are lyrics and/or artist information found relating to your currently playing song, it will appear on the screen.

## Technical Design
![Technical Design](https://i.imgur.com/dFEzJDW.png)
