<template>
  <section class="src-components-pagina">
    <h3>Bienvenido {{ this.reg.nombre }}</h3>

    <div class="main-container">
      <div>
        <h5>Pendientes</h5>
        <div class="task-box" v-for="(tareaC, index) in this.reg.pendientes" :key="index">
          <p>{{ tareaC }}</p>
          <button class="button-finalizar" value="act" @click="finalizar(reg, tareaC)">Finalizar</button>
          <button class="button-encursar" value="act" @click="encursar(reg, tareaC)">Encursar</button>
        </div>
      </div>
       <div>
        <h5>En curso</h5>
        <div class="task-box" v-for="(tareaC, index) in this.reg.enCurso" :key="index">
          <p>{{ tareaC }}</p>
          <button class="button-finalizar" value="act" @click="finalizar(reg, tareaC)">Finalizar</button>
        </div>
      </div>
      <div>
        <h5>Finalizadas</h5>
        <div class="task-box" v-for="(tareaF, index) in this.reg.finalizadas" :key="index">
          <p style="text-decoration-line: line-through">{{ tareaF }}</p>
        </div>
      </div>    
    </div>

    <br />
    <vue-form :state="formState" @submit.prevent="ingresar(reg)">
      <validate tag="div">
        <span>Ingresar nueva actividad: </span>
        <input v-model="formData.texto" required name="name" :minlength="3" />
        <field-messages name="name" show="$dirty">
          <div slot="required">Complete el campo</div>
          <div slot="minlength">
            Este campo debe poseer al menos 3 caracteres
          </div>
        </field-messages>
      </validate>
      <br />
      <button
        type="submit"
        class="btn btn-success"
        :disabled="formState.$invalid"
      >
        Submit
      </button>
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
  .main-container{
    display: flex;
    width: 800px;
    justify-content: space-around;
    color: #054678;
    background-color: white;
    border-radius: 4px;
    padding: 10px 0;
  }

  .task-box{
    border-radius: 4px;
    padding: 10px;
    margin: 5px 0;
    background-color: rgb(234, 229, 229);
  }

  .button-encursar {
    border: none;
    background-color: #55B2F9;
    border-radius: 12px;
    margin: 0 5px;
    color: black;
  }

  .button-encursar:hover{
    box-shadow: 0px 10px 13px -7px #295678, 1px 1px 1px 5px rgba(255,255,255,0.13);

  }

  .button-finalizar {
    border: none;
    background-color: #295678;
    border-radius: 12px;
    margin: 0 5px;
    color: white;
  }

  .button-finalizar:hover{
    box-shadow: 0px 10px 13px -7px #295678, 1px 1px 1px 5px rgba(255,255,255,0.13);

  }

</style>
