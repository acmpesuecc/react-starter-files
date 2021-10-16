# React Starter Files

<p align="left">
  <a href="https://nodei.co/npm/rsf-cli/"><img src="https://nodei.co/npm/rsf-cli.png" alt="npm install info" /></a>
</p>

Everytime I created a React app, the first thing I did was setup the project by adding all the routes and pages, so that development and collaboration becomes easier, which was a repetitive process. So I decided to simplify it.

React starter files is a command line utility that allows you to initialize your react app with your preferred components before you begin development.<br><br>
<img src = "https://user-images.githubusercontent.com/51489449/137424766-ec668c68-1699-4d40-ac29-932c8d77ba48.gif" height="270" width="480" alt="rsf-demo"> 
<br>

## Install it

The utility is available as a npm package available [here](https://www.npmjs.com/package/rsf-cli). 
```bash
npm install -g rsf-cli
```
<br>

## Using it
```bash
$ rsf <command> [--options]
``` 
<br>

> ### init
Initialize your already created react app with pages and components.
```bash
$ rsf init
```
<br>

> ### firebase-init
Add firebase integration to an app created using `rsf init`.
```bash
$ rsf firebase-init
```
<br>

> ### create-react-app
Run ``create-react-app`` as well as ``rsf init`` in a single command
```bash
$ rsf create-react-app myapp
```
<br>

> ### help

Get help for all your commands :)
```bash
$ rsf help
```
<br>

> ### version
Check the current version for your rsf-cli!
```bash
$ rsf version
```
<br>

## Tech Stack
### Language:
Javascript<br>
### Tools Needed:
- [NodeJS](https://nodejs.org/en/) 
- [Yarn package manager](https://yarnpkg.com/)
<br>

## Getting started
1. Clone the repository locally using.
1. Run `yarn install` locally to install the dependencies.
1. After that run `npm install -g` from the root of the repository to activate the cli in your environment
1. Run `rsf` to view the different options available
```bash
$ yarn install

$ npm install -g

$ rsf
```
<br>

## Beginner friendly
If you know NodeJs and the basics of how react works, you should be good to go!
<br>

## Maintainer
[Avinash V K](https://github.com/avinash-vk)  -  [Mail](avinash2000vk@gmail.com)
