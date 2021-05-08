#!/usr/bin/env node

require = require('esm')(module);
require('./src/index').main(process.argv);