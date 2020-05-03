let form = document.getElementById("formulario")

document.addEventListener("DOMContentLoaded", inicioApp)


function inicioApp() {
    document.getElementById("enviar").addEventListener("click",
        enviarDatos, false);
}


function validarEmail() {
    let email = document.getElementById("email")
    if (!/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(email.value)) {
        alert("el correo es incorrecto")
        return false
    }
    return true;
}

function enviarDatos(e) {
    let usuario = document.querySelector("#username").value;
    let contraseña = document.querySelector("input[type='password']").value;
    let correo = document.querySelector("input[type='email']").value;
    console.log(usuario, contraseña, correo)
    let url = 'https://bloggea.herokuapp.com/user/register';
    let data = {
        username: usuario,
        password: contraseña,
        email: correo
    };
    console.log(data)
    fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => console.log("info", data));
    if (validarEmail() && confirm("deseas enviar")) {
        return true;

    } else {
        e.preventDefault();
        return false
    }
}