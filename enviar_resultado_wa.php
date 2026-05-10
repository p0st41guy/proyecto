<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
    $mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

    if (empty($telefono) || empty($mensaje)) { 
        echo "error_datos";
        exit; 
    }

    // Limpiamos el número
    $telefono_limpio = preg_replace('/[^0-9]/', '', $telefono);

    $url = "http://localhost:8080/message/sendText/bot_ita";
    $apikey = "clave_secreta_ita_2026";

    $data = [
        "number" => $telefono_limpio,
        "options" => [
            "delay" => 1500,
            "presence" => "composing" 
        ],
        "textMessage" => [
            "text" => $mensaje
        ]
    ];

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
        echo "Error cURL: " . $err; 
    } else { 
        // AHORA IMPRIMIMOS LA RESPUESTA REAL DE LA API
        echo $response; 
    }
}
?>