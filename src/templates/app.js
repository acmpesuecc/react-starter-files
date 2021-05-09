let appTemplate;
export default appTemplate = (pages) => {

    let pageImports = "";
    let pageRoutes = "";
    // getting all the page imports

    pages.forEach(page => {
        let pageImport = `import ${page.component} from './pages/${page.component}.js';\n`
        pageImports+=pageImport;

        let pageRoute = `\t\t\t\t\t\t<Route exact path={ROUTES.${page.name}} component={${page.component}} />\n`;
        pageRoutes+=pageRoute;
    });

return `
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ROUTES from "./routes";
import React from 'react';

${pageImports}

function App() {
    return (
      <BrowserRouter>
        <Switch>
${pageRoutes}
        </Switch>
      </BrowserRouter>
    );
  }

export default App;
`
}