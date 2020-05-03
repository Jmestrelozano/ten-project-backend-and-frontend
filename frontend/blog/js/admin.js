let form = document.getElementById("formulario")
let lista = document.getElementById("lista-notas");

form.addEventListener("submit", enviarDatos);
lista.addEventListener("click", eliminarDatos)



function enviarDatos() {
    /*localstorage*/
    let verLocal = localStorage.getItem("Data")
    let mostrar = JSON.parse(verLocal)

    let id = mostrar[0]._id;

    /*envio de datos*/
    let campoTexto = document.querySelector("#mytextarea").value;

    let div = document.createElement("div")
    let h2 = document.createElement("h2")
    let btnBorrar = document.createElement("button")
    let btnActualizar = document.createElement("button")
    lista.appendChild(div)
    div.appendChild(h2)
    div.appendChild(btnBorrar)
    div.appendChild(btnActualizar)
    h2.id = ("titulo")
    h2.classList = ("act")
    div.classList = ("content")
    btnBorrar.id = ("borrar-dato")
    btnBorrar.classList = ("fas fa-times icono")
    btnActualizar.classList = ("fas fa-redo-alt icono")
    h2.innerHTML += campoTexto

    let titulo = document.querySelector("#titulo").textContent;


    let url = "https://bloggea.herokuapp.com/post/createPost/"
    fetch(url + id, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                title: titulo,
                content: campoTexto
            })
        })
        .then(res => res.json())
        .then(function ver(info) {
            console.log("sucess", info)

        })
        .catch(error => console.error("error", error))

}

function eliminarDatos() {
    let btnBorrar = document.querySelector("#borrar-dato")

    let brn = btnBorrar.parentElement.parentElement.children;
    console.log(brn)
    for (let i = 1; i <= brn.length; i++) {
        let revisa = brn[i];
        revisa.remove();


    }
}

tinymce.init({
    selector: '#mytextarea',
    toolbar: "image",
    plugins: "image imagetools",
    height: 300,
    menubar: true,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
    content_css: '//www.tiny.cloud/css/codepen.min.css'
});