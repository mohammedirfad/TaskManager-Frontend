import {createSlice  } from "@reduxjs/toolkit";



const initialState = {
    user: null,
    name: null,
    token: null,
    id :null,
    Email:null, 
    
};

const authSlice = createSlice({
    name:"userAuth",
    initialState,
    reducers :{
        setLogin : (state, action) => {
            state.name = action.payload.name;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.Email = action.payload.imageUrl;
            
        },

        setLogout : (state) => {
            state.user = null;
            state.token = null;
            state.id = null;
            state.name = null;
            state.Email = null;
          
        },
    },
   
});

export const {setLogin, setLogout} = authSlice.actions;

export default authSlice;