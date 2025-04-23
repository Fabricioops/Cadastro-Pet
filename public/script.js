// Aguarda o carregamento completo do HTML antes de executar
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('login-form');
  const carteirinha = document.getElementById('carteirinha');
  const dadosPet = document.getElementById('dadosPet');
  const container = document.querySelector('.container');

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Impede o reload da página

    // Coleta os dados do formulário
    const nomePet = document.getElementById('petName').value.trim();
    const especie = document.getElementById('species').value.trim();
    const idade = parseInt(document.getElementById('age').value);
    const nomeDono = document.getElementById('ownerName').value.trim();

    // Validação básica (opcional)
    if (!nomePet || !especie || isNaN(idade) || !nomeDono) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    try {
      // Envia os dados para o backend
      const response = await fetch('http://localhost:8081/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nomePet,
          especie,
          idade,
          nomeDono
        })
      });

      if (response.ok) {
        const resultado = await response.json();

        // Exibe a carteirinha com os dados
        dadosPet.innerHTML = `
          <h2 style="background-color:#007BFF; color:white; padding:10px; border-radius:10px;">Carteirinha Pet</h2>
          <p><strong>Nome do Pet:</strong> ${nomePet}</p>
          <p><strong>Espécie:</strong> ${especie}</p>
          <p><strong>Idade:</strong> ${idade}</p>
          <p><strong>Nome do Dono:</strong> ${nomeDono}</p>
        `;

        form.style.display = 'none';
        container.style.display = 'none';
        carteirinha.style.display = 'block';
      } else {
        const errorMsg = await response.json();
        alert(`Erro ao cadastrar o pet: ${errorMsg.erro || 'Erro desconhecido'}`);
      }

    } catch (err) {
      console.error("Erro ao enviar dados para o backend:", err);
      alert("Erro de conexão com o servidor. Verifique se o backend está rodando.");
    }
  });
});

// Função para voltar e preencher outro pet
function voltar() {
  const form = document.getElementById('login-form');
  const carteirinha = document.getElementById('carteirinha');
  const container = document.querySelector('.container');

  carteirinha.style.display = 'none';
  form.style.display = 'block';
  container.style.display = 'block';
  form.reset(); // Limpa o formulário
}
