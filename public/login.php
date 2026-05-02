$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$u]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// This matches the password_hash column we just updated
if ($user && password_verify($p, $user['password_hash'])) {
    echo json_encode(["status" => "success", "username" => $user['username']]);
} else {
    echo json_encode(["status" => "error", "message" => "Incorrect name or password"]);
}