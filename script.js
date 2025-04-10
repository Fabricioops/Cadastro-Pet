// Espera o carregamento completo do HTML
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('login-form');        // Formulário do pet
  const carteirinha = document.getElementById('carteirinha'); // Área onde aparece a carteirinha
  const dadosPet = document.getElementById('dadosPet');       // Onde os dados do pet serão exibidos
  const container = document.querySelector('.container');     // Container principal

  // Escuta o envio do formulário
  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Impede o recarregamento da página

    // Captura os valores digitados nos inputs
    const nomePet = document.getElementById('petName').value;
    const especie = document.getElementById('species').value;
    const idade = document.getElementById('age').value;
    const nomeDono = document.getElementById('ownerName').value;

    try {
      // Envia os dados para o backend via fetch
      const response = await fetch('http://localhost:5500/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Define o tipo do conteúdo
        },
        body: JSON.stringify({               // Converte os dados em JSON
          nomePet,
          especie,
          idade,
          nomeDono
        })
      });

      // Se a resposta for bem-sucedida
      if (response.ok) {
        const resultado = await response.json(); // Recebe a resposta do servidor

        
       

        // Atualiza o HTML da carteirinha com os dados do pet
        dadosPet.innerHTML = `
          <h2 style="background-color:#007BFF; color:white; padding:10px; border-radius:10px;">Carteirinha Pet</h2>
          <p><strong>Nº de Registro Pet:</strong> ${geradorId}</p>
          <p><strong>Nome do Pet:</strong> ${nomePet}</p>
          <p><strong>Espécie:</strong> ${especie}</p>
          <p><strong>Idade:</strong> ${idade}</p>
          <p><strong>Nome do Dono:</strong> ${nomeDono}</p>
        `;

        // Esconde o formulário e mostra a carteirinha
        form.style.display = 'none';
        container.style.display = 'none';
        carteirinha.style.display = 'block';
      } else {
        alert('Erro ao cadastrar o pet!');
      }
    } catch (err) {
      console.error("Erro ao enviar dados para o backend:", err);
    }
  });
});

// Função chamada ao clicar no botão "Voltar"
function voltar() {
  const form = document.getElementById('login-form');           // Reexibe o formulário
  const carteirinha = document.getElementById('carteirinha');   // Esconde a carteirinha
  const container = document.querySelector('.container');       // Reexibe o container principal

  carteirinha.style.display = 'none'; // Oculta a carteirinha
  form.style.display = 'block';       // Exibe o formulário
  container.style.display = 'block';  // Exibe o restante da tela
  form.reset();                       // Limpa os campos do formulário
}
