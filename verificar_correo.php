<?php
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $correo = trim($_POST['correo']);

    $sql = "SELECT correo FROM registro1 WHERE correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        echo "ok";
    } else {
        echo "no_existe";
    }

    $stmt->close();
}

$conn->close();
?>