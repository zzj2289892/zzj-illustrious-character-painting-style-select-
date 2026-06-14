<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$baseDir = __DIR__;

function sendJsonResponse($success, $data = null, $error = null) {
    $response = ['success' => $success];
    if ($data !== null) {
        $response['data'] = $data;
    }
    if ($error !== null) {
        $response['error'] = $error;
    }
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

function readJsonFile($filepath) {
    if (!file_exists($filepath)) {
        return null;
    }
    $content = file_get_contents($filepath);
    return json_decode($content, true);
}

function writeJsonFile($filepath, $data) {
    $content = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    return file_put_contents($filepath, $content, LOCK_EX) !== false;
}

$action = $_GET['action'] ?? '';

if ($action === 'get_characters') {
    $zhCnFile = $baseDir . '/zh_CN.json';
    $data = readJsonFile($zhCnFile);
    
    if ($data === null) {
        sendJsonResponse(false, null, 'Failed to read zh_CN.json');
    }
    
    sendJsonResponse(true, $data);
}

elseif ($action === 'add_character') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $chineseName = trim($input['chinese_name'] ?? '');
    $englishPrompt = trim($input['english_prompt'] ?? '');
    
    if (empty($chineseName) || empty($englishPrompt)) {
        sendJsonResponse(false, null, 'Chinese name and English prompt are required');
    }
    
    $zhCnFile = $baseDir . '/zh_CN.json';
    $zhData = readJsonFile($zhCnFile);
    
    if ($zhData === null) {
        sendJsonResponse(false, null, 'Failed to read zh_CN.json');
    }
    
    $zhData[$chineseName] = $englishPrompt;
    
    if (!writeJsonFile($zhCnFile, $zhData)) {
        sendJsonResponse(false, null, 'Failed to write zh_CN.json');
    }
    
    sendJsonResponse(true, null, 'Character added successfully');
}

elseif ($action === 'add_character_with_image') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $chineseName = trim($input['chinese_name'] ?? '');
    $englishPrompt = trim($input['english_prompt'] ?? '');
    $imageBase64 = $input['image_base64'] ?? '';
    
    if (empty($chineseName) || empty($englishPrompt)) {
        sendJsonResponse(false, null, 'Chinese name and English prompt are required');
    }
    
    if (empty($imageBase64)) {
        sendJsonResponse(false, null, 'Image data is required');
    }
    
    $zhCnFile = $baseDir . '/zh_CN.json';
    $zhData = readJsonFile($zhCnFile);
    
    if ($zhData === null) {
        sendJsonResponse(false, null, 'Failed to read zh_CN.json');
    }
    
    $zhData[$chineseName] = $englishPrompt;
    
    if (!writeJsonFile($zhCnFile, $zhData)) {
        sendJsonResponse(false, null, 'Failed to write zh_CN.json');
    }
    
    // 找到第一个可用的 output 文件
    $outputFile = null;
    for ($i = 1; $i <= 10; $i++) {
        $candidateFile = $baseDir . '/output_' . $i . '.json';
        if (file_exists($candidateFile)) {
            $outputData = readJsonFile($candidateFile);
            if ($outputData !== null && is_array($outputData)) {
                // 检查是否已存在该角色
                $exists = false;
                foreach ($outputData as $item) {
                    if (isset($item[$englishPrompt])) {
                        $exists = true;
                        break;
                    }
                }
                if (!$exists) {
                    $outputFile = $candidateFile;
                    break;
                }
            }
        }
    }
    
    // 如果没有找到可用的文件，使用 output_1.json
    if ($outputFile === null) {
        $outputFile = $baseDir . '/output_1.json';
    }
    
    $outputData = readJsonFile($outputFile);
    
    if ($outputData === null) {
        $outputData = [];
    }
    
    $newEntry = [$englishPrompt => $imageBase64];
    $outputData[] = $newEntry;
    
    if (!writeJsonFile($outputFile, $outputData)) {
        sendJsonResponse(false, null, 'Failed to write output file');
    }
    
    sendJsonResponse(true, null, 'Character and image added successfully');
}

elseif ($action === 'update_character') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $oldChineseName = trim($input['old_chinese_name'] ?? '');
    $newChineseName = trim($input['new_chinese_name'] ?? '');
    $newEnglishPrompt = trim($input['new_english_prompt'] ?? '');
    $newImageBase64 = $input['new_image_base64'] ?? '';
    $hasImage = !empty($newImageBase64);
    
    if (empty($oldChineseName) || empty($newChineseName) || empty($newEnglishPrompt)) {
        sendJsonResponse(false, null, 'Old Chinese name, new Chinese name and new English prompt are required');
    }
    
    $zhCnFile = $baseDir . '/zh_CN.json';
    $zhData = readJsonFile($zhCnFile);
    
    if ($zhData === null) {
        sendJsonResponse(false, null, 'Failed to read zh_CN.json');
    }
    
    if (!isset($zhData[$oldChineseName])) {
        $foundKey = null;
        foreach ($zhData as $key => $value) {
            if (trim($key) === $oldChineseName || $key === $oldChineseName) {
                $foundKey = $key;
                break;
            }
        }
        
        if ($foundKey !== null) {
            $oldChineseName = $foundKey;
        } else {
            sendJsonResponse(false, null, 'Character does not exist: ' . $oldChineseName);
        }
    }
    
    $oldEnglishPrompt = $zhData[$oldChineseName];
    
    // 更新中文名称
    if ($oldChineseName !== $newChineseName) {
        unset($zhData[$oldChineseName]);
        $zhData[$newChineseName] = $newEnglishPrompt;
    } else {
        $zhData[$oldChineseName] = $newEnglishPrompt;
    }
    
    if (!writeJsonFile($zhCnFile, $zhData)) {
        sendJsonResponse(false, null, 'Failed to write zh_CN.json');
    }
    
    // 如果有新图片，更新图片
    if ($hasImage) {
        // 删除旧图片
        for ($i = 1; $i <= 10; $i++) {
            $outputFile = $baseDir . '/output_' . $i . '.json';
            if (file_exists($outputFile)) {
                $outputData = readJsonFile($outputFile);
                
                if ($outputData !== null) {
                    $newOutputData = [];
                    foreach ($outputData as $item) {
                        if (!isset($item[$oldEnglishPrompt])) {
                            $newOutputData[] = $item;
                        }
                    }
                    
                    writeJsonFile($outputFile, $newOutputData);
                }
            }
        }
        
        // 找到第一个可用的 output 文件添加新图片
        $outputFile = null;
        for ($i = 1; $i <= 10; $i++) {
            $candidateFile = $baseDir . '/output_' . $i . '.json';
            if (file_exists($candidateFile)) {
                $outputData = readJsonFile($candidateFile);
                if ($outputData !== null && is_array($outputData)) {
                    // 检查是否已存在该角色
                    $exists = false;
                    foreach ($outputData as $item) {
                        if (isset($item[$newEnglishPrompt])) {
                            $exists = true;
                            break;
                        }
                    }
                    if (!$exists) {
                        $outputFile = $candidateFile;
                        break;
                    }
                }
            }
        }
        
        // 如果没有找到可用的文件，使用 output_1.json
        if ($outputFile === null) {
            $outputFile = $baseDir . '/output_1.json';
        }
        
        $outputData = readJsonFile($outputFile);
        
        if ($outputData === null) {
            $outputData = [];
        }
        
        $newEntry = [$newEnglishPrompt => $newImageBase64];
        $outputData[] = $newEntry;
        
        if (!writeJsonFile($outputFile, $outputData)) {
            sendJsonResponse(false, null, 'Failed to write output file');
        }
    }
    // 如果英文提示词改变但没有上传新图片，迁移图片key
    elseif ($oldEnglishPrompt !== $newEnglishPrompt) {
        for ($i = 1; $i <= 10; $i++) {
            $outputFile = $baseDir . '/output_' . $i . '.json';
            if (file_exists($outputFile)) {
                $outputData = readJsonFile($outputFile);
                
                if ($outputData !== null) {
                    $modified = false;
                    foreach ($outputData as &$item) {
                        if (isset($item[$oldEnglishPrompt])) {
                            $item[$newEnglishPrompt] = $item[$oldEnglishPrompt];
                            unset($item[$oldEnglishPrompt]);
                            $modified = true;
                        }
                    }
                    unset($item);
                    
                    if ($modified) {
                        writeJsonFile($outputFile, $outputData);
                    }
                }
            }
        }
    }
    
    sendJsonResponse(true, null, 'Character updated successfully');
}

elseif ($action === 'delete_character') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $chineseName = trim($input['chinese_name'] ?? '');
    
    if (empty($chineseName)) {
        sendJsonResponse(false, null, 'Chinese name is required');
    }
    
    $zhCnFile = $baseDir . '/zh_CN.json';
    $zhData = readJsonFile($zhCnFile);
    
    if ($zhData === null) {
        sendJsonResponse(false, null, 'Failed to read zh_CN.json');
    }
    
    if (!isset($zhData[$chineseName])) {
        $foundKey = null;
        foreach ($zhData as $key => $value) {
            if (trim($key) === $chineseName || $key === $chineseName) {
                $foundKey = $key;
                break;
            }
        }
        
        if ($foundKey !== null) {
            $chineseName = $foundKey;
        } else {
            sendJsonResponse(false, null, 'Character does not exist: ' . $chineseName);
        }
    }
    
    $englishPrompt = $zhData[$chineseName];
    unset($zhData[$chineseName]);
    
    if (!writeJsonFile($zhCnFile, $zhData)) {
        sendJsonResponse(false, null, 'Failed to write zh_CN.json');
    }
    
    for ($i = 1; $i <= 10; $i++) {
        $outputFile = $baseDir . '/output_' . $i . '.json';
        if (file_exists($outputFile)) {
            $outputData = readJsonFile($outputFile);
            
            if ($outputData !== null) {
                $newOutputData = [];
                foreach ($outputData as $item) {
                    if (!isset($item[$englishPrompt])) {
                        $newOutputData[] = $item;
                    }
                }
                
                writeJsonFile($outputFile, $newOutputData);
            }
        }
    }
    
    sendJsonResponse(true, null, 'Character deleted successfully');
}

else {
    sendJsonResponse(false, null, 'Invalid action');
}
?>
