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
       
    }    
}

Vue.mixin(miMixinGlobal)