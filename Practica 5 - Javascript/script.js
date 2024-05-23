function agregarLocal (){
    persona = {
        nombre: document.getElementById("txtNombre").value,
        edad: document.getElementById("txtEdad").value
    };
    localStorage.setItem(1, JSON.stringify(persona));
}

document.getElementById("btnLocalStorage").addEventListener('click', agregarLocal);