<template>
  <div>
    <tableproc />
    <actionbtn @action="showDialog" />
    <dialogproc :show="show" @closedialog="showDialog"/>
  </div>
</template>

<script>
export default {
  components: {
    'tableproc' : require('../components/TableProcedimentos.vue').default,
    'actionbtn' : require('../components/FloatButton.vue').default,
    'dialogproc': require('../components/DialogProcedimento.vue').default
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    showDialog() {
      this.show = !this.show
    }
  }
}
</script>

<style>

</style>