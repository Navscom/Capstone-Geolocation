<?php
require_once __DIR__ . '/../src/db.php';
require_once __DIR__ . '/../src/jwt.php';
// rest of login code...


<?php
require 'jwt.php';
require 'db.php';

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password_hash'])) {
    $token = createJWT($user['id']);
    echo json_encode(["token" => $token]);
} else {
    http_response_code(401);
    echo json_encode(["error" => "Invalid credentials"]);
}
?>
