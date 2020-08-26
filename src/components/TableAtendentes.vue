<template>
  <div class="q-pa-md">
    <q-table
      style="width: 500px"
      title="Atendentes"
      :data="atendente"
      :columns="columns"
      row-key="id"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Localizar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

       <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense round flat color="grey" @click="deleteRow(props)" icon="delete"></q-btn>
          </q-td>          
        </template>  

    </q-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "nome",
          align: "left",
          label: "Nome",
          field: "nome",
          sortable: true,
        },
        { name: 'actions', label: 'Actions', field: '', align:'center' },
      ],
    };
  },
  computed: {
    ...mapState("firedata", ["atendente"]),
  },
  created: function () {
    this.$store.dispatch("firedata/GetProcedimento", { vm: this });
  },
  methods: {
    deleteRow(payload) {
      console.log(payload)
      this.$store.dispatch("firedata/DeleteAtendente", { vm: this, payload });
    }
  },
};
</script>

<style>
</style>