import Vue from 'vue'

const miMixinGlobal = {
  methods: {
    logIn() {
      this.$store.dispatch('logIn')
    },

    logOut() {
      this.$store.dispatch('logOut')
    },

    ingresarUsuario(valor) {
      this.$store.dispatch('ingresar', valor)
    },

    ingresarUsuarios(valor) {
      this.$store.dispatch('usuarios', valor)
    }
  },
  computed: {
  }
}

Vue.mixin(miMixinGlobal)