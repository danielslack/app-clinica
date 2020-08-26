import moment from 'moment';

// Set time to local pt-br
moment.locale('pt-br')

// Função para recuperar o valor total por forma/tipo de pagamento
const totalPorMoeda = (moeda, arr) => {
  let total = arr
    .filter(function(pgto) {
      return pgto.forma_pgto == moeda;
    })
    .reduce(function(total, item) {
      return (
        parseFloat(total) +
        parseFloat(item.valor_outros) +
        parseFloat(item.valor_cirurgia)
      );
    }, 0);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(total);
};

// Recupera o total de comissão na base de Dados
const getTotalComissao = state => {
  let comissao = state.procedimentos.reduce((init, total) => {
      return parseFloat(init) + parseFloat(total.comissao)
  },0)
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(comissao);

}

// Recupera todos os procedimentos
const getProcedimentos = state => {
  return state.procedimentos;
};

// Recupera o total de pagamento em cheque
const getTotalCheque = state => {
  return totalPorMoeda("Cheque", state.procedimentos);
};

// Recupera o total de pagamento em dinheiro
const getTotalDinheiro = state => {
  return totalPorMoeda("Dinheiro", state.procedimentos);
};

// Recupera o total de pagamento em cartão de crédito
const getTotalCredito = state => {
  return totalPorMoeda("Cartão de Crédito", state.procedimentos);
};

// Recupera o total de pagamento em boleto
const getTotalBoleto = state => {
  return totalPorMoeda("Boleto", state.procedimentos);
};

// Recupera o total de pagamento em cartão de débito
const getTotalDebito = state => {
  return totalPorMoeda("Cartão de Débito", state.procedimentos);
};

// Recupera os anos para os quais existem parcelamentos
const getYears = state => {
  let datas = [];
  let d = state.procedimentos.map(d => {
    return d.duplicata;
  });

  for (let key in d) {
    for (let data of d[key]) {
      let fulldate = moment(data.vencimento, "DD/MM/YYYY");
      let year = fulldate.year();
      let month = fulldate.month();
      datas.push(year);
    }
  }
  return [...new Set(datas)];
};

// Recupera o total de cirurgia
const getTotalCirurgia = state => {
  let totalcirurgia = state.procedimentos.reduce(function(total, item) {
    return parseFloat(total) + parseFloat(item.valor_cirurgia);
  }, 0);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(totalcirurgia);
};

// Recupera o total de outros valores
const getTotalOutros = state => {
  let totaloutros = state.procedimentos.reduce(function(total, item) {
    return parseFloat(total) + parseFloat(item.valor_outros);
  }, 0);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(totaloutros);
};


// Função para recuperar o totam por mês/ano (Alimentar o grafico)
 const funTotalMensal = (mes, state) => {
  let month = []
  let value = state.procedimentos.map( (d) => {
      return d.duplicata
  })

  for (let key in value) {
    for (let data of value[key]) {
       month.push({
         vencimento: data.vencimento,
         valor: data.valor
       })
    }
  }
  return month.filter(d => {
      return moment(d.vencimento, 'DD/MM/YYYY').month() == mes &&
      moment(d.vencimento,'DD/MM/YYYY').year() == state.ano
  }).reduce((zero, valor) => {
    return parseFloat(zero) + parseFloat(valor.valor)
  },0)
} 

// Mapeia o array mesMap de 0-11 representando os mês com totais
// utiliza a função funTotalMensal()
const getTotalMensal = state => {
  let mesMap = []
    for(let i = 0; i <= 11; i++){
      mesMap.push(funTotalMensal(i, state))
    }
    return mesMap
    
}

// State para o ano, utilizado na função funTotalMensal
const getAno = state => {
  return state.ano
}

// Retorna o total de parcelas já pagas
const getTotalpagamentos = state => {
  let data = state.procedimentos.map(d => {
    return d.duplicata
      .filter(d => {
        return d.pago;
      })
      .map(d => {
        return d.valor;
      })
      .reduce((t, v) => {
        return parseFloat(t) + parseFloat(v);
      }, 0);
  });
  let totalpagamentos = data.reduce((t, v) => {
    return parseFloat(t) + parseFloat(v);
  }, 0);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(totalpagamentos);
};

// Retorna o total de parcelas em aberto
const getTotalReceber = state => {
  let data = state.procedimentos.map(d => {
    return d.duplicata
      .filter(d => {
        return !d.pago;
      })
      .map(d => {
        return d.valor;
      })
      .reduce((t, v) => {
        return parseFloat(t) + parseFloat(v);
      }, 0);
  });
  let totalreceber = data.reduce((t, v) => {
    return parseFloat(t) + parseFloat(v);
  }, 0);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(totalreceber);
};

// Recupera o nome da atendente
const getAtendente = state => {
  return state.atendente.map(d => {
      return d.nome
  })
}

export { getProcedimentos, getTotalCheque, getTotalDinheiro, getTotalBoleto, getTotalCirurgia
,getTotalOutros, getTotalpagamentos, getTotalReceber, getTotalCredito, getTotalDebito,
getYears, getTotalComissao, getTotalMensal ,getAno, getAtendente};
