# Ischedule Application

## Installation

To install the application run `npm install` or `yarn install` in the "app" folder. 
This command will install all the dependencies.

## Dev mode

To run the application in a development mode run in console `npm run dev` this command will launch build in web server on port :8082.
  
## Build application

To build the application for production run in console `npm run build`. 
This command will build the .js and copy all the assets to the "dist" folder.

## Application usage

To use the application  in production you need to embed the built .js application and .css files in you .html
For reference you can use the "dist/index.html"
The application will be mounted on `<div id=app></div` dom element
All the assets are currently configured to be loaded from `/static` folder (absolute path)


