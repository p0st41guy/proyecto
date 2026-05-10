<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Recibir los datos de tu HTML
    $telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
    $codigo = isset($_POST['codigo']) ? trim($_POST['codigo']) : '';

    if (empty($telefono) || empty($codigo)) { 
        echo "error_datos";
        exit; 
    }

    // Limpiar el número y agregar el 52 de México si no lo tiene
    $telefono_limpio = preg_replace('/[^0-9]/', '', $telefono);
    if (substr($telefono_limpio, 0, 2) !== "52") {
        $telefono_limpio = "52" . $telefono_limpio;
    }

    // --- CONFIGURACIÓN DE TU SERVIDOR LOCAL ---
    $url = "http://localhost:8080/message/sendText/bot_ita";
    $apikey = "clave_secreta_ita_2026";

    // El mensaje libre que le llegará al alumno
    $mensaje = "¡Hola! 🎓\n\nTu código de acceso para el Test Vocacional es: *" . $codigo . "*\n\nMucho éxito en tu prueba.";

    // Estructura de datos para Evolution API
    $data = [
        "number" => $telefono_limpio,
        "options" => [
            "delay" => 1200, // Simula que está escribiendo por 1 segundo
            "presence" => "composing" 
        ],
        "textMessage" => [
            "text" => $mensaje
        ]
    ];

    // Enviar la petición con cURL
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => array(
            "apikey: " . $apikey,
            "Content-Type: application/json"
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) { 
        echo "error_api"; 
    } else { 
        echo "ok"; 
    }
}
?>