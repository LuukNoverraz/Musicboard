# How to use

To use this application, you will have to first off install the node modules used. These are:
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

## Technical Design
![Technical Design](https://i.imgur.com/dFEzJDW.png)
