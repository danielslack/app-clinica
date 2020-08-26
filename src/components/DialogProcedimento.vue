<template>
  <q-dialog :value="show" persistent>
    <q-card style="width: 500px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Adicionar procedimento</div>
        <q-space />
        <q-btn icon="close" @click="$emit('closedialog')" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col">
            <q-input v-model="paciente" label="Paciente" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-input v-model="procedimento" label="Procedimento" />
          </div>
        </div>

        <div class="row flex justify-center items-center content-center">
          <div class="col">
            <div class="q-gutter-sm" style="max-width: 130px">
              <div class="row ">
                <div class="col">
                  <datainput :data.sync="datalanc" />
                </div>
              </div>
            </div>
          </div>
          <div class="col q-pb-sm">
            <q-input
              v-model="vcirurgia"
              v-on:keyup="inputkey($event)"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
              label="Valor Cirurgia"
            />
          </div>

          <div class="col q-pb-sm">
            <q-input
              v-model="voutros"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
              label="Valor Acessórios"
            />
          </div>
        </div>

        <div class="row q-pt-sm flex justify-center items-center content-center">
          <div class="col-6">
            <q-select
              v-model="formapgto"
              :options="opcoespgto"
              label="Forma de Pagamento"
              style="max-width: 200px"
            />
          </div>
          <div class="col-6 q-pt-md">
            <q-slider
              v-model="qntparcelas"
              :min="1"
              :max="10"
              :step="1"
              label
              :label-value="qntparcelas + ' parcelas'"
              label-always
              color="light-green"
            />
          </div>
        </div>

        <div class="row q-pt-sm flex justify-center items-center content-center">
          <div class="col">
            <q-select
              v-model="vatendente"
              :options="getAtendente"
              label="Atendente"
              style="max-width: 200px"
            />
          </div>
          <div class="col-6 q-pt-md">
            <q-slider
              v-model="comissao"
              :min="0"
              :max="100"
              :step="1"
              label
              :label-value="comissao + '%'"
              label-always
              color="light-green"
            />
          </div>
        </div>
        <div class="row q-pt-sm flex justify-center items-center content-center">
          <div class="col-6 q-pa-sm">
            <q-chip square size="14px">
              <q-avatar icon="fa fa-shopping-basket" color="green" text-color="white" />
              Total: {{total | currency}}
            </q-chip>
          </div>

          <div class="col-6 q-pa-sm">
            <q-chip square size="14px">
              <q-avatar icon="fa fa-money-bill-alt" color="green" text-color="white" />
              {{qntparcelas}} Parcelas de {{vparcelas | currency}}
            </q-chip>
          </div>
        </div>
        <div class="row q-pt-sm flex justify-center items-center content-center">
          <q-btn class="text-white bg-green-13" @click="addProccess">Adicionar procedimento</q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: ["show"],
  components: {
    datainput: require("../components/DataInput.vue").default,
  },
  filters: {
    currency: function (value) {
      if (!value) return "";
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
  },
  computed: {
    total() {
      return (parseFloat(this.voutros) + parseFloat(this.vcirurgia)).toFixed(2);
    },
    vparcelas() {
      return parseFloat(this.total / this.qntparcelas).toFixed(2);
    },
    vcomissao() {
      return parseFloat(this.comissao / 100) * parseFloat(this.voutros);
    },
    ...mapState("firedata", ["atendente"]),
    ...mapGetters('firedata',['getAtendente'])
  },
  created() {},
  methods: {
    inputkey(e) {
      // e
    },
    addProccess() {
      let process = {};
      process.data = this.datalanc;
      process.paciente = this.paciente;
      process.procedimento = this.procedimento;
      process.valor_cirurgia = this.vcirurgia;
      process.valor_outros = this.voutros;
      process.forma_pgto = this.formapgto;
      process.parcelas = this.qntparcelas;
      process.comissao = this.vcomissao;
      process.atendente = this.vatendente;
      process.duplicata = [];

      for (let i = 1; i <= this.qntparcelas; i++) {
        let vencimento = this.$moment(this.datalanc, "DD/MM/YYYY")
          .add(i, "months")
          .format("DD/MM/YYYY");
        process.duplicata.push({
          vencimento: vencimento,
          valor: this.vparcelas,
          pago: false,
        });
      }

      this.$store.dispatch("firedata/AddProcedimento", { vm: this, payload: process });
    },
  },
  data() {
    return {
      comissao: 0,
      vatendente: "",
      datalanc: "",
      paciente: "",
      procedimento: "",
      vcirurgia: 0,
      voutros: 0,
      formapgto: "",
      qntparcelas: 1,
      opcoespgto: [
        "Cartão de Crédito",
        "Cheque",
        "Dinheiro",
        "Boleto",
        "Cartão de Débito",
      ],
    };
  },
};
</script>

<style scoped>
</style>