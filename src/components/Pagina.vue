<template>

  <section class="src-components-pagina">
    <h1>Bienvenido {{this.reg.nombre}}</h1>
    
    <div >
      <h1>Finalizadas</h1>
      <div v-for="(tareaF,index) in this.reg.finalizadas" :key="index">
        <h2 style="text-decoration-line: line-through">{{tareaF}}</h2>
      </div>
    
    </div>
    <br>
    <div >
      <h1>En curso</h1>
        <div v-for="(tareaC,index) in this.reg.enCurso" :key="index">
        <h2>{{tareaC}}</h2>
        <button  value=act  @click="finalizar(reg,tareaC)"> finalizar </button>
        </div>
    </div>
    <br>
    <div >
      <h1>Pendientes</h1>
   <div v-for="(tareaC,index) in this.reg.pendientes" :key="index">
        <h2>{{tareaC}}</h2>
        <button value=act @click="finalizar(reg,tareaC)"> finalizar </button>
        <button value=act @click="encursar(reg,tareaC)"> encursar </button>
        </div>
    </div>
  <br>
   <vue-form :state="formState" @submit.prevent="ingresar(reg)">
          <validate tag="div">
            <span>Ingresar nueva actividad: </span>
            <input v-model="formData.texto" required name="name" :minlength="3" />
            <field-messages name="name" show="$dirty">
              <div slot="required">Complete el campo</div>
              <div slot="minlength">Este campo debe poseer al menos 3 caracteres</div>
            </field-messages>
          </validate>
          <br>
    <button type="submit" class="btn btn-success" :disabled="formState.$invalid">Submit</button>
  </vue-form>

  </section>

</template>

<script>

  export default  {
    name: 'src-components-pagina',
    props: ["reg","val"],
    mounted () {
        if(this.val!=true){
          history.back()
        }
    },
    data () {
      return {
        //url:"https://634271f73f83935a78433ad7.mockapi.io/users",
        formState:{},
        formData:this.getDataInicial(),
        caracteresMin:10
      }
    },
    methods: {
      sumar(){
        this.axios.put
      },
      getDataInicial(){
         return {
          texto:null,
         }
      },
     async encursar(valor,tarea){
      console.log("tarea "+tarea+" "+typeof(tarea))
      const er=valor.pendientes.indexOf(tarea);
      valor.pendientes.splice(er, 1);
      console.log("er: "+er)
        await valor.enCurso.push(tarea)
        const borrar=this.$store.state.url+"/"+valor.id
        
        this.axios.put(borrar,{nombre:valor.nombre,contrasenia:valor.contrasenia,email:valor.email,pendientes:valor.pendientes,enCurso:valor.enCurso,finalizadas:valor.finalizadas})

      },
      async finalizar(valor,tarea){
        let er;
        if(valor.pendientes.indexOf(tarea)!=-1){
        er=valor.pendientes.indexOf(tarea);
        console.log("er "+er)
        valor.pendientes.splice(er, 1);
        await valor.finalizadas.push(tarea)
        }else{
        er=valor.enCurso.indexOf(tarea);
        console.log("er "+er)
        valor.enCurso.splice(er, 1);
        await valor.finalizadas.push(tarea)
        }
        //const er=valor.enCurso.indexOf(tarea);
        //console.log("er "+er)
        //valor.enCurso.splice(er, 1);
        //console.log("pendientes "+valor.enCurso)
        //await valor.finalizadas.push(tarea)
        const borrar=this.$store.state.url+"/"+valor.id
        this.axios.put(borrar,{nombre:valor.nombre,contrasenia:valor.contrasenia,email:valor.email,pendientes:valor.pendientes,enCurso:valor.enCurso,finalizadas:valor.finalizadas})
        console.log(valor)
      },
      async ingresar(valor){
        console.log("validar "+this.val)
        console.log("reg "+this.reg.nombre+" "+typeof(this.reg.nombre))
        const borrar=this.$store.state.url+"/"+valor.id
        await valor.pendientes.push(this.formData.texto)
        await this.axios.put(borrar,{nombre:valor.nombre,contrasenia:valor.contrasenia,email:valor.email,pendientes:valor.pendientes})
        this.formData=this.getDataInicial()
        this.formState._reset()
      }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-pagina {

  }
</style>
