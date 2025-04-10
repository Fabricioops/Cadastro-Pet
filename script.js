document.addEventListener("DOMContentLoaded", function () {// Isso garante que todo o HTML esteja carregado antes de acessar elementos com getElementById
  const form = document.getElementById('login-form');      //salva  na variavel
  const carteirinha = document.getElementById('carteirinha');  //salva  na variavel
  const dadosPet = document.getElementById('dadosPet');  //salva  na variavel

  form.addEventListener("submit", function (e) { // função ativada pelo botão
    e.preventDefault();                             //impede que o formulario recarregue a pagina 

    const nomePet = document.getElementById('petName').value;  //captura o valor de cada campo e salva na variavel
    const especie = document.getElementById('species').value; //captura o valor de cada campo e salva na variavel
    const idade = document.getElementById('age').value;  //captura o valor de cada campo e salva na variavel
    const nomeDono = document.getElementById('ownerName').value;  //captura o valor de cada campo e salva na variavel

   let geradorId = Math.floor(Math.random() * 100000000)

    dadosPet.innerHTML =                                      //altera os dados do formulario para exibir a carteirinha
     `<p><strong>Nº de Registro Pet</strong> ${geradorId}</p>
     <p><strong>Nome do Pet:</strong> ${nomePet}</p>
      <p><strong>Espécie:</strong> ${especie}</p>
      <p><strong>Idade:</strong> ${idade}</p>
      <p><strong>Nome do Dono:</strong> ${nomeDono}</p>
    `;

    form.style.display = 'none';                           //esconde o formulario
    carteirinha.style.display = 'block';                   //mostra a carteirinha
    container.style.display = 'none';                
  });
});

function voltar() {                                         //função para voltar ao formulario 
  const form = document.getElementById('login-form');
  const carteirinha = document.getElementById('carteirinha');
  carteirinha.style.display = 'none';
  form.style.display = 'block';
  container.style.display = 'block'; // MOSTRA A CONTAINER NOVAMENTE
  form.reset();
}
