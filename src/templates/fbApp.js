let fbAppTemplate;
export default fbAppTemplate = (pages, privatePages) => {

    let pageImports = "";
    let publicRoutes = "";
    let privateRoutes = "";
    // getting all the page imports

    pages.forEach(page => {
        let pageImport = `import ${page.component} from './pages/${page.component}.js';\n`
        pageImports+=pageImport;

        let pageRoute = `\t\t\t\t\t\t<Route exact path={ROUTES.${page.name}} component={${page.component}} />\n`;

        if (page in privatePages)
            publicRoutes+=pageRoute;
        else privateRoutes += pageRoute;
    }); 

    
return `
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ROUTES from "./routes";
import React from 'react';

import { useAuth, AuthProvider } from "./firebase";

${pageImports}

function App() {
    let { currentUser } = useAuth();

    let privateRoutes = (
        <Switch>
${privateRoutes}
        </Switch>
    );

    let publicRoutes = (
        <Switch>
${publicRoutes}
        </Switch>
    );

    return (
      <BrowserRouter>
        {
            currentUser? signedInRoutes: signedOutRoutes
        }
      </BrowserRouter>
    );
}

const AuthfulApp = () => <AuthProvider><App /></AuthProvider>

export default AuthfulApp;
`
}