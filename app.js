let tentativas = 1;
let limiteDeJogos = 10;
let numerosJaSorteados = []; 

function textos(tag, texto) {
  let campos = document.querySelector(tag);
  campos.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}
function exibirMensagem() {
  textos('h1', 'Jogo da Adivinhação');
  textos('p', 'Escolha um número entre 1 e 10: ');
}

exibirMensagem(); 

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function verificarChute() {
  let chute = document.querySelector('input').value;
  let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';

  if (chute == numeroSecreto) {
    textos('h1', 'Acertou!');
    textos('p', `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`);
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    textos('h1', 'Errou!');
    if (numeroSecreto > chute) {
      textos('p', 'Número secreto é maior que o chute');
    } else {
      textos('p', 'Número secreto é menor que o chute');
    }
    tentativas++;
    limparCampo();
  }

}

function numeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * limiteDeJogos + 1); 
  let limiteLista = numerosJaSorteados.length; 

  if(limiteLista == limiteDeJogos){
    numerosJaSorteados = []; 
  }

  if(numerosJaSorteados.includes(numeroEscolhido)){
    return numeroAleatorio(); 
  } else {
    numerosJaSorteados.push(numeroEscolhido);  
    console.log(numerosJaSorteados); 
    return numeroEscolhido; 
  }

}

let numeroSecreto = numeroAleatorio();
console.log(numeroSecreto);

function novoJogo() {
  numeroSecreto = numeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagem(); 
  document.getElementById('reiniciar').setAttribute('disabled', true); 
}

