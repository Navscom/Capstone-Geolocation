<?php
function verifyCaptcha($captchaToken) {
    $secretKey = "YOUR_RECAPTCHA_SECRET";
    $url = "https://www.google.com/recaptcha/api/siteverify";
    $response = file_get_contents($url."?secret=".$secretKey."&response=".$captchaToken);
    $data = json_decode($response);
    return $data->success;
}
?>
