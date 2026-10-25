<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

$name = isset($input['name']) ? trim((string)$input['name']) : '';
$phone = isset($input['phone']) ? trim((string)$input['phone']) : '';
$email = isset($input['email']) ? trim((string)$input['email']) : '';
$searchParams = isset($input['searchParams']) ? (string)$input['searchParams'] : '';

if (empty($name) || empty($phone) || empty($email)) {
    http_response_code(400);
    echo json_encode(['error' => 'Пожалуйста, заполните все обязательные поля.']);
    exit;
}

$postData = [
    'formParams[first_name]' => $name,
    'formParams[phone]' => $phone,
    'formParams[email]' => $email,
    'formParams[userCustomFields][19069802]' => 'true',
    'formParams[willCreatePaidDeal]' => '1',
    'formParams[in_widget]' => '1',
    '__gc__internal__form__helper' => 'https://school.aisukam.ru/pl/lite/widget/widget?id=1656657'
];

if (!empty($searchParams)) {
    $queryString = ltrim($searchParams, '?');
    parse_str($queryString, $parsedParams);
    if (is_array($parsedParams)) {
        foreach ($parsedParams as $key => $val) {
            if (
                strpos($key, 'utm_') === 0 ||
                in_array($key, ['partner_code', 'gcSession', 'gcVisitor', 'gcVisit'])
            ) {
                $postData[$key] = $val;
            }
        }
    }
}

$ch = curl_init('https://school.aisukam.ru/pl/lite/block-public/process?id=2251411884');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/x-www-form-urlencoded; charset=UTF-8',
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 20);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    error_log("Landing candles order gateway cURL error: {$curlError}");
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка связи с платежным шлюзом. Пожалуйста, попробуйте позже.']);
    exit;
}

$data = json_decode($response, true);

if (isset($data['success']) && $data['success'] && !empty($data['data']['redirectUrl'])) {
    echo json_encode([
        'success' => true,
        'redirectUrl' => $data['data']['redirectUrl'],
        'dealId' => isset($data['data']['dealId']) ? $data['data']['dealId'] : null
    ]);
    exit;
}

if (!empty($data['data']['error'])) {
    http_response_code(400);
    echo json_encode(['error' => $data['data']['error']]);
    exit;
}

http_response_code(500);
echo json_encode(['error' => 'Не удалось сформировать заказ. Попробуйте еще раз.']);
