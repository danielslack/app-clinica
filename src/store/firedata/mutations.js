// Commit atendente ( Action AddAtendente )
const ADDATENDENTE = (state, { vm, payload }) => {
  let ref = vm.$database().ref("/atendentes");
  let newref = ref.push();
  payload.id = newref.key;
  newref.set(payload);
};

// Commit procedimentos (Action AddProcedimento)
const ADDPROCEDIMENTOS = (state, { vm, payload }) => {
  let ref = vm.$database().ref("procedimentos");
  let newref = ref.push();
  payload.id = newref.key;
  newref.set(payload);
};

// Commit procedimentos (Action DeleteProcedimento)
const DELETEPROCEDIMENTOS = (state, { vm, payload }) => {
  vm.$database()
    .ref("/procedimentos/" + payload)
    .remove();
};


// Commit atendente (Action DeleteAtendente)
const DELETEATENDENTE = (state, { vm, payload }) => {
  vm.$database()
    .ref("/atendentes/" + payload.row.id)
    .remove();
};

// Commit procedimentos (Action UpdateProcedimento)
const UPDATEPROCEDIMENTOS = (state, { vm, payload }) => {
  vm.$database()
    .ref("/procedimentos/" + payload.id)
    .update(payload);
};

// Commit para alterar state Ano (Action ChangeAno)
const CHANGEANO = (state, { payload }) => {
  console.log(payload);
  state.ano = payload;
};

// Commit atendente (Action GetAtendente)
const GETATENDENTE = (state, { payload }) => {
  state.atendente = [];
  if (payload) {
    payload.forEach(item => {
      var key = item.key;
      var dat = item;
      state.atendente.push(dat);
    });
  }
};

const GETPROCEDIMENTOS = (state, { payload }) => {
  state.procedimentos = [];
  if (payload) {
    payload.forEach(item => {
      var key = item.key;
      var dat = item;
      state.procedimentos.push(dat);
    });
  }
};

export {
  GETPROCEDIMENTOS,
  ADDPROCEDIMENTOS,
  DELETEATENDENTE,
  DELETEPROCEDIMENTOS,
  UPDATEPROCEDIMENTOS,
  CHANGEANO,
  GETATENDENTE,
  ADDATENDENTE
};
