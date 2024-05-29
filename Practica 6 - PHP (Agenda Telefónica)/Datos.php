<?php
// Conexion a la base de datos
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

// Funcion generica para ingresar datos en una tabla
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

// Funcion generica para eliminar datos en una tabla
function eliminar($tableName, $conditions) {
    // Obtener la conexión a la base de datos
    $conn = getDatabaseConnection();

    // Construir la cláusula WHERE
    $whereClauses = [];
    foreach ($conditions as $column => $value) {
        $whereClauses[] = "$column = :$column";
    }
    $whereClause = implode(" AND ", $whereClauses);

    $sql = "DELETE FROM $tableName WHERE $whereClause";

    // Preparar y ejecutar la consulta
    $stmt = $conn->prepare($sql);
    foreach ($conditions as $column => $value) {
        $stmt->bindValue(":$column", $value);
    }

    if ($stmt->execute()) {
        echo "Eliminación exitosa";
    } else {
        echo "Error en la eliminación: " . $stmt->errorInfo()[2];
    }

    // Cerrar la conexión
    $conn = null;
}

// Funcion generica para actualizar datos en una tabla
function actualizar($object, $conditions) {
    // Obtener la conexión a la base de datos
    $conn = getDatabaseConnection();

    // Obtener el nombre del objeto (tabla)
    $tableName = gettype($object);

    // Obtener las propiedades del objeto y sus valores
    $properties = get_object_vars($object);

    // Construir la consulta SQL
    $setClauses = [];
    foreach ($properties as $column => $value) {
        $setClauses[] = "$column = :$column";
    }
    $setClause = implode(", ", $setClauses);

    // Construir la cláusula WHERE
    $whereClauses = [];
    foreach ($conditions as $column => $value) {
        $whereClauses[] = "$column = :$column";
    }
    $whereClause = implode(" AND ", $whereClauses);

    $sql = "UPDATE $tableName SET $setClause WHERE $whereClause";

    // Preparar y ejecutar la consulta
    $stmt = $conn->prepare($sql);
    foreach ($properties as $column => $value) {
        $stmt->bindValue(":$column", $value);
    }
    foreach ($conditions as $column => $value) {
        $stmt->bindValue(":$column", $value);
    }

    if ($stmt->execute()) {
        echo "Actualización exitosa";
    } else {
        echo "Error en la actualización: " . $stmt->errorInfo()[2];
    }

    // Cerrar la conexión
    $conn = null;
}

?>