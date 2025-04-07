document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // impede o envio automático do form
    let nomePet = document.getElementById("petName").value;
    console.log("Nome do pet:", nomePet);
  });
  