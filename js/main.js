"use strict";

// ação para preencher o formulário.
const preencherFormulario = (endereco) => {
  document.getElementById("endereco").value = endereco.logradouro;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("cidade").value = endereco.localidade;
  document.getElementById("estado").value = endereco.uf;
};

// ação para limpar os campos de formulário
const limparFormulario = (endereco) => {
  document.getElementById("endereco").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
};

//função para salvar os dados do usuário.
function salvar(dados) {
  if (typeof Storage !== "undefined") {
    // armazenar os dados em LocalStorage
    localStorage.setItem("dados", JSON.stringify(dados));
    alert ("dados salvos!");
  }
}

// ação para verficar se os digitos são números
const eNumero = (numero) => /^[0-9]+$/.test(numero);

// verifica se o cep está válido.
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

// pesquisa cep e retorna o resultado.
const pesquisarCep = async () => {
  limparFormulario();

  // vai no 'documento' e pega o id 'cep' com o valor atribuido.
  const cep = document.getElementById("cep").value;

  // Busca os dados da API.
  const url = `http://viacep.com.br/ws/${cep}/json/`;

  //método para validar se o cep está correto.
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty("erro")) {
      document.getElementById("endereco").value = "CEP não encontrado!";
    } else {
      preencherFormulario(endereco);
    }
  } else {
    document.getElementById("endereco").value = "CEP incorreto!";
  }
};

// vai no 'documento' e pega o elemento cujo o 'id' é 'cep'
document
  .getElementById("cep")
  //quando sair do 'Foco' aciona a função 'pesquisarCep'
  .addEventListener("focusout", pesquisarCep);
