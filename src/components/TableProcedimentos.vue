<template>
  <div class="q-pa-md">
    <q-table
      title="Procedimentos"
      :data="procedimentos"
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

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
          <q-th>Remover</q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="green"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
          <q-td>
            <q-btn dense round flat color="grey" @click="deleteData(props.row.id)" icon="delete"></q-btn>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%" class="paciente-info">
            <div class="text-left">Parcelas do Paciente: {{ props.row.paciente }}.</div>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-markup-table>
              <thead>
                <tr>
                  <th class="text-left">Paciente</th>
                  <th class="text-left">Procedimento</th>
                  <th class="text-left">Vencimento</th>
                  <th class="text-left">Valor</th>
                  <th class="text-left">Pago</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="parcela in props.row.duplicata" :class="parcela.pago ? 'pay':'notpay' ">
                  <td>{{props.row.paciente}}</td>
                  <td>{{props.row.procedimento}}</td>
                  <td>{{parcela.vencimento}}</td>
                  <td>{{parcela.valor}}</td>
                  <td>
                    <q-toggle
                      :disable="parcela.pago"
                      @input="udateData(props.row)"
                      v-model="parcela.pago"
                      color="green"
                    />
                  </td>
                  <td>
                    <span v-if="parcela.pago">Parcela com pagamento realizado.</span>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
//import procedimento from '../procedimentos.json'

import { mapState } from "vuex";

export default {
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "data",
          align: "center",
          label: "Data",
          field: "data",
          sortable: true,
        },
        {
          name: "paciente",
          align: "left",
          label: "Paciente",
          field: "paciente",
          sortable: true,
        },
        {
          name: "procedimento",
          align: "left",
          label: "Procedimento",
          field: "procedimento",
          sortable: true,
        },
        {
          name: "valor_cirurgia",
          align: "right",
          label: "Valor Cirurgia",
          field: (row) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(parseFloat(row.valor_cirurgia)),
          sortable: true,
        },
        {
          name: "valor_outros",
          align: "right",
          label: "Acessorios",
          field: (row) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(parseFloat(row.valor_outros)),
          sortable: true,
        },

        {
          name: "valor_total",
          align: "right",
          label: "R$ Total",
          field: (row) =>
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(
              parseFloat(row.valor_outros) + parseFloat(row.valor_cirurgia)
            ),
          sortable: true,
        },
        {
          name: "forma_pgto",
          align: "right",
          label: "Forma Pagamento",
          field: "forma_pgto",
          sortable: true,
        },
        {
          name: "parcelas",
          align: "right",
          label: "Qnt. Parcelas",
          field: "parcelas",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapState("firedata", ["procedimentos"]),
  },
  created: function () {
    this.$store.dispatch("firedata/GetProcedimento", { vm: this });
  },
  methods: {
      deleteData(payload) {
        this.$store.dispatch("firedata/DeleteProcedimento", {vm: this, payload})
      },
      udateData(payload) {
        this.$store.dispatch("firedata/UpdateProcedimento", {vm : this, payload})
      }
  },
};
</script>

<style>
.pay {
  background: #b4f7b7;
  font: bold;
  color: blue;
}
.notpay {
  background: #fc90a2;
}
.paciente-info {
  font-size: 1.2em;
  color: orange;
  letter-spacing: 0.1em;
  background: black;
}
</style>