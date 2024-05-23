// Funcion Agregar Local Storage ==================================================================
function agregarLocal (){
    localStorage.setItem(localStorage.length, JSON.stringify({
        apellido: document.getElementById("txtApellido").value,
        nombre: document.getElementById("txtNombre").value,
        edad: document.getElementById("txtEdad").value
    }));
    mostrarTablaLocal();
}

document.getElementById("btnLocalStorage").addEventListener('click', agregarLocal);

// Funcion agregar Session Storage ================================================================
function agregarSession (){
    sessionStorage.setItem(sessionStorage.length, JSON.stringify({
        apellido: document.getElementById("txtApellido").value,
        nombre: document.getElementById("txtNombre").value,
        edad: document.getElementById("txtEdad").value
    }));
    mostrarTablaSession();
}

document.getElementById("btnSessionStorage").addEventListener('click', agregarSession);

// Funcion Actualizar Tabla Local Storage =========================================================
function mostrarTablaLocal() {
    var tabla = document.getElementById("tblLocal");
    var tbody = tabla.getElementsByTagName("tbody")[0];

    // Limpiar el contenido existente de la tabla
    tbody.innerHTML = '';

    // Iterar sobre el array de personas y agregar una fila por cada persona
    for(let i=0;i <localStorage.length; i++){
        let elemento = JSON.parse(localStorage.getItem(localStorage.key(i)));

        var fila = document.createElement("tr");

        // Agregar celdas con los datos de la persona
        var celdaApellido = document.createElement("td");
        celdaApellido.textContent = elemento.apellido;
        fila.appendChild(celdaApellido);

        var celdaNombre = document.createElement("td");
        celdaNombre.textContent = elemento.nombre;
        fila.appendChild(celdaNombre);

        var celdaEdad = document.createElement("td");
        celdaEdad.textContent = elemento.edad;
        fila.appendChild(celdaEdad);

        // Agregar la fila a la tabla
        tbody.appendChild(fila);
    }
}

mostrarTablaLocal();

// Funcion Actualizar Tabla Session Storage =======================================================
function mostrarTablaSession() {
    var tabla = document.getElementById("tblSession");
    var tbody = tabla.getElementsByTagName("tbody")[0];

    // Limpiar el contenido existente de la tabla
    tbody.innerHTML = '';

    // Iterar sobre el array de personas y agregar una fila por cada persona
    for(let i=0;i <sessionStorage.length; i++){
        let elemento = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));

        var fila = document.createElement("tr");

        // Agregar celdas con los datos de la persona
        var celdaApellido = document.createElement("td");
        celdaApellido.textContent = elemento.apellido;
        fila.appendChild(celdaApellido);

        var celdaNombre = document.createElement("td");
        celdaNombre.textContent = elemento.nombre;
        fila.appendChild(celdaNombre);

        var celdaEdad = document.createElement("td");
        celdaEdad.textContent = elemento.edad;
        fila.appendChild(celdaEdad);

        // Agregar la fila a la tabla
        tbody.appendChild(fila);
    }
}

mostrarTablaSession();