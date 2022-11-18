import Vue from 'vue'

const miMixinGlobal = {
    methods: {
        logIn() {
          //this.contador--
          console.warn('-------------------------------------')
          console.warn('dispatch -> logIn', new Date().toLocaleString())
          this.$store.dispatch('logIn')
        },
        logOut() {
            //this.contador--
            console.warn('-------------------------------------')
            console.warn('dispatch -> logOut', new Date().toLocaleString())
            this.$store.dispatch('logOut')
          },
    },
    computed: {
        /*
        mostrarContadorVuex() {
            let contador = this.$store.state.contador
            console.error('mostrarContadorVuex mixin', contador)
            return contador
        }
        */
    }    
}

Vue.mixin(miMixinGlobal)