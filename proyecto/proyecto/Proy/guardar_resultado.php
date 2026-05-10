<?php
session_start();
include("conexion.php");

if (!isset($_SESSION['correo'])) {
    echo "no_session";
    exit();
}

$correo = $_SESSION['correo'];
$carrera = $_POST['carrera'];

// 🔥 Mostrar errores de MySQL
$sql = "INSERT INTO respuestas (nombre, correo, telefono, escuela, Caree)
        SELECT nombre, correo, telefono, escuela, ?
        FROM registro1
        WHERE correo = ?";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Error en prepare: " . $conn->error);
}

$stmt->bind_param("ss", $carrera, $correo);

if ($stmt->execute()) {
    echo "ok";
} else {
    echo "Error al ejecutar: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>