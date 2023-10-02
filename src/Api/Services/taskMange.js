import axios from '../Axios.js';


//Add-todo
export const addTodo = async (title,token) =>{
    console.log(token,title);
    try{
        const response = await axios({
            url: "/api/tasks/my",
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
              },
           
            data: {
                title
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


export const getTodos = async (token) =>{
    console.log(token,"token");
    try{
        const response = await axios({
            url: "/api/tasks/myTasks",
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
              },
           
           
         });
         const data = response
         if(data) return data;
    }
    catch(err){
        console.log(err);
        throw err
    }
}


export const completetodo = async (id,token) =>{
    console.log(token,"token");
    try{
        const response = await axios({
            url: "/api/tasks/complete",
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
              },
           data:{
            id
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


export const DeleteTodo = async (id,token) =>{
    console.log(token,"token");
    try{
        const response = await axios({
            url: "/api/tasks/delete",
            method: "delete",
            headers: {
                Authorization: `Bearer ${token}`,
              },
           data:{
            id
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
