// Remove a atendente da base de dados
const DeleteAtendente = ({ commit }, { vm, payload }) => {
  commit("DELETEATENDENTE", { vm, payload });
};

// Remove o procedimento da base de dados
const DeleteProcedimento = ({ commit }, { vm, payload }) => {
  commit("DELETEPROCEDIMENTOS", { vm, payload });
};

// Atualiza a duplicata para pagamento realizado
const UpdateProcedimento = ({ commit }, { vm, payload }) => {
  commit("UPDATEPROCEDIMENTOS", { vm, payload });
};

// Adiciona um novo procedimento na base de dados
const AddProcedimento = ({ commit }, { vm, payload }) => {
  commit("ADDPROCEDIMENTOS", { vm, payload });
};

// Adiciona uma atendente na base de dados
const AddAtendente = ({ commit }, { vm, payload }) => {
  commit("ADDATENDENTE", { vm, payload });
};

// Alterar o ano para filtro na tabela
const ChangeAno = ({ commit }, { payload }) => {
  commit("CHANGEANO", { payload });
};

// Recupera a base de dados de atendentes
const GetAtendente = ({ commit }, { vm, payload }) => {
  var ref = vm.$database().ref("/atendentes/");
  ref.on("value", data => {
    payload = [];
    data.forEach(item => {
      var key = item.key;
      var dat = item.val();
      payload.push(dat);
    });
    commit("GETATENDENTE", { payload });
  });
};

// Recupera a base de dados de procedimentos
const GetProcedimento = ({ commit }, { vm, payload }) => {
  var ref = vm.$database().ref("/procedimentos/");
  ref.on(
    "value",
    data => {
      payload = [];
      data.forEach(item => {
        var key = item.key;
        var dat = item.val();
        payload.push(dat);
      });
      commit("GETPROCEDIMENTOS", { payload });
    },
    function(error) {
      console.log("Error: " + error.code);
    }
  );
};

export {
  GetProcedimento,
  AddProcedimento,
  DeleteProcedimento,
  UpdateProcedimento,
  ChangeAno,
  GetAtendente,
  DeleteAtendente,
  AddAtendente
};
