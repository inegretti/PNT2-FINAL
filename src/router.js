import Vue from "vue"
import VueRouter from "vue-router"
import Formulario from './components/FormularioReg.vue'
import FormularioL from './components/FormularioLogin.vue'
import Pagina from "./components/Pagina.vue"
Vue.use(VueRouter)

//necesita definir las rutas.
export const router= new VueRouter({
    //el history almacena hasta 50 registro de cambio de pagina
    mode:"history", //navegacion tradicional /carpeta/archivo.js
    //esta la hash en la cual en la ultima instancia pone un #algo en el que va a buscar 
    //el elemento que coicida en la pagina.
    routes:[
        {path:"/formulario", component:Formulario},
        {path:"/formularioL", component:FormularioL},
        {path:'/pagina', component:Pagina},
    ]
})
