import fs from "fs";
import clear from "clear";
import inquirer from "inquirer";

import {
  fbIndexTemplate,
  configTemplate,
  fbAppTemplate,
  signinTemplate,
  signupTemplate
} from "../../templates";

import { Intro } from '../../utils/interactiveOutputs';

const createFolder = (folderPath) => {
  fs.mkdirSync(
    process.cwd() + folderPath,
    { recursive: true },
    (error) => {
      if (error) {
        console.error("ERROR OCCURED:", error);
        return false;
      } else {
        return true;
      }
    }
  );
};

const createFile = (filePath, fileContent) => {
  fs.writeFile(
    process.cwd() + filePath,
    fileContent,
    (error) => {
      if (error) {
        console.log("ERROR OCCURED:", error);
        return false;
      } else {
        return true;
      }
    }
  );
};

// check if a directory exist
const doesDirectoryExist = (dirPath) => {
    fs.access(dirPath, error => {
        return error ? 0 : 1;
    })
}

const getPages = (path) => {
  let x = path+'src/routes/index.js';
    const content = fs.readFileSync(x);
    let y = content.toString().match(/export default ([\s\S]*?);/);
    y = y[1].replace(/\s/g, '').replace('{','').replace('}','').split(',');
    let pages = []
    y.forEach(object => {
      let tmp = object.split(":");
      pages.push({
        name:tmp[0],
        route:tmp[1].replace(/['"]+/g, ''),
        component:tmp[0][0].toUpperCase()+tmp[0].slice(1)
      })
    });
    return pages;
}

const firebaseInit = async (path="", intro=true) => {
    if(intro) {
      clear();
      Intro();
    }
    let answers, check;    
    check = await inquirer.prompt([
        {
          name: "check",
          message: "Do you want to initialize firebase auth? (y/n)",
        },
    ]);
    
    check = check.check.toLowerCase().trim();
    if (check === "n" || check === "no"){
        return;
    }
    if (check !== "y" && check !== "yes" ){
        console.info("🎢 Assuming that's a yes! Ctrl+C to quit anytime ;) \n")
    }

    let services = ["email", "google", "github"];
    answers = await inquirer.prompt([
        {
            type:'checkbox',
            name:"services",
            message:"Choose your services:",
            choices:services,
        }
    ]);
    
    services = answers.services;

    console.log("\n");
    let pages = getPages(path);
    let choices = pages.map(page => ({name:page.route,value:page}))
    answers = await inquirer.prompt([
      {
          type:'checkbox',
          name:"privatePages",
          message:"Select the routes you want to add as authenticated routes:",
          choices,
      }
    ]);
    let privatePages = answers.privatePages;
    
    createFolder(path+"/src/firebase");
    createFile(path+"/src/firebase/config.js", configTemplate(services));
    createFile(path+"/src/firebase/index.js", fbIndexTemplate(services));
    
    
    if (!doesDirectoryExist(path+"/src/pages")){
        createFolder(path+"/src/pages");
    }
    createFile(path+"/src/pages/signin.js", signinTemplate(services));
    createFile(path+"/src/pages/signup.js", signupTemplate(services));
    createFile(path+"/src/App.js", fbAppTemplate(pages,privatePages));

    if(intro){
      console.info("\n✅ Done");
      console.info(
      "\n\nThank you for using rsf, show your support by ⭐ing it on github at https://github.com/avinash-vk/react-starter-files."
      );
    }
} 

export default firebaseInit;