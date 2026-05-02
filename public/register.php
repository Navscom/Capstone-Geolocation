<?php
require 'db.php';

$username = $_POST['username'];
$password = $_POST['password'];

$hash = password_hash($password, PASSWORD_BCRYPT);

$stmt = $pdo->prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)");
try {
    $stmt->execute([$username, $hash]);
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["error" => "Username already exists"]);
}
?>
