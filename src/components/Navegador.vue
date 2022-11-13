<template>

  <section class="src-components-navegador">
   <NavBar/>
    <!--<router-view @envio-usuario="evaluar($event)" :res="usuarios" @ingreso-usuario="ingresarUsuarios($event)"></router-view>-->
    <router-view :res="usuarios" @ingreso-usuario="ingresarUsuarios($event)"></router-view>
  </section>

</template>

<script>
import NavBar from "./Navbar.vue"
  export default  {
    name: 'src-components-navegador',
    components: {
    NavBar
  },
    props: [],
    mounted () {

    },
    data () {
      return {
        usuarios:[],
        reg:""

      }
    },
    methods: {
     async ingresarUsuarios(usuario){
        await this.axios.post(this.$store.state.url, {nombre:usuario.nombre,contrasenia:usuario.contraseña,email:usuario.email,pendientes:[],finalizadas:[],enCurso:[]})
      },
      
    },
    computed: {
       
    }
}


</script>

<style scoped lang="css">
  .src-components-navegador {

  }
</style>
