<?php
function getDatabaseConnection() {
    // Datos de conexión
    $servername = "localhost";
    $username = "mateo";

    $password = "1234567891011";
    $dbname = "mateoDB";

    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    return $conn;
}

function insertar($object) {
    // Obtener la conexión a la base de datos
    $conn = getDatabaseConnection();

    // Obtener el nombre del objeto (tabla)
    $tableName = gettype($object);
    
    // Obtener las propiedades del objeto y sus valores
    $properties = get_object_vars($object);

    // Construir la consulta SQL
    $columns = implode(", ", array_keys($properties));
    $placeholders = ":" . implode(", :", array_keys($properties));

    $sql = "INSERT INTO $tableName ($columns) VALUES ($placeholders)";

    if ($conn->query($sql) === TRUE) {
        echo "Ingreso exitoso";
    } else {
        echo "Error en el ingreso: " . $conn->error;
    }

    // Cerrar la conexión
    $conn->close();
}
?>