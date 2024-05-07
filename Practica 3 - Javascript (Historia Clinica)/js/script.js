limpiarElementos();
//Funciones Selectores Paises y Ciudades =============================================================================
// Array de ciudades por país
var ciudadesPorPais = {
    ecuador: ["Quito", "Cuenca"],
    colombia: ["Bogotá", "Medellín"],
    brasil: ["Sao Paulo", "Brasilia"]
};

// Función para actualizar las ciudades cuando se cambia el país
function actualizarCiudades() {
    var paisSeleccionado = document.getElementById("paisSelect").value;
    var ciudades = ciudadesPorPais[paisSeleccionado];

    // Limpiar las opciones anteriores
    var ciudadSelect = document.getElementById("ciudadSelect");
    ciudadSelect.innerHTML = '';

    // Agregar nuevas opciones de ciudad
    ciudades.forEach(function(ciudad) {
        var option = document.createElement("option");
        option.text = ciudad;
        option.value = ciudad;
        ciudadSelect.appendChild(option);
    });
}

// Llamar a la función para cargar las ciudades iniciales
actualizarCiudades();

// Agregar un evento para actualizar las ciudades cuando se cambie el país
document.getElementById("paisSelect").addEventListener("change", actualizarCiudades);

//Limpiar Vista ===========================================================================================================
function limpiarElementos(){
    document.getElementById("txtApellidos").value = "";
    document.getElementById("txtNombres").value = "";
    document.getElementById("txtDireccion").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("fechaNacimiento").value = "";
    document.getElementById("imagenSeleccionada").src = "images/fotoDefault.png";
    ocultarAlerta("alertaGuardar");
}

//Funciones para vista de la imagen a subir ================================================================================
document.getElementById("fotoInput").addEventListener("change", function(event) {
    var imagen = document.getElementById("imagenSeleccionada");
    var imagenContainer = document.getElementById("imagenContainer");

    // Verificar si se seleccionó un archivo
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            // Mostrar la imagen seleccionada
            imagen.src = e.target.result;
            imagen.style.display = "block";
        };

        // Leer el archivo como una URL de datos
        reader.readAsDataURL(event.target.files[0]);
    } else {
        // Si no se selecciona ningún archivo, ocultar la imagen
        imagen.src = "images/fotoDefault.png"; // Establecer la imagen por defecto
        imagen.style.display = "block"; // Asegurarse de que la imagen sea visible
    }
});

// Datos Personas Ingresadas =================================================================================================
var personas = [
    {
        apellidos: "Alvarado Suarez",
        nombres: "Kevin Mateo",
        direccion: "Urbanizacion los Capulies",
        telefono: "0969088178",
        fechaNacimiento: "2001-07-12T23:10",
        pais: "Ecuador",
        ciudad: "Cuenca",
        foto: "images/fotoPrueba.png"
    },
    {
        apellidos: "Gomez Perez",
        nombres: "Laura Valentina",
        direccion: "Calle 123",
        telefono: "0987654321",
        fechaNacimiento: "1995-05-20T10:30",
        pais: "Colombia",
        ciudad: "Bogotá",
        foto: "images/fotoDefault.png"
    },
    {
        apellidos: "Martinez Diaz",
        nombres: "Juan Pablo",
        direccion: "Avenida Principal",
        telefono: "0998765432",
        fechaNacimiento: "1980-12-15T15:45",
        pais: "Brasil",
        ciudad: "Sao Paulo",
        foto: "images/fotoDefault.png"
    }
];


var citas = [
    {
        apellidos: "Alvarado Suarez",
        nombres: "Kevin Mateo",
        fechaCita: "2024-05-03T23:10",
        especialidad: "general"
    },
    {
        apellidos: "Martinez Diaz",
        nombres: "Juan Pablo",
        fechaCita: "2024-07-03T23:10",
        especialidad: "otorrinolaringologia"
    },
    {
        apellidos: "Gomez Perez",
        nombres: "Laura Valentina",
        fechaCita: "2024-06-15T23:10",
        especialidad: "neurologia"
    },
];

var hijos = [
    {
        apellidosPadre: "Alvarado Suarez",
        nombresPadre: "Kevin Mateo",
        apellidosHijo: "Martinez Diaz",
        nombresHijo: "Juan Pablo"
    }
]

//Mostrar Datos Tabla Personas ========================================================================================================
// Función para mostrar los datos en la tabla
function mostrarTablaCitas() {
    var tabla = document.getElementById("tablaCitas");
    var tbody = tabla.getElementsByTagName("tbody")[0];

    // Limpiar el contenido existente de la tabla
    tbody.innerHTML = '';

    // Iterar sobre el array de personas y agregar una fila por cada persona
    citas.forEach(function(elemento) {
        if(document.getElementById("txtApellidosMostrar").value==elemento.apellidos && document.getElementById("txtNombresMostrar").value==elemento.nombres){
            var fila = document.createElement("tr");

            // Agregar celdas con los datos de la persona
            var celdaFecha = document.createElement("td");
            celdaFecha.textContent = elemento.fechaCita.replace('T',' ');
            fila.appendChild(celdaFecha);

            var celdaEspecialidad = document.createElement("td");
            celdaEspecialidad.textContent = elemento.especialidad.toUpperCase();
            fila.appendChild(celdaEspecialidad);

            // Agregar la fila a la tabla
            tbody.appendChild(fila);
        }
    });
}

//Rellenar objetos Select
// Función para llenar el select con los nombres de los pacientes
function llenarSelectPacientes(objeto) {
    var select = document.getElementById(objeto);

    // Limpiar el contenido existente del select
    select.innerHTML = '';

    // Iterar sobre el array de pacientes y agregar una opción por cada paciente
    personas.forEach(function(persona) {
        var option = document.createElement("option");
        option.text = persona.apellidos + " " + persona.nombres ;
        select.add(option);
    });
}

// Llamar a la función para llenar el select con los nombres de los pacientes
llenarSelectPacientes("pacientesSelect");
llenarSelectPacientes("hijosSelect");

//Mostrar Datos Paciente ======================================================================================
function mostrarPaciente() {
    personas.forEach(function(elemento) {
        if(document.getElementById("pacientesSelect").value == elemento.apellidos + " " + elemento.nombres){
            //Mostrar Foto
            var imagen = document.getElementById("imagenSeleccionada2");
            imagen.src = elemento.foto;
            imagen.style.display = "block";

            //Mostrar apellidos
            document.getElementById("txtApellidosMostrar").value = elemento.apellidos;
            //Mostrar nombres
            document.getElementById("txtNombresMostrar").value = elemento.nombres;
            //Mostrar direcccion
            document.getElementById("txtDireccionMostrar").value = elemento.direccion;
            //Mostrar telefono
            document.getElementById("txtTelefonoMostrar").value = elemento.telefono;
            //Mostrar fecha nacimiento
            document.getElementById("txtFechaNacimientoMostrar").value = elemento.fechaNacimiento.replace('T',' ');
            //Mostrar edad exacta
            document.getElementById("txtEdadExactaMostrar").value = edadExacta(elemento.fechaNacimiento);
            //Mostrar ciudad y pais nacimiento
            document.getElementById("txtCiudadPaisMostrar").value = elemento.ciudad + " - " + elemento.pais;
        }
    });
    mostrarTablaCitas();
}

mostrarPaciente();

document.getElementById("pacientesSelect").addEventListener("change", mostrarPaciente);

function mostrarAlertaConTexto(objeto, texto) {
    var alerta = document.getElementById(objeto);
    alerta.innerText = texto; // o alerta.innerHTML = texto; según tus necesidades
    alerta.style.display = "block";
}

function ocultarAlerta(objeto) {
    var alerta = document.getElementById(objeto);
    alerta.style.display = "none";
}

//Guardar Nuevo Paciente ================================================================================================
function guardarPaciente(){
    if(!validarCadena(document.getElementById("txtApellidos").value)){
        mostrarAlertaConTexto("alertaGuardar", "Apellidos incorrectos");
    } else if (!validarCadena(document.getElementById("txtNombres").value)){
        mostrarAlertaConTexto("alertaGuardar", "Nombres incorrectos");
    }else if(!comprobarCadenaVacia(document.getElementById("txtDireccion").value)){
        console.log("Direccion");
    }else if(!validarTelefono(document.getElementById("txtTelefono").value)){
        console.log("Telefono");
    }else if(document.getElementById("fechaNacimiento").value.trim() == '' || !validarFecha(document.getElementById("fechaNacimiento").value)){
        console.log("Fecha")
    }else{
        var apellidos = document.getElementById("txtApellidos").value;
        var nombres = document.getElementById("txtNombres").value;
        var direccion = document.getElementById("txtDireccion").value;
        var telefono = document.getElementById("txtTelefono").value;
        var fechaNacimiento = document.getElementById("fechaNacimiento").value;
        var pais = document.getElementById("paisSelect").value;
        var ciudad = document.getElementById("ciudadSelect").value;
        var foto = document.getElementById("imagenSeleccionada").src;

        personas.push({apellidos, nombres, direccion, telefono, fechaNacimiento, pais, ciudad, foto});
        llenarSelectPacientes("pacientesSelect");
        llenarSelectPacientes("hijosSelect");


        limpiarElementos();
    }
}

document.getElementById("btnGuardar").addEventListener("click", guardarPaciente);
//Guardar Nueva Cita ==================================================================================================
function agendarCita(){
    if(validarFecha(document.getElementById("fechaCita").value.trim() == '' || document.getElementById("fechaCita").value)){
        console.log("Fecha Cita");
    }else{
        var apellidos = document.getElementById("txtApellidosMostrar").value;
        var nombres = document.getElementById("txtNombresMostrar").value;
        var fechaCita = document.getElementById("fechaCita").value;
        var especialidad = document.getElementById("especialidadSelect").value;

        citas.push({apellidos, nombres, fechaCita, especialidad});

        document.getElementById("fechaCita").value = "";

        mostrarTablaCitas();
    }
}



document.getElementById("btnAgendar").addEventListener("click", agendarCita);
//Validaciones ========================================================================================================
function validarTelefono(telefono){
    // Expresión regular para validar que la cadena contenga solo numeros y tamaño de 10 caracteres
    var regex = /^[0-9]{10}$/;
    return regex.test(telefono);
}

function validarCadena(cadena) {
    // Expresión regular para validar que la cadena contenga solo letras
    var regex = /^[a-zA-Z]+$/;
    return regex.test(cadena);
}

function comprobarCadenaVacia(cadena){
    // Verificar si la cadena no está vacía
    if (cadena.trim().length === 0) {
        // La cadena está vacía
        return false;
    } else {
        // La cadena no está vacía
        return true;
    }
}

function validarFecha(fecha){
    // Parsea la fecha de nacimiento
    var fechaValidar = new Date(fecha);
    // Obtiene la fecha actual
    var fechaActual = new Date();
    // Calcula la diferencia en milisegundos
    var diferenciaTiempo = fechaActual - fechaValidar;
    if (diferenciaTiempo>0) return true;
    else return false;
}

//Calcular Edad Exacta =============================================================================================
function edadExacta(fechaNacimiento){
    // Parsea la fecha de nacimiento
    var fechaNacimiento = new Date(fechaNacimiento);
    
    // Obtiene la fecha actual
    var fechaActual = new Date();
    
    // Calcula la diferencia en milisegundos
    var diferenciaTiempo = fechaActual - fechaNacimiento;
    
    // Calcula la edad en años
    var edadEnAños = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    
    // Ajusta la edad en años si aún no se ha alcanzado el mes de nacimiento
    if (fechaActual.getMonth() < fechaNacimiento.getMonth() ||
        (fechaActual.getMonth() == fechaNacimiento.getMonth() && fechaActual.getDate() < fechaNacimiento.getDate())) {
        edadEnAños--;
    }
    
    // Obtiene la fecha de cumpleaños para el próximo año
    var proximoCumpleaños = new Date(fechaActual.getFullYear(), fechaNacimiento.getMonth(), fechaNacimiento.getDate());
    
    // Calcula los días restantes para el próximo cumpleaños
    var diasRestantes = Math.floor((proximoCumpleaños - fechaActual) / (1000 * 60 * 60 * 24));
    
    // Calcula los meses y días
    var meses = fechaActual.getMonth() - fechaNacimiento.getMonth();
    if (meses < 0 || (meses === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
        edadEnAños--;
        meses += 12;
    }
    
    var dias = fechaActual.getDate() - fechaNacimiento.getDate();
    if (dias < 0) {
        var ultimoDiaMesAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0).getDate();
        dias = ultimoDiaMesAnterior - fechaNacimiento.getDate() + fechaActual.getDate();
        meses--;
    }

    return (edadEnAños + " años, " + meses + " meses y " + dias + " días.");
}