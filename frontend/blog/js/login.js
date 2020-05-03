document.addEventListener("submit", function(e) {

    e.preventDefault();
    let usuario = document.getElementById("username").value
    let contraseña = document.getElementById("password").value

    let dato = {
        username: usuario,
        password: contraseña,
    }


    fetch('https://bloggea.herokuapp.com/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(dato)
        })
        .then(res => res.json())
        .then(function datos(info) {
            console.log("sucess", info.data._id)

            guardarArray(info)
            validarEntrada(info)
        })

    .catch(error => console.log("error", error))

    function validarEntrada(info) {
        if (info.ok) {
            window.location.assign("http://127.0.0.1:5500/frontend/blog/html/admin.html")
        } else if (info.ok == false) {
            alert("usuario o contraseña incorrectos")
        } else {
            alert("los campos estan vacios")
        }
    }

})


let arrayData = [];

function guardarArray(info) {

    arrayData.push(info.data)
    guardarLocalStorage(arrayData);
}

function guardarLocalStorage(arrayData) {
    let miStorage = window.localStorage;
    miStorage.setItem("Data", JSON.stringify(arrayData))
}