<template>

  <section class="src-components-navegador">
    <NavBar />
    <router-view :res="usuarios" @envio-usuario="ingresarUsuarios($event)"></router-view>
  </section>

</template>

<script>
import NavBar from "./Navbar.vue"
export default {
  name: 'src-components-navegador',
  components: {
    NavBar
  },
  props: [],
  data() {
    return {
      usuarios: [],
      reg: ""
    }
  },

  methods: {
    async ingresarUsuarios(usuario) {
      await this.axios.post(this.$store.state.url,
        {
          nombre: usuario.nombre,
          contrasenia: usuario.contraseña,
          email: usuario.email,
          pendientes: [],
          finalizadas: [],
          enCurso: []
        })
    },
  },
  computed: {
  }
}

</script>
