<template>
   <div>
    <q-input 
    :value="data" 
    mask="##/##/####" 
    :rules="[checkdate]"
    @input="$emit('update:data',$event)"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date
            mask="DD/MM/YYYY"
            :value="data"
            @input="setValueDate($event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script>
import { date } from 'quasar'

export default {
  props: [
    'data'
  ],
  computed: {

  },
  methods: {
    setValueDate(e)
    {
     this.$refs.qDateProxy.hide()
     this.$emit('update:data',e)
    },
    checkdate(val) {
      let data = val.split('/')
      return date.isValid(`${data[1]}/${data[0]}/${data[2]}`) || 'Data Inválida'
    }
  }

}
</script>

<style>

</style>