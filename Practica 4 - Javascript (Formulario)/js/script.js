// Variables y constantes necesarias ==========================================================================================================================
let numPreguntas = 0;
let tipoPreguntasGeneradas = [];
let respuestas = [];


document.getElementById("btnGenerarCuestionario").style.visibility = "hidden";
cambioTipoP();

// Evento cambio de tipo pregunta =============================================================================================================================
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

// Función para mostrar un mensaje de error en el modal =======================================================================================================
function mostrarError(mensaje) {
    document.getElementById("mensajeError").textContent = mensaje;
    $('#modalAgregarSecciones').modal('show');
}

// Funcion para generar las preguntas escogiendo el tipo de pregunta deseado ==================================================================================
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
document.getElementById("btnGenerarPregunta").addEventListener("click", generarPreguntas);

// Fucion para generar espacios necesarios para informacion de cada tipo de pregunta ==========================================================================
function generarSeccionPregunta(num, tipo){
    let pregunta =  document.createElement("div");
    pregunta.className = "ordenarEnColumnas margenes";
    pregunta.id = "pregunta" + num;

    let elementos =  "<h4>Pregunta " + num + "</h4>" +
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
        "<h4>Opciones:</h4>" +
        "<label id=\"ordenP" + num + "\">Escoja al menos una respuesta</label> ";
        
        for (var i = 0; i < document.getElementById("txtNumOpciones").valueAsNumber; i++) {
            elementos = elementos + 
            "<label class=\"ordenarEnFilas\"><input type=\"checkbox\" id=\"cbxPregunta" + num + "Op" + (i+1) + "\" value=\"valor" + i + "\"><input type=\"text\" id=\"txtPregunta" + num + "Op" + (i+1) + "\" class=\"form-control\" placeholder=\"Escriba la opción\"></label>";
        }
        elementos = elementos + "</div>";
    }

    else if (tipo == "verFal"){
        elementos = elementos + "<h4>Opciones:</h4>" +
        "<label id=\"ordenP" + num + "\">Escoja solamente una respuesta</label> " +
        "<label><input type=\"radio\" id=\"ver" + num + "\" name=\"verFal" + num + "\" value=\"verdadero\">Verdadero</label>" + 
        "<label><input type=\"radio\" id=\"fal" + num + "\" name=\"verFal" + num + "\" value=\"falso\">Falso</label>";
    }

    pregunta.innerHTML = elementos;
    document.getElementById("formulario").append(pregunta);
    document.getElementById("pregunta" + num).scrollIntoView();
}

// Funcion para generar el cuestionario final =================================================================================================================
function generarFormulario(){
    let banderaDatosCompletos = true;
    respuestas = [];
    for (var i = 0; i < tipoPreguntasGeneradas.length; i++) {
        var subArray = tipoPreguntasGeneradas[i];

        /* Función para validar las preguntas textuales */
        if (subArray[1]=="texto"){
            if (document.getElementById("txtPregunta" + subArray[0]).value.length > 0 && document.getElementById("txtRPregunta" + subArray[0]).value.length > 0){
                respuestas.push([subArray[1], document.getElementById("txtPregunta" + subArray[0]).value, document.getElementById("txtRPregunta" + subArray[0]).value]);
            }
            else {
                mostrarError("Complete la información faltante");
                banderaDatosCompletos = false;
            }

            if(document.getElementById("txtPregunta" + subArray[0]).value.length <= 0){
                document.getElementById("txtPregunta" + subArray[0]).classList.add("border", "border-danger");
            }
            else {
                document.getElementById("txtPregunta" + subArray[0]).classList.remove("border", "border-danger");
            }

            if(document.getElementById("txtRPregunta" + subArray[0]).value.length <= 0){
                document.getElementById("txtRPregunta" + subArray[0]).classList.add("border", "border-danger");
            }
            else {
                document.getElementById("txtRPregunta" + subArray[0]).classList.remove("border", "border-danger");
            }
        }
        
        /* Función para validar las preguntas de opción múltiple */
        else if (subArray[1]=="multiple"){
            let elementosContenedor = document.getElementById("contenedorOpPregunta" + subArray[0]).childElementCount - 2;
            let banderaLlenado = true;
            let banderaSeleccionado = false;

            for (var j = 0; j < elementosContenedor; j++){
                if (document.getElementById("txtPregunta" + subArray[0] + "Op" + (j+1)).value.length <= 0){
                    banderaLlenado = false;
                    document.getElementById("txtPregunta" + subArray[0] + "Op" + (j+1)).classList.add("border", "border-danger");
                }
                else {
                    document.getElementById("txtPregunta" + subArray[0] +"Op" + (j+1)).classList.remove("border", "border-danger");
                }

                if(document.getElementById("cbxPregunta"+ subArray[0] + "Op" + (j+1)).checked){
                    banderaSeleccionado = true;
                }
            }

            if (document.getElementById("txtPregunta" + subArray[0]).value.length <= 0){
                document.getElementById("txtPregunta" + subArray[0]).classList.add("border", "border-danger");
                banderaLlenado = false;
            }
            else {
                document.getElementById("txtPregunta" + subArray[0]).classList.remove("border", "border-danger");
            }

            if (banderaLlenado==true && banderaSeleccionado==true){
                let respuestasMultiples = [];
                
                document.getElementById("ordenP" + subArray[0]).style.color = "black";

                for (var j = 0; j < elementosContenedor; j++){
                    if(document.getElementById("cbxPregunta"+ subArray[0] + "Op" + (j+1)).checked) respuestasMultiples.push(document.getElementById("txtPregunta" + subArray[0] +"Op" + (j+1)).value);
                }

                respuestas.push([subArray[1], document.getElementById("txtPregunta" + subArray[0]).value, respuestasMultiples]);    
            }
            else {
                mostrarError("Complete la información faltante");
                banderaDatosCompletos = false;
                if (banderaSeleccionado==false){
                    document.getElementById("ordenP" + subArray[0]).style.color = "red";
                }
            }
        }

        /* Función para validar las preguntas de tipo Verdadero/Falso */
        else if (subArray[1]=="verFal"){
            let banderaSeleccionado = false;
            var radiobuttons = document.getElementsByName("verFal"+subArray[0]);

            if (document.getElementById("txtPregunta" + subArray[0]).value.length > 0 && (document.getElementById("ver" + subArray[0]).checked || document.getElementById("fal" + subArray[0]).checked)){
                if (document.getElementById("ver" + subArray[0]).checked){
                    respuestas.push([subArray[1], document.getElementById("txtPregunta" + subArray[0]).value, "Verdadero"]);
                }
                if (document.getElementById("fal" + subArray[0]).checked){
                    respuestas.push([subArray[1], document.getElementById("txtPregunta" + subArray[0]).value, "Falso"]);
                }
            }
            else {
                banderaDatosCompletos = false;
            }

            if (document.getElementById("txtPregunta" + subArray[0]).value.length <= 0){
                mostrarError("Complete la información faltante");
                document.getElementById("txtPregunta" + subArray[0]).classList.add("border", "border-danger");
            }
            else {
                document.getElementById("txtPregunta" + subArray[0]).classList.remove("border", "border-danger");
            }

            if (!document.getElementById("ver" + subArray[0]).checked && !document.getElementById("fal" + subArray[0]).checked){
                mostrarError("Complete la información faltante");
                document.getElementById("ordenP" + subArray[0]).style.color = "red";
            }
            else {
                document.getElementById("ordenP" + subArray[0]).style.color = "black";
            }
        }
    }

    if (banderaDatosCompletos == true){
        mostrarPreguntasRespuestas();
        document.getElementById("mostrarPreguntasRespuestas").scrollIntoView();
    }
    else {
        limpiarSolucionario();
    }
}

document.getElementById("btnGenerarCuestionario").addEventListener("click", generarFormulario);

// Funcion para mostrar las respuestas del cuestionario =======================================================================================================
function mostrarPreguntasRespuestas (){
    limpiarSolucionario();

    /* Agregar un titulo a la sección respuestas */
    var h1 = document.createElement("h2");
    h1.innerHTML = "Solucionario";
    document.getElementById("mostrarPreguntasRespuestas").appendChild(h1);

    /* Funcion para agregar cada pregunta con su respectiva respuesta(s) */
    for (var i = 0; i<respuestas.length; i++){
        var preguntaIndividual = respuestas[i];
        let pregunta =  document.createElement("div");
        pregunta.className = "ordenarEnColumnas";

        let elementos = "<h4>Pregunta " + (i+1) + "</h4>" +
        "<label>Pregunta:</label><label>" + preguntaIndividual[1] + "</label>" + 
        "<label>Respuesta(s):</label>";
        
        if (preguntaIndividual[0] == "multiple"){
            let respuestasMultiples = preguntaIndividual[2];
            for (var j = 0; j < respuestasMultiples.length; j++){
                elementos = elementos + "<label>" + respuestasMultiples[j] + "</label>";
            }
        }
        else {
            elementos = elementos + "<label>" + preguntaIndividual[2] + "</label>";
        }

        pregunta.innerHTML = elementos;
        document.getElementById("mostrarPreguntasRespuestas").append(pregunta);
    }
}

//Funcion para limpiar respuestas del solucionario ============================================================================================================
function limpiarSolucionario(){
    /* Eliminar todos los elementos existentes en la sección para mostrar respuestas */
    while (document.getElementById("mostrarPreguntasRespuestas").firstChild) {
        document.getElementById("mostrarPreguntasRespuestas").removeChild(document.getElementById("mostrarPreguntasRespuestas").firstChild);
    }
}
