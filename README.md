# Angular ESRI Directions

This project's test integrating Angular + ESRI Map Api 3.20.

This project requires version's NodeJS >= 6.10 and <= 8.0.

You must to signin on website's argis online to use this example [account](https://developers.arcgis.com).


## Example

[View demo](https://angular-esri-directions.herokuapp.com)

## Get started

```
# Install dependencies
npm install
# Starting dev server
npm run dev
```

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run dev-proxy` for a dev server with apis requests proxies.
Navigate to `http://localhost:4200/`.The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `npm run ng generate component component-name` to generate a new component. You can also use `npm run ng generate directive/pipe/service/class/module`.

## Distribution

Run `npm run dist` to build the project for a production build. The build artifacts will be stored in the `dist/` directory.

## Distribution server

Run `npm run serve-dist` to test the project on production mode.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Electron

Run `npm run electron` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploy to Heroku

Easy ! ;)
* Get signin with [account](https://signup.heroku.com/signup/dc)
* Get heroku binary [installer](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

```
# Signin to heroku
heroku login 
# Create application static nodejs
heroku create
# Deploying application
git push heroku master
```

## Sources

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

This project inspired from [tomwayson's repository](https://github.com/tomwayson/angular-esri-loader).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get more help on Angular Material go to [online's documentation](https://material.angular.io/components)

To get more help on the ESRI's Api Javascript go to [online's documentation](https://developers.arcgis.com/javascript/3/jsapi/)
