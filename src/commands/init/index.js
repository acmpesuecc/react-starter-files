import fs from 'fs';
import clear from 'clear';
import inquirer from 'inquirer';

import { Intro } from '../../utils/interactiveOutputs';

const createPagesFolder = () => {
    fs.mkdirSync(process.cwd()+"/src/pages",{ recursive:true}, (error)=>{
        if(error){
            console.error("ERROR OCCURED:",error);
            return false;
        }
        else {
            return true;
        }
    })
}

const componentTemplate = (component) => {
    return (
    `import React from 'react';\n\nconst ${component} = () => {\n\treturn (\n\t\t<div>${component}</div>\n\t)\n};\n\nexport default ${component};`
    )
}

const createPageFile = ({component}) => {
    fs.writeFile(process.cwd()+`/src/pages/${component}.js`,componentTemplate(component),(error)=>{
        if(error){
            console.log("ERROR OCCURED:",error);
            return false;
        }
        else {
            return true;
        }
    })
}
const init = async (showIntro=true) => {
    clear();
    if (showIntro) Intro();

    const pages = [
        {
            name: "home",
            component:"Home",
            route:"/home"
        },
        {
            name: "info",
            component:"Info",
            route:"/info"
        }
    ];
    
    console.log("\n Let's start by creating your pages. Type *qa to end the process right there:\n")
    let flag=1;/*
    while(flag){
        console.log("\n")
        let answers = await inquirer.prompt([
            {
                name: "page",
                message: "Name the page component:",
            },
            {
                name:"route",
                message:"Which route should it point to:"
            }
        ]);
        try{
            if (answers.page === "*qa" || answers.route === "*qa"){
                flag=0;
                continue;
            }
            else if (answers.page === "" || answers.route === "" ){
                console.error("Either page or route in the wrong format!\n");
            }
            else {
                const page = {
                    name: answers.page.toLowerCase(),
                    component:answers.page,
                    route:answers.route
                }
                pages.push(page);
            }
        }
        catch(err){
            console.log("ERROR", err)
        }
    }*/

    console.info("\n✅ Done");
    console.log("\nPages:",pages);

    //flag= createPagesFolder(pages);
    if(true) {
        pages.forEach(page => createPageFile(page));
    }
}

export default init;