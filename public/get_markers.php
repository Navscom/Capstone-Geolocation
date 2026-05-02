<?php
require 'db.php';
// Fetch everything including the new crowd_count and risk_level
$stmt = $pdo->query("SELECT latitude, longitude, marker_type, risk_level, crowd_count, radius_meters FROM markers");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>