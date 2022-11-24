import Vue from "vue"
import VueRouter from "vue-router"

import Formulario from './components/FormularioReg.vue'
import FormularioL from './components/FormularioLogin.vue'
import Pagina from "./components/Pagina.vue"

Vue.use(VueRouter)


export const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/formulario", component: Formulario },
        { path: "/formularioL", component: FormularioL },
        { path: '/pagina', component: Pagina },
    ]
})
