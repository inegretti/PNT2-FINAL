<template >

  <section class="src-components-formulario">
    <div class="jumbotron">
      <h1>Registro</h1>
      <hr>
      <hr>
      <br>

      <vue-form :state="formState" @submit.prevent="enviar()">
        <validate tag="div">
          <span>Nombre: </span>
          <input name="name" v-model="formData.nombre" required :minlength="this.$store.state.caracteresMin"
            :maxlength="this.$store.state.caracteresMax" />

          <field-messages name="name" show="$dirty">
            <div slot="required">Complete el campo</div>
            <div slot="minlength">Este campo debe poseer al menos {{ this.$store.state.caracteresMin }} caracteres</div>
            <div slot="maxlength">Este campo debe no puede poseer mas de {{ this.$store.state.caracteresMax }}
              caracteres
            </div>
          </field-messages>
        </validate>
        <br>

        <validate tag="div">
          <span>Contraseña: </span>
          <input name="contraseña" v-model="formData.contraseña" required :minlength="this.$store.state.caracteresMin"
            :maxlength="this.$store.state.caracteresMax" no-espacios/>

          <field-messages name="contraseña" show="$dirty">
            <div slot="required">Complete el campo</div>
            <div slot="minlength">Este campo debe poseer al menos {{ this.$store.state.caracteresMin }} caracteres</div>
            <div slot="maxlength">Este campo no puede poseer mas de {{ this.$store.state.caracteresMax }} caracteres
            </div>
            <div slot='no-espacios'>Este campo no puede contener espacios vacios</div>
          </field-messages>
        </validate>
        <br>

        <validate tag="label">
          <span>Email: </span>
          <input name="email" type="email" v-model="formData.email" required />
          <field-messages name="email" show="$dirty">
            <div slot="required">Complete el campo</div>
            <div slot="email">Email no valido</div>
          </field-messages>
        </validate>
        <br>
        <br>
        <button type="submit" class="btn btn-success" :disabled="formState.$invalid">Confirmar</button>
      </vue-form>

      <hr>
      <h3 :class="{ success: ingresoOk, fail: !ingresoOk }">
        {{ mensaje }}
      </h3>

    </div>
  </section>

</template>

<script >

export default {
  name: 'src-components-formulario',
  props: [],
  data() {
    return {
      formState: {},
      formData: this.getDataInicial(),
      mensaje: "",
      ingresoOk: true
    }
  },

  methods: {
    async enviar() {
      await this.axios(this.$store.state.url)
        .then(respuesta => { this.ingresarUsuarios(respuesta.data) })
        .catch(error => console.error(error))
      let ele = this.$store.state.usuarios.find(element => element.email == this.formData.email);

      if (ele == undefined) {
        ele = this.$store.state.usuarios.find(element => element.nombre == this.formData.nombre);

        if (ele == undefined) {
          this.$emit('envio-usuario',
            {
              nombre: this.formData.nombre,
              contraseña: this.formData.contraseña,
              email: this.formData.email
            })

          this.formData = this.getDataInicial()
          this.formState._reset()
          this.mensaje = "Ingreso correcto";
          this.ingresoOk = true;

          setTimeout(() => {
            alert("Redirigiendo al inicio de sesion")
            this.$router.push({ path: "/formularioL" })
          }, 1000);
        } else {
          this.mensaje = "Ya existe un usuario con este nombre"
          this.formData = this.getDataInicial()
          this.formState._reset()
        }
      } else {
        this.mensaje = "Este email ya ha sido registrado"
        this.formData = this.getDataInicial()
        this.formState._reset()
      }
    },
    getDataInicial() {
      return {
        nombre: null,
        email: null,
        contraseña: null
      }
    },
  },
  computed: {}
}

</script>

<style scoped lang="css">
.src-components-formulario {
  display: flex;
  justify-content: center;
}

.jumbotron {
  background-color: #054678;
  color: white;
  width: 500px;
  margin-top: 50px;
}

.success {
  background-color: #0A90F7;
  color: white;
  border-radius: 6px;
}

.fail {
  background-color: red;
  color: white;
}

hr {
  background-color: #55B2F9;
}
</style>
