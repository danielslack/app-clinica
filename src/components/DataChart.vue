
<template>
  <div>
    <div class="flex row">
      <div class="col-12 text-center vertical-middle">
        <div class="col-8">Selecione o ano para filtrar</div>
        <q-select v-model="selAno" :options="getYears" label="Ano" @input="change()" />
      </div>
    </div>
    <apexchart type="bar" height="400" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  component: {},
  data() {
    return {
      selAno: "",
      values: [],
      series: [],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "Jan",
            "Fev",
            "Mar",
            "Abr",
            "Mai",
            "Jun",
            "Jul",
            "Ago",
            "Set",
            "Out",
            "Nov",
            "Dez",
          ],
        },
      },
    };
  },

  created() {
    this.series = this.dataSeries;
  },

  watch: {
    dataSeries() {
      this.series = this.dataSeries;
    },
  },

  computed: {
    ...mapGetters("firedata", ["getTotalMensal", "getYears", "getAno"]),
    dataSeries() {
      //let values = Array.from({length: 12}, (x, i) => Math.floor((Math.random() * 100000.00) + i));
      let values = this.getTotalMensal;
      let series = [
        {
          name: "Vencimentos",
          data: [...values],
        },
      ];
      return series;
    },
  },

  methods: {
    change() {
      let payload = this.selAno;
      this.$store.dispatch("firedata/ChangeAno", { payload });
    },
  },
};
</script>

<style scoped>
</style>