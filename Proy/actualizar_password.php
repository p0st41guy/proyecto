<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $correo = trim($_POST['correo']);
    $nuevaClave = password_hash(trim($_POST['clave']), PASSWORD_DEFAULT);

    $sql = "UPDATE registro1 SET clave = ? WHERE correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $nuevaClave, $correo);

    if ($stmt->execute()) {
        echo "ok";
    } else {
        echo "error";
    }

    $stmt->close();
}

$conn->close();
?>