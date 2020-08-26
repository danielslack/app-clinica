import Vue from 'vue'
import AutoNumeric from 'autonumeric';

const autoNumericOptions = 
    {
        alwaysAllowDecimalCharacter: true,
        caretPositionOnFocus: "start",
        
        decimalCharacter: ".",
        digitalGroupSpacing: "2",
        digitGroupSeparator: "",
        outputFormat: "number"
    
};

export const Autonum = {
  bind(el, binding, vnode) {
   
    if (el) {
      return new AutoNumeric(el,  autoNumericOptions)
    }
  }
}

Vue.directive('auto-num', Autonum)