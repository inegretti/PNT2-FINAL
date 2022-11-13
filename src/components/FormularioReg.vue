<template >

  <section class="src-components-formulario">
    <div class="jumbotron">
    <h1>Registracion</h1>
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
          <validate tag="label">
            <span>Email: </span>
            <input v-model="formData.email" name="email" type="email" required />
            <field-messages name="email" show="$dirty">
              <div slot="required">Complete el campo</div>
              <div slot="email">Email no valido</div>
            </field-messages>
          </validate>
        <br>
         <br>
    <button type="submit" class="btn btn-success" :disabled="formState.$invalid">Submit</button>
  </vue-form>

  <hr>
  <h1>{{mensaje}}</h1>
  
    </div>
  </section>

</template>

<script >

  export default  {
    name: 'src-components-formulario',
    props: [],
    mounted () {

    },
    data () {
      return {
        formState:{},
        formData:this.getDataInicial(),
        nombreMin:5,
        nombreMax:15,
        usuarios:new Array(),
        mensaje:""
       
        
      }
    },
    methods: {
      async enviar(){
        await this.$emit('ingreso-usuario',{nombre:this.formData.nombre,contraseña:this.formData.contraseña,email:this.formData.email})
        this.formData= this.getDataInicial()
        this.formState._reset()
        this.mensaje="ingreso correcto";
        setTimeout(() => {
          alert("redirijiendo a login")
        this.$router.push({path:"/formularioL"})  
        }, 2000);
        
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

  }
  .jumbotron{
    background-color: brown;
    color: black;
  }
  hr{
    background-color: black;
  }
</style>
