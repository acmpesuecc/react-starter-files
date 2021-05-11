import fs from "fs";
import clear from "clear";
import inquirer from "inquirer";

import {
  appTemplate,
} from "../../templates";
import { Intro } from "../../utils/interactiveOutputs";

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

const firebaseInit = (path="") => {

    // keeps track of different providers used.
    let providers = [];

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
            message:"Choose your services (Press <space> to select, <a> to toggle all, <i> to inverse selection):",
            options:services,
        }
    ]);
    
    console.log("Your choices:", answers);

    createFolder(path+"/src/firebase");


    createFile(path+"/src/firebase/config.js");
    createFile(path+"/src/firebase/index.js");
    

    if (!doesDirectoryExist(path+"/src/pages")){
        createFolder(path+"/src/pages");
    }
    createFile(path+"/src/pages/signin.js");
    createFile(path+"/src/pages/signup.js")

}

export default firebaseInit;