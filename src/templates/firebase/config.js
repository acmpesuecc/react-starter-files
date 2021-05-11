const PROVIDERS = {
    'google': "export const googleProvider = new firebase.auth.GoogleAuthProvider();",
    'github': "export const githubProvider = new auth.GithubAuthProvider();"
}
const config = (services) => {

    let authServices='';
    if(services.length!=0){
        authServices+='export const auth = app.auth();\n';
        services.forEach(service => service=='email' ? '' : authServices+=PROVIDERS[service]+"\n");
    }
    return `    
import firebase from "firebase/app"
import "firebase/auth"

const fbConfig={} // add firebase config here 

const app = firebase.initializeApp(fbConfig);
export default app;

${authServices}
`
};

export default config;