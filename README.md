# Sud Web Talks

[![Build Status](https://travis-ci.org/sudweb/talks.svg?branch=master)](https://travis-ci.org/sudweb/talks)
[![NSP Status](https://nodesecurity.io/orgs/sud-web/projects/eaf659ee-9632-41ba-8005-9050dc85a991/badge)](https://nodesecurity.io/orgs/sud-web/projects/eaf659ee-9632-41ba-8005-9050dc85a991)

At [Sud Web](http://sudweb.fr), we manage *call for paper* via a Google Form.
This is nice and handy but totally unreadable.

This tool is a **frontend visualizer** of Sud Web talk proposals.
For the sake of our sanity.

![screenshot](https://sudweb.fr/img/talks-screenshot.png)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.</br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Install

Dependencies will be handled via `npm`.

`npm install`

## Developement

In the project directory, you can run:

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

`npm run deploy`

## Docker

To create the image, execute the following command in the project directory:

`docker build  -t=sudweb-talks .`

To run the image:

`docker run -it --name sudweb-talks -v $(pwd)/src:/app/src -v $(pwd)/public:/app/public -p 3000:3000 sudweb-talks`
