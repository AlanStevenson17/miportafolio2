const regexIsEmpty = /^\s*$/;
const regexIsEmail = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

let formulario = null;
let nombreInput = null;
let correoInput = null;
let mensajeInput = null;
let btnEnviar = null;

document.addEventListener("DOMContentLoaded", () => {

    const hb = document.querySelector(".hamburguer-buttons");
    const nv = document.querySelector("header nav");
    hb.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        nv.classList.toggle("hidden");
    });

    formulario   = document.getElementById("contactForm");
    nombreInput  = document.getElementById("txtNombre");
    correoInput  = document.getElementById("txtCorreo");
    mensajeInput = document.getElementById("txtMensaje");
    btnEnviar    = document.getElementById("btnEnviar");

    btnEnviar.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        let objErrores = {};
        let formularioValido = true;

        if (!validarNoVacio(nombreInput.value)) {
            objErrores["divNombre"] = {
                "error": "El nombre no puede estar vacio.",
                "input": nombreInput
            };
            formularioValido = false;
        }

        if (!validarCorreo(correoInput.value)) {
            objErrores["divCorreo"] = {
                "error": "El correo electronico no es valido.",
                "input": correoInput
            };
            formularioValido = false;
        }

        if (!validarNoVacio(mensajeInput.value)) {
            objErrores["divMensaje"] = {
                "error": "El mensaje no puede estar vacio.",
                "input": mensajeInput
            };
            formularioValido = false;
        }

        if (formularioValido) {
            formulario.submit();
        } else {
            Object.entries(objErrores).forEach(err => {
                let [key, obj] = err;
                obj.input.classList.add("error");
                let container = document.getElementById(key);
                let errorDiv = document.createElement("DIV");
                errorDiv.innerText = obj.error;
                errorDiv.classList.add("error-text");
                container.appendChild(errorDiv);
            });
        }
    });

    [nombreInput, correoInput, mensajeInput].forEach(input => {
        input.addEventListener("input", () => {
            input.classList.remove("error");
            let parent = input.parentElement;
            let errores = parent.querySelectorAll(".error-text");
            errores.forEach(e => e.remove());
        });
    });

});

function validarNoVacio(valor) {
    return !regexIsEmpty.test(valor);
}

function validarCorreo(valor) {
    return regexIsEmail.test(valor);
}
