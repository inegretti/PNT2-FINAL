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

        async ingresarUsuario(valor){
          console.warn('-------------------------------------')
          console.warn('dispatch -> ingreso de usuaro', new Date().toLocaleString())
          await this.$store.dispatch('ingresar',valor)
        },
        async ingresarUsuarios(valor){
          console.warn('-------------------------------------')
          console.warn('dispatch -> ingreso de lista usuarios a memoria', new Date().toLocaleString())
          await this.$store.dispatch('usuarios',valor)
        }
    },
    computed: {
       
    }    
}

Vue.mixin(miMixinGlobal)