<template>
  <q-dialog :value="show" persistent>
    <q-card style="width: 500px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Adicionar atendente</div>
        <q-space />
        <q-btn icon="close" @click="$emit('closedialog')" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-input label="Atendente" v-model="atendente" />
      </q-card-section>
      <q-card-section>
        <div class="row q-pt-sm flex justify-center items-center content-center">
          <q-btn class="text-white bg-green-13" @click="addData">Adicionar</q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  props: ["show"],
  data() {
    return {
      atendente: ''
    }
  },
  methods: {
    addData() {
      let atendente = {}
      if (this.atendente)
        {
          atendente.nome = this.atendente
          this.$store.dispatch("firedata/AddAtendente", { vm: this, payload: atendente });
        }
          
    }
  }
}
</script>

<style scoped>
</style>