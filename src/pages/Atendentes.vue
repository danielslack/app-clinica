<template>
  <div class="flex justify-center items-center content-center">
    <tableatendente />
    <actionbtn @action="showDialog" />
    <dialogatendente :show="show" @closedialog="showDialog" />
  </div>
</template>

<script>
export default {
  components: {
    tableatendente: require("../components/TableAtendentes.vue").default,
    actionbtn: require("../components/FloatButton.vue").default,
    dialogatendente: require("../components/DialogAtendente.vue").default,
  },

  data() {
    return {
      show: false,
    };
  },

  created() {
    this.$store.dispatch("firedata/GetAtendente", { vm: this });
  },

  methods: {
    showDialog() {
      this.show = !this.show;
    },
  },
};
</script>

<style>
</style>