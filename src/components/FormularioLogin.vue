<template>
  <section class="src-components-formulario">
    <div class="jumbotron">
      <h1>Login</h1>
      <hr />
      <hr />
      <br />

      <vue-form :state="formState" @submit.prevent="enviar()">
        <validate tag="div">
          <span>Nombre: </span>
          <input name="name" v-model="formData.nombre" required :minlength="this.$store.state.caracteresMin"
            :maxlength="this.$store.state.caracteresMax" />

          <field-messages name="name" show="$dirty">
            <div slot="required">Complete el campo</div>
            <div slot="minlength">
              Este campo debe poseer al menos
              {{ this.$store.state.caracteresMin }} caracteres
            </div>
            <div slot="maxlength">
              Este campo no puede poseer mas de
              {{ this.$store.state.caracteresMax }} caracteres
            </div>
          </field-messages>
        </validate>
        <br />

        <validate tag="div">
          <span>Contraseña: </span>
          <input name="contraseña" v-model="formData.contraseña" required :minlength="this.$store.state.caracteresMin"
            :maxlength="this.$store.state.caracteresMax" />

          <field-messages name="contraseña" show="$dirty">
            <div slot="required">Complete el campo</div>
            <div slot="minlength">
              Este campo debe poseer al menos
              {{ this.$store.state.caracteresMin }} caracteres
            </div>
            <div slot="maxlength">
              Este campo no puede poseer mas de
              {{ this.$store.state.caracteresMax }} caracteres
            </div>
          </field-messages>
        </validate>
        <br />
        <button type="submit" class="btn btn-success" :disabled="formState.$invalid">Confirmar</button>
      </vue-form>

      <hr />
      <h3 :class="{ success: ingresoOk, fail: !ingresoOk }">
        {{ mensaje }}
      </h3>
      <hr />
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  name: "src-components-formulario",
  props: [],
  data() {
    return {
      formState: {},
      formData: this.getDataInicial(),
      usuarios: [],
      mensaje: "",
      ingresoOk: true,
    };
  },
  
  methods: {
    async enviar() {
      await this.axios(this.$store.state.url)
        .then((respuesta) => {
          this.usuarios = respuesta.data;
        })
        .catch((error) => console.error(error));

      const buscando = this.usuarios.find(
        (element) =>
          element.nombre == this.formData.nombre &&
          element.contrasenia == this.formData.contraseña
      );

      if (buscando == undefined) {
        this.formData = this.getDataInicial();
        this.mensaje = "Usuario o Contraseña incorrecta";
        this.ingresoOk = false;
        this.formState._reset();
      } else {
        this.ingresarUsuario(buscando);
        this.ingresarUsuarios(this.usuarios);
        this.logIn();
        this.$router.push({ path: "/pagina" });
      }
    },

    getDataInicial() {
      return {
        nombre: null,
        email: null,
        contraseña: null,
      };
    },

    //aca se elimina de la lista padre
    eliminar(valor) {
      let res = this.usuarios.indexOf(valor);
      this.usuarios.splice(res, 1);
    },
  },
  computed: {},
};

</script>

<style scoped lang="css">
.src-components-formulario {
  display: flex;
  justify-content: center;
}

.jumbotron {
  background-color: #0873c4;
  color: white;
  width: auto;
  margin-top: 50px;
}

hr {
  background-color: #054678;
}

.success {
  background-color: #0a90f7;
  color: white;
  border-radius: 6px;
}

.fail {
  background-color: red;
  color: white;
  border-radius: 6px;
}

</style>
