<?php
session_start(); // 
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $escuela = $_POST['escuela'];
    $clave = password_hash($_POST['clave'], PASSWORD_DEFAULT);

    //  Evitar correos duplicados
    $verificar = "SELECT * FROM registro1 WHERE correo = ?";
    $stmt = $conn->prepare($verificar);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        echo "existe";
        exit();
    }

    //  Insertar usuario
    $sql = "INSERT INTO registro1 (nombre, correo, telefono, clave, escuela)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $nombre, $correo, $telefono, $clave, $escuela);

    if ($stmt->execute()) {

        //  GUARDAR SESIÓN AUTOMÁTICAMENTE
        $_SESSION['correo'] = $correo;
        $_SESSION['nombre'] = $nombre;

        echo "ok";
    } else {
        echo "error";
    }

    $stmt->close();
}

$conn->close();
?>