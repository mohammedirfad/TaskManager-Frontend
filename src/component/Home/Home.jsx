import React, { useEffect } from 'react';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import { DeleteTodo, addTodo, completetodo, getTodos } from '../../Api/Services/taskMange';
import todoImage from '../../Assets/todo-image.jpeg'

function Home() {

    // const [statusInput, setStatusInput] = useState(true);
    const [content, setContent] = useState("");
    const [todos, setTodos] = useState([]);
    
    const token = useSelector(state => state?.userAuth?.token);
    const Name =useSelector(state => state?.userAuth?.name)
    const Navigate = useNavigate();
   

    useEffect(() => {
        //get-your-todo
    const GetTodos = async () => {
		try{
            const response = await getTodos(token);
        if(response?.status === 200){
            console.log(response);
            setTodos(response?.data?.tasks);
        } 
        }
        catch(err){
            console.log(err);
        }
	}

		GetTodos();
	}, [token]);


// //get-your-todo
//     const GetTodos = async () => {
// 		try{
//             const response = await getTodos(token);
//         if(response?.status === 200){
//             console.log(response);
//             setTodos(response?.data?.tasks);
//         } 
//         }
//         catch(err){
//             console.log(err);
//         }
// 	}

//-add-your-todo
   async function handleSubmit(e) {
        e.preventDefault();
  
        const taskText = content.trim();
        if (!taskText) {
           
          toast.error("Enter The task !")
        
    
          return setContent("");
        }

        try{
              if(!token){
         
               return Navigate('/login')
            }
            else{
                const response = await addTodo(content,token)
      
                if(response?.status === 200){
                    setTodos([...todos,response?.data?.savedTask])
                    setContent("")
                    toast.success(response?.data?.message)
                }
            }    
        }
        catch(err){
            console.log(err?.response?.data?.message);
        }
      }
 
// complete todo :
const completeTodo = async (id) => {
    try {
      const response = await completetodo(id, token);
  const updatedTodos = todos.map((todo) => {
        if (todo._id === response?.data?.tasks._id) {
          return { ...todo, completed:  !todo.completed };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error:', error);
    }
  };

//delete todo :
const deleteTodo = async (id) =>{
    try{
        console.log(id);
        const response = await DeleteTodo(id,token);
    setTodos(todos => todos.filter(todo => todo._id !== response?.data?.tasks?._id));

    }
    catch(error){
        console.error('Error:', error);
    }
}

  return (
    <>
    <div className='App'>
     
    <ToastContainer position='top-center'/>
      <div className='todos'>
        
    
    <div className="todo-container">


        <form className='form-style' onSubmit={handleSubmit}>
        <input className='input-box' placeholder='Enter the task' type='text' value={content} onChange={(e)=>setContent(e.target.value)}/>
<button className='input-button' type='submit'>Add</button>
   </form>

{
    todos.length > 0 ? todos?.map((todo) =>{
         return (
<div className={`todo ${todo.completed ? 'is-complete' : ''}`} key={todo._id} >
        <div className="checkbox"onClick={() => completeTodo(todo._id)}></div>
        <div className="text">{todo?.title}</div>
        <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>X</div>
      </div>
    )}): <div className=''>
        <p className='display'>Hey ! <span className='name'>{Name}</span> You currently have no tasks</p>
        <p className='img-display'><img src= "https://ouch-cdn2.icons8.com/VGdlqczqVokCME57m8K2CYx65qXfQQx3qJb187MjU1I/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTg4/Lzg2YTMxMTI2LTc4/NzktNDI4My05Yjky/LWYyMjliNDc0OGU4/NC5zdmc.png" alt='no task'></img></p>
        </div>
}
      
    </div>
  </div>
    
    </div>
    </>
  )
}

export default Home