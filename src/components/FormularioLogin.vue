<template >

  <section class="src-components-formulario">
    <div class="jumbotron">
      <div v-show="!this.$store.state.loggedIn" @reset-session="resetSession($event)">
    <h1 >Login</h1>
    <hr>
    <hr>
    <br>
    <vue-form :state="formState" @submit.prevent="enviar()">
          <validate tag="div">
            <span>Nombre: </span>
            <input v-model="formData.nombre" required name="name" :minlength="nombreMin" :maxlength="nombreMax"/>
            <field-messages name="name" show="$dirty">
              <div slot="required">Complete el campo</div>
              <div slot="minlength">Este campo debe poseer al menos {{nombreMin}} caracteres</div>
              <div slot="maxlength">Este campo debe no puede poseer mas de {{nombreMax}} caracteres</div>
            </field-messages>
          </validate>
          <br>
          <validate tag="div">
            <span>Contraseña: </span>
            <input v-model="formData.contraseña" required name="contraseña" :minlength="nombreMin" :maxlength="nombreMax"/>
            <field-messages name="contraseña" show="$dirty">
              <div slot="required">Complete el campo</div>
              <div slot="minlength">Este campo debe poseer al menos {{nombreMin}} caracteres</div>
              <div slot="maxlength">Este campo debe no puede poseer mas de {{nombreMax}} caracteres</div>
            </field-messages>
          </validate>
          <br>
    <button type="submit" class="btn btn-success" :disabled="formState.$invalid">Submit</button>
  </vue-form>
  <hr>
  <h3 :class="{ success: ingresoOk, fail: !ingresoOk }">
    {{mensaje}}
  </h3>
  <hr>
  </div>
    </div>

  

    <div v-if="this.$store.state.loggedIn">
    <Pagina :reg="this.usuario"/>
    <button @click = "resetSession()">Resetear Session</button>
     </div>

     <div v-else>
      {{ redirectToLogIn() }}
     </div>

  </section>



</template>

<script >
import Pagina from './Pagina.vue'

  export default  {
  components: { Pagina },
    name: 'src-components-formulario',
    props: ["res"],
    mounted () {

    },
    data () {
      return {
        formState:{},
        formData:this.getDataInicial(),
        nombreMin:5,
        nombreMax:15,
        usuarios:[],
        mensaje:"",
        validar:true,
        usuario:"",
        ingresoOk: true
      }
    },
    methods: {
      async enviar(){
        await this.axios(this.$store.state.url).then(respuesta=>{this.usuarios=respuesta.data}).catch(error=>console.error(error))
        const buscando = await this.usuarios.find(element => element.nombre == this.formData.nombre && element.contrasenia == this.formData.contraseña);
        if(buscando == undefined){
          console.log("entro por el ok")
          this.formData= this.getDataInicial()
              this.mensaje="Error Usuario o Contraseña equivocada"
              this.ingresoOk= false
              this.formState._reset()
              
        }else{
          console.log("entro por el no ok")
          this.usuario=buscando
             this.logIn();
             console.log(this.$store.state.loggedIn)
           }
      },

      redirectToLogIn() {
        this.$router.push({path:"/formularioL"})  
      },

      /*
       async evaluarResultado(){
        if(this.res.nombre === undefined){
          console.log("entro por el ok")
          this.formData= this.getDataInicial()
              this.mensaje="Error Usuario o Contraseña equivocada"
              this.formState._reset()
              
        }else{
          console.log("entro por el no ok")
          this.validar=false;
           }
           
      },
*/

      resetSession() {
            console.log("Entro al reset de Formulario LogIn")
            this.formData = this.getDataInicial()
            this.logOut()
            this.formState._reset()
            console.log(this.$store.state.loggedIn)
          },

      getDataInicial(){
         
        return {
          nombre:null,
          email:null,
          contraseña:null
         }
      },
      
    },
    computed: {
      
    }
}


</script>

<style scoped lang="css">
  .src-components-formulario {
    display: flex;
    justify-content: center;
  }
  .jumbotron{
    background-color: #0873C4;
    color: white;
    width: auto;
    margin-top: 50px;
  }

  hr{
    background-color: #054678;
  }

  .success{
    background-color: #0A90F7;
    color: white;
    border-radius: 6px;
  }

  .fail{
    background-color: red;
    color: white;
    border-radius: 6px;
  }

</style>
