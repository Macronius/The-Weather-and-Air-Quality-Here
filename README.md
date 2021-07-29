





- in order to use fetch on the server:
npm install node-fetch
in the entry file:
    const fetch = require('node-fetch');


- Air Quality Index Scale and Color Legend
https://aqicn.org/scale/



npm install dotenv
require("dotenv").config();
create .env file
API_KEY = #######################
console.log(process.env); to confirm it's there
replace contents of const api_key = "###" with process.env.API_KEY

create .gitignore file

//initialize this folder as a git-repository

git init (from cmd)