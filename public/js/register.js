document.getElementById("register").addEventListener("click", (event) => {
  event.preventDefault();
  let data = {
    first_name: document.querySelector("#first_name").value,
    last_name: document.querySelector("#last_name").value,
    age: document.querySelector("#age").value,
    mail: document.querySelector("#mail").value,
    password: document.querySelector("#password").value,
    // Otros datos necesarios para el registro
  };
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  fetch("/api/auth/register", config)
    .then((res) => res.json())
    .then((res) => {
      // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje
      console.log(res);
    })
    .catch((err) => console.log(err));
    window.location.href = "/html/login.html";
});
