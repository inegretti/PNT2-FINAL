<template>
  <section class="src-components-pagina">
    <h3>Bienvenido {{ this.$store.state.usuario.nombre }}</h3>
    <div v-show="esAdmin" :style="{ 'background-color': 'lightsteelblue', 'border': '1px solid black' }">
      <h2>{{ "Usuarios" }}</h2>
      <div class="task-box" v-for="(usuario, index) in this.$store.state.usuarios" :key="index">
        <p>{{ usuario }}</p>
        <button class="button-finalizar" value="act" @click="eliminarUsuario(usuario)">Dar de Baja</button>
      </div>
      <br>
    </div>
    <br>


    <h4>Tareas</h4>
    <div class="main-container" :style="{
      'background-color': 'lightsteelblue', 'margin': 'auto',
      'width': '50%',
      'padding': '10px'
    }">
      <div>
        <h5>Pendientes</h5>
        <div class="task-box" v-for="(tareaC, index) in this.$store.state.usuario.pendientes" :key="index">
          <p>{{ tareaC }}</p>
          <button class="button-finalizar" value="act" @click="finalizar($store.state.usuario, tareaC)">
            Finalizar
          </button>
          <button class="button-encursar" value="act" @click="encursar($store.state.usuario, tareaC)">
            Encursar
          </button>
          <button class="button-finalizar" value="act" @click="borrar($store.state.usuario, tareaC)">
            Borrar
          </button>
        </div>
      </div>

      <div>
        <h5>En curso</h5>
        <div class="task-box" v-for="(tareaC, index) in this.$store.state.usuario.enCurso" :key="index">
          <p>{{ tareaC | pasarAMayuscula }}</p>
          <button class="button-finalizar" value="act"
            @click="finalizar($store.state.usuario, tareaC)">Finalizar</button>
        </div>
      </div>
      <div>
        <h5>Finalizadas</h5>
        <div class="task-box" v-for="(tareaF, index) in this.$store.state.usuario.finalizadas" :key="index">
          <p style="text-decoration-line: line-through">{{ tareaF }}</p>
        </div>
      </div>
    </div>

    <br />
    <vue-form :state="formState" @submit.prevent="ingresar($store.state.usuario)">
      <validate tag="div">
        <span>Ingresar nueva actividad: </span>
        <input v-model="formData.texto" required name="name" :minlength="this.$store.state.caracteresMin" />

        <field-messages name="name" show="$dirty">
          <div slot="required">Complete el campo</div>
          <div slot="minlength">
            Este campo debe poseer al menos
            {{ this.$store.state.caracteresMin }} caracteres
          </div>
        </field-messages>
      </validate>
      <br />
      <button type="submit" class="btn btn-success" :disabled="formState.$invalid">
        Confirmar
      </button>
    </vue-form>
    <br>
    <button class="button-finalizar" value="act" @click="desloguarse()">Cerrar sesion</button>
  </section>
</template>

<script>
export default {
  name: "src-components-pagina",
  props: ["usuarios"],
  beforeMount() {
    this.us = this.usuarios;
  },
  mounted() {
    if (this.$store.state.loggedIn == false) {
      history.back();
    }
  },
  data() {
    return {
      formState: {},
      formData: this.getDataInicial(),
      us: [],
    };
  },

  methods: {
    getDataInicial() {
      return {
        texto: null,
      };
    },

    async encursar(valor, tarea) {
      const er = valor.pendientes.indexOf(tarea);
      valor.pendientes.splice(er, 1);
      valor.enCurso.push(tarea);
      const borrar = this.$store.state.url + "/" + valor.id;

      await this.axios.put(borrar, {
        nombre: valor.nombre,
        contrasenia: valor.contrasenia,
        email: valor.email,
        pendientes: valor.pendientes,
        enCurso: valor.enCurso,
        finalizadas: valor.finalizadas,
      });
    },

    async finalizar(valor, tarea) {
      let er;
      if (valor.pendientes.indexOf(tarea) != -1) {
        er = valor.pendientes.indexOf(tarea);
        valor.pendientes.splice(er, 1);
        valor.finalizadas.push(tarea);
      } else {
        er = valor.enCurso.indexOf(tarea);
        valor.enCurso.splice(er, 1);
        valor.finalizadas.push(tarea);
      }

      const borrar = this.$store.state.url + "/" + valor.id;
      await this.axios.put(borrar, {
        nombre: valor.nombre,
        contrasenia: valor.contrasenia,
        email: valor.email,
        pendientes: valor.pendientes,
        enCurso: valor.enCurso,
        finalizadas: valor.finalizadas,
      });
    },

    async ingresar(valor) {
      const borrar = this.$store.state.url + "/" + valor.id;
      valor.pendientes.push(this.formData.texto);

      await this.axios.put(borrar, {
        nombre: valor.nombre,
        contrasenia: valor.contrasenia,
        email: valor.email,
        pendientes: valor.pendientes,
      });

      this.formData = this.getDataInicial();
      this.formState._reset();
    },

    async borrar(valor, tarea) {
      let er;
      if (valor.pendientes.indexOf(tarea) != -1) {
        er = valor.pendientes.indexOf(tarea);
        valor.pendientes.splice(er, 1);
      } else {
        er = valor.enCurso.indexOf(tarea);
        valor.enCurso.splice(er, 1);
      }

      const borrar = this.$store.state.url + "/" + valor.id;
      await this.axios.put(borrar, {
        nombre: valor.nombre,
        contrasenia: valor.contrasenia,
        email: valor.email,
        pendientes: valor.pendientes,
        enCurso: valor.enCurso,
        finalizadas: valor.finalizadas,
      });
    },

    async eliminarUsuario(usuario) {
      const borrar = this.$store.state.url + "/" + usuario.id;
      await this.axios
        .delete(borrar)
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.response);
        });

      const us = this.$store.state.usuarios.indexOf(usuario);
      this.$store.state.usuarios.splice(us, 1);
      this.$emit("eliminar", usuario); 
    },

    desloguarse() {
      this.logOut();
      this.$router.push({ path: "/formularioL" });
    },
  },
  computed: {
    esAdmin() {
      let res = this.$store.state.usuario.nombre == "admin";
      return res;
    },
  },
};

</script>

<style scoped lang="css">
.src-components-pagina {}
.main-container {
  display: flex;
  width: 800px;
  justify-content: space-around;
  color: #054678;
  background-color: white;
  border-radius: 4px;
  padding: 10px 0;
}
.task-box {
  border-radius: 4px;
  padding: 10px;
  margin: 5px 0;
  background-color: rgb(234, 229, 229);
}
.button-encursar {
  border: none;
  background-color: #55b2f9;
  border-radius: 12px;
  margin: 0 5px;
  color: black;
}
.button-encursar:hover {
  box-shadow: 0px 10px 13px -7px #295678,
    1px 1px 1px 5px rgba(255, 255, 255, 0.13);
}
.button-finalizar {
  border: none;
  background-color: #295678;
  border-radius: 12px;
  margin: 0 5px;
  color: white;
}
.button-finalizar:hover {
  box-shadow: 0px 10px 13px -7px #295678,
    1px 1px 1px 5px rgba(255, 255, 255, 0.13);
}

</style>
