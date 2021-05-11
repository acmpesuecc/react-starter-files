const emailAuthTemplate = () => `
const signup = async (email, password) => {
    try {
      auth.createUserWithEmailAndPassword(email, password).then(async user => {
        // add api for create user here
      })
    } 
    catch(e) {
      setErrors(e.message)
    }
}

const login = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
    }
    catch(e) {
      setErrors(e.message)
    }
}

const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email)
}
`

const providerAuthTemplate = (name) => `
const ${name}Signin = () => {
    try {
      await auth.signInWithPopup(${name}Provider).then(async user => {
        if(user.additionalUserInfo.isNewUser){
          // add api for create user here
        }
      })
    } 
    catch(e) {
      setErrors(e.message)
    }
}\n
`

const fbIndex = (services) => {
    const authProviderImports = ''
    const authMethods = '';
    const authExports = '';
    services.forEach( service => {
        if (service === 'email') {
            authMethods += emailAuthTemplate();
            authExports += 'login,\nsignup,\nresetPassword,\n'
        }
        else {
            authProviderImports += (`, ${service}Provider`)
            authMethods += providerAuthTemplate(service);
            authExports += `${service}Signin,\n`
        }
    })
    return `
import React,{ useContext,useState,useEffect } from 'react';
import { auth${authProviderImports} } from './config';

export const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext)
};

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");

    const logout = () => {
        return auth.signOut();
    }
    
    ${authMethods}
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
        })
    
        return unsubscribe
    }, []);

    return (
        <AuthContext.Provider
            value = {{
                currentUser,
                ${authExports}
                logout,
                errors,
                setErrors
            }} 
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}
`
}

export default fbIndex;