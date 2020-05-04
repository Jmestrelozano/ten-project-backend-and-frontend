let form = document.getElementById("formulario")
let lista = document.getElementById("lista-notas");

form.addEventListener("submit", enviarDatos);
lista.addEventListener("click", eliminarDatos)


let nuevoArray = [];

function enviarDatos() {
    /*localstorage login*/
    let verLocal = localStorage.getItem("Data")
    let mostrar = JSON.parse(verLocal)
    let id = mostrar[0]._id;



    /*envio de datos*/
    let campoTitulo = document.querySelector("#titulo").value;
    let campoTexto = document.querySelector("#mytextarea").value;


    let titulo = document.createElement("h2");
    let div = document.createElement("div")
    let divbotones = document.createElement("div")
    let divcontenedor = document.createElement("div")
    let divtitulo = document.createElement("div")
    let parrafo = document.createElement("p")
    let btnBorrar = document.createElement("button")
    let btnActualizar = document.createElement("button")
    lista.appendChild(divcontenedor)
    divcontenedor.classList = ("contenedor-lista")
    divcontenedor.id = ("contenedor-id")

    divcontenedor.appendChild(div)
    div.appendChild(divtitulo)
    div.appendChild(divbotones)
    divtitulo.appendChild(titulo)
    divtitulo.appendChild(parrafo)
    divbotones.appendChild(btnBorrar)
    divbotones.appendChild(btnActualizar)
    parrafo.classList = ("act")
    div.classList = ("content")
    btnBorrar.classList = ("fas fa-times icono borrar")
    btnActualizar.classList = ("fas fa-redo-alt icono")
    btnBorrar.id = ("borrar-dato")
    parrafo.id = ("contenido")
    titulo.innerHTML += campoTitulo
    parrafo.innerHTML += campoTexto


    let url = "https://bloggea.herokuapp.com/post/createPost/"
    fetch(url + id, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                title: campoTitulo,
                content: campoTexto
            })
        })
        .then(res => res.json())
        .then(function ver(info) {
            console.log("sucess", info)
            guardarArray(info)

        })
        .catch(error => console.error("error", error))
    listarPost();
}


function guardarArray(info) {
    nuevoArray.push(info.data)
    let local = localStorage.setItem("DataPost", JSON.stringify(nuevoArray))
}


function eliminarDatos(e) {
    let blog, blogid;
    /*localstorage login*/
    let verLocal = localStorage.getItem("Data")
    let mostrar = JSON.parse(verLocal)

    let id = mostrar[0]._id;

    /* localstorage Crearpost*/
    let localPost = localStorage.getItem("DataPost")
    let mostrarPost = JSON.parse(localPost)
    let idpost = mostrarPost[0]._id;


    console.log(id, idpost)
    let url = "https://bloggea.herokuapp.com/post/deletePost/"
    fetch(url + id + '/' + idpost, {
            method: 'delete'
        })
        .then(response => response.json())
        .then(respuesta => console.log("respuesta", respuesta))
        .catch(error => console.error("error", error))


    if (e.target.classList.contains("borrar")) {
        e.target.parentElement.parentElement.remove();

        blog = e.target.parentElement.parentElement;
        blogid = curso.querySelector("button").getAttribute("idpost")

    }

}

function listarPost() {

    /*localstorage login*/
    let verLocal = localStorage.getItem("Data")
    let mostrar = JSON.parse(verLocal)
    let id = mostrar[0]._id;

    let url = "https://bloggea.herokuapp.com/user/userPost/"
    fetch(url + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(respues => console.log("sucess", respues))
        .catch(error => console.error("error", error))
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