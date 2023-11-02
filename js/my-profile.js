// Archivo por defecto que va a tener la imagen
const defaultFile ="/img/img_perfil.png";

const img = document.getElementById('img');
const file = document.getElementById('picture');

// Carga la imagen guardada en el localStorage si existe
const savedImg = localStorage.getItem("img");

if (savedImg) {
  img.src = savedImg;
}

// Crea una escucha del evento change 
file.addEventListener('change', e => {
  // Pregunta si el evento target tiene un archivo seleccionado
  if (e.target.files[0]) {
    const reader = new FileReader();

    // Establece la propiedad src del elemento de la imagen en la ruta del archivo
    reader.onload = function(e) {
      img.src = e.target.result;

      // Guarda la imagen en el localStorage
      localStorage.setItem("img", e.target.result);
    }

    // Lee el contenido del archivo como una URL de datos base64
    reader.readAsDataURL(e.target.files[0]);

  } else {
    img.src = defaultFile;
    // Elimina la imagen guardada del localStorage
    localStorage.removeItem("img");
  }
});

document.addEventListener("DOMContentLoaded", () =>{
    let emailInput = document.getElementById("inputEmail");
    let gmailUser = JSON.parse(localStorage.getItem("username"));
    emailInput.value = gmailUser; 
});
