import fs from "fs";
import clear from "clear";
import inquirer from "inquirer";

import {
  routesTemplate,
  componentTemplate,
  appTemplate,
} from "../../templates";
import { Intro } from "../../utils/interactiveOutputs";

const createFolder = (path, dir) => {
  fs.mkdirSync(
    process.cwd() + dir + "/src" + path,
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

const createAppFile = (pages, path) => {
  fs.writeFile(
    process.cwd() + path + `/src/App.js`,
    appTemplate(pages),
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

const createComponentFile = (component, path) => {
  fs.writeFile(
    process.cwd() + path + `/src/components/${component}.js`,
    componentTemplate(component),
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

const createPageFile = (component, path) => {
  fs.writeFile(
    process.cwd() + path + `/src/pages/${component}.js`,
    componentTemplate(component),
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

const createRouteFile = (pages, path) => {
  fs.writeFile(
    process.cwd() + path + `/src/routes/index.js`,
    routesTemplate(pages),
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

const init = async (showIntro = true, path="") => {
  clear();
  const line = "-".repeat(process.stdout.columns);
  if (showIntro) {
    clear();
    Intro();
  }
  /*
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
    
    const components = ["Navbar", "ProjectCard"];
    */

  const pages = [];
  const components = [];

  let flag = 1;
  console.log("\n");

  let answer, answers;

  answer = await inquirer.prompt([
    {
      name: "check",
      message: "Do you want to create pages? (y/n)",
    },
  ]);
  let check = answer.check.toLowerCase();
  if (check === "y" || check === "yes") {
    flag = 1;
  } else if (check === "n" || check === "no") {
    flag = 0;
  } else {
    console.log("Couldn't understand you, answer with y/n only :( \n");
    return;
  }

  console.log("\n");
  console.log(line);

  while (flag) {
    console.log("\n");
    answers = await inquirer.prompt([
      {
        name: "page",
        message: "Name the page component:",
      },
      {
        name: "route",
        message: "Which route should it point to:",
      },
    ]);

    try {
      if (answers.page === "*qa" || answers.route === "*qa") {
        flag = 0;
        continue;
      } else if (answers.page === "" || answers.route === "") {
        console.error("Either page or route is in the wrong format!\n");
      } else {
        const page = {
          name: answers.page.toLowerCase(),
          component: answers.page,
          route: answers.route,
        };
        pages.push(page);
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  }

  console.log("\n");
  console.log(line);
  console.log("\n");
  answer = await inquirer.prompt([
    {
      name: "check",
      message: "Do you want to create components? (y/n)",
    },
  ]);

  check = answer.check.toLowerCase();

  if (check === "y" || check === "yes") {
    flag = 1;
  } else if (check === "n" || check === "no") {
    flag = 0;
  } else {
    console.log("Couldn't understand you, answer with y/n only :( \n");
    return;
  }

  while (flag) {
    console.log("\n");
    answers = await inquirer.prompt([
      {
        name: "component",
        message: "Name the component:",
      },
    ]);
    try {
      if (answers.component === "*qa") {
        flag = 0;
        continue;
      } else if (answers.component === "") {
        console.error("Component is in the wrong format!\n");
      } else {
        components.push(answers.component);
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  }
  console.log(line);
  console.info("\n Creating files..");

  createFolder("/pages", path);
  pages.forEach((page) => createPageFile(page.component, path));

  createFolder("/routes", path);
  createRouteFile(pages, path);

  createFolder("/components", path);
  components.forEach((component) => createComponentFile(component, path));

  createAppFile(pages, path);

  console.info("\n✅ Done");
  console.info(
    "\n\nThank you for using rsf, show your support by ⭐ing it on github at https://github.com/avinash-vk/react-starter-files."
  );
};

export default init;
