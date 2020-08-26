<template>
  <q-page class="q-pa-md">
    <!-- Grupo 01 -->
    <div class="wrapper-g1">
      <div class="item space">
        <Datacard :valor="getTotalCirurgia" :icon="iconcirurgia" :class="{color1}">
          <template>Total Cirurgia</template>
        </Datacard>
      </div>
      <div class="item space">
        <Datacard :valor="getTotalOutros" :icon="iconoutros" :class="{color2}">
          <template>Total Acessórios</template>
        </Datacard>
      </div>
      <div class="item space">
        <Datacard :valor="getTotalpagamentos" :icon="iconrecebidos" :class="{color3}">
          <template>Total Recebidos</template>
        </Datacard>
      </div>
      <div class="item space">
        <Datacard :valor="getTotalReceber" :icon="iconaberto" :class="{color4}">
          <template>Total em Aberto</template>
        </Datacard>
      </div>
    </div>
    <!-- End Grupo 01 -->
    <!-- Grupo 02 -->
    <div class="wrapper-g2">
      <div class="wrapper-card">
        <div class="item space">
          <Datacard :valor="getTotalCredito" :icon="iconcartao" :class="{color5}">
            <template>Total Cartão Crédito</template>
          </Datacard>
        </div>
        <div class="item space">
          <Datacard :valor="getTotalDebito" :icon="iconcartao" :class="{color6}">
            <template>Total Cartão Débito</template>
          </Datacard>
        </div>
        <div class="item space">
          <Datacard :valor="getTotalBoleto" :icon="iconboleto" :class="{color7}">
            <template>Total Boleto</template>
          </Datacard>
        </div>
        <div class="item space">
          <Datacard :valor="getTotalDinheiro" :icon="icondinheiro" :class="{color8}">
            <template>Total Dinheiro</template>
          </Datacard>
        </div>
        <div class="item space">
          <Datacard :valor="getTotalCheque" :icon="iconcheque" :class="{color9}">
            <template>Total Cheque</template>
          </Datacard>
        </div>
        <div class="item space">
          <Datacard :valor="getTotalComissao" :icon="iconcomissao" :class="{color10}">
            <template>Total Comissão</template>
          </Datacard>
        </div>
      </div>
      <div class="wrapper-chart">
        <div class="item">
          <DataChart />
        </div>
      </div>
    </div>
    <!-- End Grupo 02 -->
  </q-page>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Datacard: require("../components/DataCard.vue").default,
    DataChart: require("../components/DataChart.vue").default,
  },
  data() {
    return {
      valor: 1.2,
      icondinheiro: "far fa-money-bill-alt fa-2x",
      iconcartao: "fas fa-credit-card fa-2x",
      iconcheque: "fas fa-money-check-alt fa-2x",
      iconboleto: "fas fa-barcode fa-2x",
      iconaberto: "fas fa-hand-holding-usd fa-2x",
      iconrecebidos: "fas fa-piggy-bank fa-2x",
      iconcirurgia: "fas fa-heartbeat fa-2x",
      iconoutros: "fas fa-band-aid fa-2x",
      iconcomissao: "fas fa-percentage fa-2x",
      color1: "color1",
      color2: "color2",
      color3: "color3",
      color4: "color4",
      color5: "color5",
      color6: "color6",
      color7: "color7",
      color8: "color8",
      color9: "color9",
      color10: "color10",
    };
  },
  computed: {
    ...mapState("firedata", ["procedimentos"]),
    ...mapGetters("firedata", [
      "getProcedimentos",
      "getTotalCheque",
      "getTotalDinheiro",
      "getTotalBoleto",
      "getTotalCirurgia",
      "getTotalOutros",
      "getTotalpagamentos",
      "getTotalReceber",
      "getTotalCredito",
      "getTotalDebito",
      "getYears",
      "getTotalComissao",
      "getTotalMensal",
    ]),
  },
  methods: {},
  created() {
    this.$store.dispatch("firedata/GetProcedimento", { vm: this });
  },
};
</script>

<style>
.space {
  margin-bottom: 10px;
}

.wrapper-g1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item {
  flex-grow: 1;
}
.wrapper-g2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.wrapper-card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 50%;
}
.wrapper-chart {
  width: 50%;
}
.color1 {
  background: linear-gradient(135deg, #fe9467 0%, #fe8e9c 100%);
}
.color2 {
  background: linear-gradient(135deg, #01abae 0%, #01d9dd 100%);
}

.color3 {
  background: linear-gradient(135deg, #0ac383 0%, #0df0a1 100%);
}

.color4 {
  background: linear-gradient(135deg, #fe5e71 0%, #fe8e9c 100%);
}

.color5 {
  background: linear-gradient(135deg, #8a05be 0%, #866c90 100%);
}

.color6 {
  background: linear-gradient(135deg, #00a857 0%, #246748 100%);
}

.color7 {
  background: linear-gradient(90deg, #585298 0%, #7675d2 100%);
}

.color8 {
  background: linear-gradient(90deg, #228178 0%, #7675d2 100%);
}

.color9 {
  background: linear-gradient(90deg, #2cc9c2 0%, #7675d2 100%);
}
.color10 {
  background: linear-gradient(90deg, #33e952 0%, #7675d2 100%);
}
</style>