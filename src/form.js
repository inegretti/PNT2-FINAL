/* importo vue y app*/
import Vue from "vue";
import VueForm from "vue-form"

//parametros personalizados.
let options={
    validators:{
        'no-espacios': function(value){
            return !value.includes(' ')
            //si no incluye espacios devuelve true pero el validador lo va a devolver como false para que no continue
        }
    }
}

//DE LA INSTANCIA IMPORTADA DE VUE QUE USE VUEFORM
Vue.use(VueForm,options)
            //se pasa el options de arriba como parametro
