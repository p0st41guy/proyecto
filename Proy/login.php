<?php
session_start(); 
include("conexion.php");

$correo = trim($_POST['correo']);
$clave = trim($_POST['clave']);

$sql = "SELECT * FROM registro1 WHERE correo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();

$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $user = $resultado->fetch_assoc();

    if (password_verify($clave, $user['clave'])) {
        
        //  GUARDAR SESIÓN DEL USUARIO
        $_SESSION['correo'] = $user['correo'];
        $_SESSION['nombre'] = $user['nombre'];

        echo "ok";
    } else {
        echo "error";
    }
} else {
    echo "error";
}

$stmt->close();
$conn->close();
?>