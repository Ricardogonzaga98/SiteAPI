'use strict';

// Funções utilitárias
const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length === 8 && eNumero(cep);

// Máscaras simples
const aplicarMascaraCPF = (valor) =>
  valor.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2')
       .replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const aplicarMascaraTelefone = (valor) =>
  valor.replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '($1) $2')
       .replace(/(\d{5})(\d{1,4})$/, '$1-$2');

const aplicarMascaraCEP = (valor) =>
  valor.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');

// Função de limpeza de campos de endereço
const limparFormulario = () => {
  document.getElementById('rua').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
};

// Preenche campos com dados do ViaCEP
const preencherFormulario = (endereco) => {
  document.getElementById('rua').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
};

// Busca CEP via API
const pesquisaCep = async () => {
  limparFormulario();
  const cep = document.getElementById('cep').value.replace(/\D/g, '');

  if (cepValido(cep)) {
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();

      if (dados.hasOwnProperty('erro')) {
        document.getElementById('mensagem').textContent = 'CEP não encontrado.';
      } else {
        preencherFormulario(dados);
        document.getElementById('mensagem').textContent = '';
      }
    } catch {
      document.getElementById('mensagem').textContent = 'Erro ao buscar o CEP.';
    }
  } else {
    document.getElementById('mensagem').textContent = 'CEP inválido. Digite 8 números.';
  }
};

// Valida se todos os campos obrigatórios estão preenchidos
const validarFormulario = () => {
  const campos = ['nome', 'cpf', 'telefone', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'estado'];
  for (let campo of campos) {
    const valor = document.getElementById(campo).value.trim();
    if (!valor) {
      document.getElementById('mensagem').textContent = `Preencha o campo: ${campo}`;
      document.getElementById(campo).focus();
      return false;
    }
  }
  return true;
};

// Evento de envio do formulário
document.getElementById('formCadastro').addEventListener('submit', (event) => {
  event.preventDefault();
  if (validarFormulario()) {
    const dados = {
      nome: document.getElementById('nome').value,
      cpf: document.getElementById('cpf').value,
      telefone: document.getElementById('telefone').value,
      cep: document.getElementById('cep').value,
      rua: document.getElementById('rua').value,
      numero: document.getElementById('numero').value,
      bairro: document.getElementById('bairro').value,
      cidade: document.getElementById('cidade').value,
      estado: document.getElementById('estado').value
    };

    console.log('Dados cadastrados:', dados);
    document.getElementById('mensagem').textContent = 'Cadastro realizado com sucesso!';
    document.getElementById('formCadastro').reset();
  }
});

// Eventos para aplicar máscaras
document.getElementById('cpf').addEventListener('input', (e) => {
  e.target.value = aplicarMascaraCPF(e.target.value);
});
document.getElementById('telefone').addEventListener('input', (e) => {
  e.target.value = aplicarMascaraTelefone(e.target.value);
});
document.getElementById('cep').addEventListener('input', (e) => {
  e.target.value = aplicarMascaraCEP(e.target.value);
});

// Corrigido: evento de saída do campo CEP
document.getElementById('cep').addEventListener('focusout', pesquisaCep);
