import Vue from 'vue'

const miMixinGlobal = {
    methods: {
       async logIn() {
          //this.contador--
          console.warn('-------------------------------------')
          console.warn('dispatch -> logIn', new Date().toLocaleString())
         await this.$store.dispatch('logIn')
        },
        async logOut() {
            //this.contador--
            console.warn('-------------------------------------')
            console.warn('dispatch -> logOut', new Date().toLocaleString())
            await this.$store.dispatch('logOut')
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