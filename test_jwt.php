<?php

$header = [
    'alg' => 'HS256', // HMAC - SHA 256
    'typ' => 'JWT'
];

$header_json = json_encode($header);
$header_base64 = base64_encode($header_json);

//echo "Cabeçalho JSON:  $header_json";
//echo "\n";
//echo "Cabeçalho JWT: $header_base64";
//echo "\n";


$payload = [
    'first_name' => 'Adriano',
    'last_name' => 'Felix de Freitas',
    'email' => 'milicofelix@gmail.com'
];

$payload_json = json_encode($payload);
$payload_base64 = base64_encode($payload_json);
//echo "\n\n";
//echo "Cabeçalho JSON:  $payload_json";
//echo "\n";
//echo "Cabeçalho JWT: $payload_base64";
//echo "\n";
//echo "{$header_base64}.{$payload_base64}";


$key = "81hnduunbahyu9ojknsiuhsnhgd";
$signature = hash_hmac('sha256',$header_base64.$payload_base64,$key,true);
$signature_base64 = base64_encode($signature);
//echo "Assinatura: $signature";
//echo "\n";
//echo $signature_base64;
//echo "\n";
echo "{$header_base64}.{$payload_base64}.{$signature_base64}";

echo "\n\n";