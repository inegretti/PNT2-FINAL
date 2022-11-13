<template>
  <section class="src-componentes-navbar">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">To Do List</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/formulario">
        <a class="nav-link" href="#">Registracion</a>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/formularioL">
        <a class="nav-link" href="#">Login</a>
        </router-link>
      </li>
    </ul>
  </div>
</nav>
  </section>

</template>

<script >

  export default  {
    name: 'src-componentes-navbar',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-componentes-navbar {

  }
</style>
