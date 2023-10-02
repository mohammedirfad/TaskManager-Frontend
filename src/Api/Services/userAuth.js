import axios from '../Axios.js';

//login

export const UserLogin = async (email,password) =>{
    try{
        const response = await axios({
            url: "/api/auth/login",
            method: "post",
            data: {
                email,password
            }
         });
         const data = response
         if(data) return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}


export const UserSignup = async (email,password,name) =>{
    try{
        const response = await axios({
            url: "/api/auth/signup",
            method: "post",
            data: {
                email,password,name
            }
         });
         const data = response
         if(data) return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}