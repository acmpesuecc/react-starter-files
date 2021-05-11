let signupTemplate;
export default signupTemplate = (services) => {
    let emailSetup = '';
    let authImports = '';
    let authOutputs = '';

    services.forEach( service => {
        if (service === 'email'){
            authImports += 'signup, ';
            authOutputs += `
            <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
            <input type="button">Submit</input>
            `;
            emailSetup=`
            const [ email, setEmail ] = useState('');
            const [ password, setPassword ] = useState('');
        
            const handleSubmit = (e) => {
                e.preventDefault();
                if (email!="" && password!=""){
                    signup(email, password);
                }
            }
            `
        }
        else {
            authImports += `${service}Signin, `
            authOutputs += `or\n<button onClick={${service}Signin} > ${service} Signin </button>\n`
        }
    })
    return `
import React, { useState } from 'react';
import { useAuth } from '../firebase';

const Signup = () => {
    const { ${authImports}} = useAuth();
    ${emailSetup}

    return (
        <div
            style={{
                height:'100vh',
                width:'100%',
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
            }}
        >
            <h1>Signup</h1>
            <form onSubmit={${service==='email'? 'handleSubmit' : '()=>{}'}}>
                ${authOutputs}
            </form>
        </div>
    );
};

export default Signup;
`}