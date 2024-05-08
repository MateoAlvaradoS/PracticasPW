//Funcion para evento click en un boton ===========================================================
function eventoClick (nombre, funcion){
    document.getElementById(nombre).addEventListener("click", funcion);
}

// Variables y constantes necesarias ==============================================================
let numPreguntas = 0;
let tipoPreguntasGeneradas = [];
let respuestas = [];

document.getElementById("btnGenerarCuestionario").style.visibility = "hidden";
cambioTipoP();

// Evento cambio de tipo pregunta ===================================================================
function cambioTipoP(){
    // Esta función se ejecutará cada vez que se cambie la opción seleccionada
    var seleccion = document.getElementById("selectPregunta").value;
    if(seleccion=='multiple'){
        document.getElementById("seccionNumOpciones").style.visibility = "visible";
        document.getElementById("txtNumOpciones").value = "";
    }
    else{
        document.getElementById("seccionNumOpciones").style.visibility = "hidden";
    }
}

document.getElementById("selectPregunta").addEventListener("change", cambioTipoP);

// Función para mostrar un mensaje de error en el modal ===========================================
function mostrarError(mensaje) {
    document.getElementById("mensajeError").textContent = mensaje;
    $('#modalAgregarSecciones').modal('show');
}

// Funcion para generar las preguntas escogiendo el tipo de pregunta deseado =====================
function generarPreguntas(){
    let tipoPregunta = document.getElementById("selectPregunta").value;
    let valorIngresado = document.getElementById("txtNumOpciones").valueAsNumber;

    if(tipoPregunta=="multiple" && (isNaN(valorIngresado) || valorIngresado <= 0)){
        mostrarError("Ingrese el número de opciones");
    }
    else{
        numPreguntas++;

        tipoPreguntasGeneradas.push([numPreguntas, tipoPregunta]);
        generarSeccionPregunta(numPreguntas, tipoPregunta);
        


        if(numPreguntas==1){
            document.getElementById("btnGenerarCuestionario").style.visibility = "visible";
        }
    }

    
}

eventoClick("btnGenerarPregunta", generarPreguntas);

// Fucion para generar espacios necesarios para informacion de cada tipo de pregunta ==============
function generarSeccionPregunta(num, tipo){
    let pregunta =  document.createElement("div");
    pregunta.className = "ordenarEnColumnas";
    pregunta.id = "pregunta" + num;

    let elementos =  "<h3>Pregunta " + num + "</h3>" +
    "<label for=\"txtPregunta" + num + "\">Ingrese la pregunta:</label>" + 
    "<input type=\"text\" id=\"txtPregunta" + num + "\" class=\"form-control\">";
    

    if (tipo == "texto"){
        elementos = elementos +
        "<label for=\"txtRPregunta" + num + "\">Ingrese la respuesta:</label>" + 
        "<input type=\"text\" id=\"txtRPregunta" + num + "\" class=\"form-control\">";
    }
    else if (tipo == "multiple"){
        elementos = elementos +
        "<div id = \"contenedorOpPregunta" + num + "\" class=\"ordenarEnColumnas\">"+
        "<h4>Opciones:</h4>";
        
        for (var i = 0; i < document.getElementById("txtNumOpciones").valueAsNumber; i++) {
            elementos = elementos + 
            "<label class=\"ordenarEnFilas\"><input type=\"checkbox\" id=\"cbxPregunta" + num + "Op" + (i+1) + "\" value=\"valor" + i + "\"><input type=\"text\" id=\"txtPregunta" + num + "Op" + (i+1) + "\" class=\"form-control\" placeholder=\"Escriba la opción\"></label>";
        }
        
        elementos = elementos + "</div>";
    }

    else if (tipo == "verFal"){
        elementos = elementos + "<label><input type=\"radio\" id=\"ver" + num + "\" name=\"verFal" + num + "\" value=\"verdadero\">Verdadero</label>" + 
        "<label><input type=\"radio\" id=\"fal" + num + "\" name=\"verFal" + num + "\" value=\"falso\">Falso</label>";
    }

    pregunta.innerHTML = elementos;

    document.getElementById("formulario").append(pregunta);
}

// Funcion para generar el cuestionario final
function generarFormulario(){
    respuestas = [];
    for (var i = 0; i < tipoPreguntasGeneradas.length; i++) {
        var subArray = tipoPreguntasGeneradas[i];
        // Recorriendo cada subarray
        console.log(subArray[0] + subArray[1]);

        if (subArray[1]=="texto"){
            if (document.getElementById("txtPregunta" + subArray[0]).value.length > 0 && document.getElementById("txtRPregunta" + subArray[0]).value.length > 0){
                respuestas.push([document.getElementById("txtPregunta" + subArray[0]).value, document.getElementById("txtRPregunta" + subArray[0]).value]);
            }
            else {
                console.log("Los cuadros estan vacios");
            }
        }
        
        else if (subArray[1]=="multiple"){
            let elementosContenedor = document.getElementById("contenedorOpPregunta" + subArray[0]).childElementCount - 1;
            let banderaLlenado = true;
            let banderaSeleccionado = false;

            for (var j = 0; j < elementosContenedor; j++){
                if (document.getElementById("txtPregunta" + subArray[0] +"Op" + (j+1)).value.length <= 0) banderaLlenado = false;

                if(document.getElementById("cbxPregunta"+ subArray[0] + "Op" + (j+1)).checked==true) banderaSeleccionado = true;

            }

            if (document.getElementById("txtPregunta" + subArray[0]).value.length <= 0) banderaLlenado = false;

            if (banderaLlenado==true && banderaSeleccionado==true){
                console.log("las opciones estas llenas");
            }
            else if (banderaLlenado==false){
                console.log("las opciones estas vacias");
            }
            else if (banderaSeleccionado==false){
                console.log("no se ha seleccionado una opcion");
            }
        }

        else if (subArray[1]=="verFal"){
            let banderaSeleccionado = false;
            var radiobuttons = document.getElementsByName("verFal"+subArray[0]);

            if (document.getElementById("txtPregunta" + subArray[0]).value.length > 0){
                for (var i = 0; i < radiobuttons.length; i++) {
                    // Verificar si el radiobutton actual está marcado
                    if (radiobuttons[i].checked) {
                        banderaSeleccionado = true;
                        respuestas.push([document.getElementById("txtPregunta" + subArray[0]).value, radiobuttons[i].value]);
                        break; // Salir del bucle si al menos uno está marcado
                    }
                }

                if (banderaSeleccionado == false) console.log("No se ha seleccionado la respuesta");
            }
            else {
                console.log("No se ha ingresado la pregunta");
            }
        }
    }
}

document.getElementById("btnGenerarCuestionario").addEventListener("click", generarFormulario);
