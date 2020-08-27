# Aplicativo para gestão financeira de Clinica
Aplicativo para gestão de recebimentos de Clinica, o aplicativo utiliza o framework Quasar


## Instalação

* Se não tiver o quasar instalado, faça a instalação primeiro.
[Quasar Instalação](https://quasar.dev/quasar-cli/installation)


* Na pasta do projeto instalar os pacotes do node
 ```
 npm install ou yarn install
```

* Para executar o projeto no modo dev
```
quasar dev
```

* Na pasta src/boot criar um arquivo chamado config.js e incluir as configurações do firebase
#### Substituir pela configuração do seu projeto
```
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  }

  export { firebaseConfig };
```

## Implementações necessárias
- [ ] Permitir edições no cadastro - Atendente
- [ ] Permitir edições no cadastro de procedimentos
- [ ] Permitir edições no cadastro de procedimentos/parcelas
- [ ] Incluir data atual quando pagamento for aceito
- [ ] Incluir data de cadastro interna nas tabelas
- [ ] Criar relatório de comissão por atendente
