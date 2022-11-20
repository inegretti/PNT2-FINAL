//import { resolve } from 'core-js/fn/promise'
import Vue from 'vue'
import Vuex from 'vuex'
import "./axios"

Vue.use(Vuex)
const delay = ms => new Promise( (resolve, reject) => {
    if(typeof ms == 'number') {
        setTimeout(resolve,ms)
    }
    else {
        reject('ms no es un número')
    }
})

export default new Vuex.Store({
    state:{
        url:"https://634271f73f83935a78433ad7.mockapi.io/users",
        caracteresMin:5,//esto se repetia en los formularios
        caracteresMax:15, //por ello lo pase aca.
        loggedIn: false,
        usuario:"",
        usuarios:[]
        
     },
     actions:{ 
        async logIn({commit}) {
            console.warn('actions -> LogIn', new Date().toLocaleString())    
            try {
                await delay(1000)
                commit('logIn', true)        
            }
            catch(error) {
                console.error(error)
            }
        },
        async logOut({commit}) {
            console.warn('actions -> LogOut', new Date().toLocaleString())    
            try {
                await delay(1000)
                commit('logOut', false)        
            }
            catch(error) {
                console.error(error)
            }
        },
        async ingresar({commit},valor){
            
            commit("ingreso",valor)
        },
        async usuarios({commit},valor){
            
            commit("ingresoUsuarios",valor)
        }           
    },
    mutations:{ 
        logIn(state, bool) {
            console.warn('mutations -> logIn', bool, new Date().toLocaleString()) 
            state.loggedIn = bool
        },
        logOut(state, bool) {
            console.warn('mutations -> logOut',  bool, new Date().toLocaleString()) 
            state.loggedIn = bool
        },
        ingreso(state,valor){
            state.usuario=valor;
        },
        ingresoUsuarios(state,valor){
            state.usuarios=valor;
        }
    }
})