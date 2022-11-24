//Quiza se puede sacar los async de aca
import Vue from 'vue'
import Vuex from 'vuex'
import "./axios"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        url:"https://634271f73f83935a78433ad7.mockapi.io/users",
        caracteresMin:5,
        caracteresMax:15, 
        loggedIn: false,
        usuario:"",
        usuarios:[]
     },

     actions:{ 
        logIn( { commit } ) {
            try {
                commit('logIn', true)        
            }
            catch(error) {
                console.error(error)
            }
        },

        logOut( { commit } ) {
            try {
                commit('logOut', false)        
            }
            catch(error) {
                console.error(error)
            }
        },
        ingresar( { commit }, valor){
            try {
                commit("ingreso",valor)
            } catch(error) {
                console.error(error)
            }
        },

        usuarios( { commit }, valor){
            try {
                commit("ingresoUsuarios", valor)
            } catch(error) {
                console.error(error)
            }
        }           
    },
    
    mutations:{ 
        logIn(state, bool) {
            state.loggedIn = bool
        },
        logOut(state, bool) {
            state.loggedIn = bool
        },
        ingreso(state, valor){
            state.usuario = valor;
        },
        ingresoUsuarios(state, valor){
            state.usuarios = valor;
        }
    }
})

