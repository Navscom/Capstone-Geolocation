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

// Integrity Check: Capcha is mandatory
if (!verifyCaptcha($data['captcha_token'])) {
    http_response_code(400);
    echo json_encode(["error" => "Captcha failed"]);
    exit;
}

// Prepare the statement with new data fields (danger, manual entry)
$stmt = $pdo->prepare("INSERT INTO markers (latitude, longitude, marker_type, risk_level, created_by) VALUES (?, ?, 'danger', ?, ?)");
$stmt->execute([
    $data['latitude'], 
    $data['longitude'], 
    $data['risk_level'], // New data
    $userId
]);

echo json_encode(["success" => true]);
?>