# React Starter Files
Everytime I created a React app, the first thing I did was setup the project by adding all the routes and pages, so that development and collaboration becomes easier, and it was a repetitive process. So I decided to simplify it.

React starter files is a command line utility that allows you to initialize your react app with your preferred components before you begin development.

## Install it

The utility is available as a npm package available [](here). 
```bash
npm install rsf-cli
```

## Using it
```bash
rsf <command> [--options]
```

- ### init
Initialize your already created react app with pages and components.
```bash
rsf init
```

- ### create-react-app
Run create-react-app as well as rsf init in a single command
```bash
rsf create-react-app myapp
```

- ### help
Get help for all your commands :)
```bash
rsf help
```

- ### version
Check the current version for your rsf-cli!
```bash
rsf version
```