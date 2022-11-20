<template >

  <section class="src-components-formulario">
    <div class="jumbotron">
      <div v-show="validar">
    <h1>Login</h1>
    <hr>
    <hr>
    <br>
    <vue-form :state="formState" @submit.prevent="enviar()">
          <validate tag="div">
            <span>Nombre: </span>
            <input v-model="formData.nombre" required name="name" :minlength="this.$store.state.caracteresMin" :maxlength="this.$store.state.caracteresMax"/>
            <field-messages name="name" show="$dirty">
              <div slot="required">Complete el campo</div>
              <div slot="minlength">Este campo debe poseer al menos {{this.$store.state.caracteresMin}} caracteres</div>
              <div slot="maxlength">Este campo debe no puede poseer mas de {{this.$store.state.caracteresMax}} caracteres</div>
            </field-messages>
          </validate>
          <br>
          <validate tag="div">
            <span>Contraseña: </span>
            <input input v-model="formData.contraseña" required name="contraseña" :minlength="this.$store.state.caracteresMin" :maxlength="this.$store.state.caracteresMax"/>
            <field-messages name="contraseña" show="$dirty">
              <div slot="required">Complete el campo</div>
              <div slot="minlength">Este campo debe poseer al menos {{this.$store.state.caracteresMin}} caracteres</div>
              <div slot="maxlength">Este campo debe no puede poseer mas de {{this.$store.state.caracteresMax}} caracteres</div>
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
  </section>
</template>

<script >
//import Pagina from './Pagina.vue'

  export default  {
  components: {},
    name: 'src-components-formulario',
    props: ["res"],
    mounted () {

    },
    data () {
      return {
        formState:{},
        formData:this.getDataInicial(),
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
          //this.usuario=buscando
          this.$store.state.usuario=await buscando
          this.$store.state.usuarios=await this.usuarios
          console.log("res: "+this.$store.state.usuario.nombre)
              await this.logIn();
             //this.validar=false;
            await this.$router.push({path:"/pagina"}) 
           }
      },
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
      getDataInicial(){         
        return {
          nombre:null,
          email:null,
          contraseña:null
         }
      },
      //aca se elimina de la lista padre
      eliminar(valor){
        let res=this.usuarios.indexOf(valor)
        this.usuarios.splice(res, 1);
      }
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
