'use strict'; // Modo restrito
 // Verificar se o CEP é válido
const eNumero = (numero) => /^[0-9]+$/.test
(numero);
const cepValido = (cep) => cep.length == 8 &&
eNumero(cep);

const pesquisaCep = async() => {
    limparFormulario();
    const url = `http://viacep.com.br/ws/${cep.value}/json/`;
    if(cepValido(cep.value)){
        const dados = await fetch(url);
        const addres = await dados.json();

        if(addres.hasOwnProperty('erro')){
            alert("CEP não encontrado");
        }else{
            preencherFormulario(addres);
        }


        
    }
}

preencherFormulario = (endereco) => {
    
}

// Função para Limpar formulario
limparFormulario = () => {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}
