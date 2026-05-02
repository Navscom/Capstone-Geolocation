<?php
require 'jwt.php';
require 'captcha.php';
require 'db.php';

$headers = getallheaders();
$token = $headers['Authorization'] ?? '';
$userId = verifyJWT(str_replace("Bearer ", "", $token));

if (!$userId) {
    http_response_code(403);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!verifyCaptcha($data['captcha_token'])) {
    http_response_code(400);
    echo json_encode(["error" => "Captcha failed"]);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO markers (latitude, longitude, marker_type, created_by) VALUES (?, ?, ?, ?)");
$stmt->execute([$data['latitude'], $data['longitude'], $data['marker_type'], $userId]);

echo json_encode(["success" => true]);
?>
