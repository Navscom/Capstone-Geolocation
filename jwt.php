<?php
require 'vendor/autoload.php'; // install firebase/php-jwt via Composer
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret = "YOUR_SECRET_KEY";

function createJWT($userId) {
    global $secret;
    $payload = [
        "userId" => $userId,
        "exp" => time() + 3600
    ];
    return JWT::encode($payload, $secret, 'HS256');
}

function verifyJWT($token) {
    global $secret;
    try {
        $decoded = JWT::decode($token, new Key($secret, 'HS256'));
        return $decoded->userId;
    } catch (Exception $e) {
        return false;
    }
}
?>
