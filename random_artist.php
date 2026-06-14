<?php
$baseDir = __DIR__;
$cacheFile = $baseDir . '/artists_cache.json';
$cacheExpire = 3600;

function loadArtists($filename) {
    global $baseDir;
    $filepath = $baseDir . '/' . $filename;
    $artists = [];
    
    if (file_exists($filepath)) {
        $lines = file($filepath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line && strpos($line, '#') !== 0) {
                $artists[] = $line;
            }
        }
    }
    
    return $artists;
}

function loadAllArtists() {
    global $cacheFile, $cacheExpire;
    
    if (file_exists($cacheFile)) {
        $cacheData = json_decode(file_get_contents($cacheFile), true);
        if ($cacheData && isset($cacheData['timestamp']) && (time() - $cacheData['timestamp'] < $cacheExpire)) {
            return $cacheData['artists'];
        }
    }
    
    $artists1 = loadArtists('artists1.txt');
    $artists2 = loadArtists('artists2.txt');
    $artists3 = loadArtists('artists3.txt');
    
    $allArtists = array_merge($artists1, $artists2, $artists3);
    
    $cacheData = [
        'timestamp' => time(),
        'artists' => $allArtists
    ];
    
    file_put_contents($cacheFile, json_encode($cacheData));
    
    return $allArtists;
}

function randomArtist() {
    $allArtists = loadAllArtists();
    
    if (empty($allArtists)) {
        return "未找到任何画师";
    }
    
    $numArtists = rand(1, 10);
    $numArtists = min($numArtists, count($allArtists));
    
    $keys = array_rand($allArtists, $numArtists);
    
    if ($numArtists == 1) {
        $selectedArtists = [$allArtists[$keys]];
    } else {
        $selectedArtists = [];
        foreach ($keys as $key) {
            $selectedArtists[] = $allArtists[$key];
        }
    }
    
    $result = [];
    foreach ($selectedArtists as $artist) {
        $result[] = 'artist:' . $artist;
    }
    
    return implode(', ', $result);
}

if (isset($_GET['action']) && $_GET['action'] == 'random') {
    header('Content-Type: text/plain; charset=utf-8');
    echo randomArtist();
    exit;
}

if (isset($_GET['action']) && $_GET['action'] == 'clear_cache') {
    global $cacheFile;
    if (file_exists($cacheFile)) {
        unlink($cacheFile);
        echo json_encode(['success' => true, 'message' => '缓存已清除']);
    } else {
        echo json_encode(['success' => true, 'message' => '缓存不存在']);
    }
    exit;
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>随机画师生成器</title>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            font-family: 'Microsoft YaHei', Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
            min-height: 100vh;
            transition: background-color 0.3s ease;
        }
        body.dark-mode {
            background-color: #0f172a;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            transition: background-color 0.3s ease;
        }
        body.dark-mode .container {
            background-color: #1e293b;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
            font-size: 28px;
        }
        body.dark-mode h1 {
            color: #e2e8f0;
        }
        .theme-toggle-container {
            position: absolute;
            top: 20px;
            right: 20px;
        }
        .theme-toggle-btn {
            background: #64748b;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 16px;
        }
        .theme-toggle-btn:hover {
            background: #475569;
            transform: scale(1.05);
        }
        body.dark-mode .theme-toggle-btn {
            background: #fbbf24;
        }
        body.dark-mode .theme-toggle-btn:hover {
            background: #f59e0b;
        }
        .result {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            margin: 25px 0;
            font-family: 'Consolas', 'Monaco', monospace;
            word-wrap: break-word;
            min-height: 80px;
            font-size: 16px;
            line-height: 1.6;
            border: 2px solid #e9ecef;
            transition: all 0.3s ease;
        }
        .result.loading {
            background-color: #fff3cd;
            border-color: #ffc107;
        }
        .result.success {
            background-color: #d4edda;
            border-color: #28a745;
        }
        .result.error {
            background-color: #f8d7da;
            border-color: #dc3545;
        }
        body.dark-mode .result {
            background-color: #1e293b;
            border-color: #334155;
            color: #e2e8f0;
        }
        body.dark-mode .result.loading {
            background-color: #854d0e;
            border-color: #fbbf24;
        }
        body.dark-mode .result.success {
            background-color: #065f46;
            border-color: #10b981;
        }
        body.dark-mode .result.error {
            background-color: #7f1d1d;
            border-color: #ef4444;
        }
        .button-container {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        button {
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }
        button:active {
            transform: translateY(0);
        }
        body.dark-mode button {
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }
        body.dark-mode button:hover {
            box-shadow: 0 6px 12px rgba(0,0,0,0.4);
        }
        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        .generate-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            flex: 1;
            min-width: 200px;
        }
        .generate-btn:hover {
            background: linear-gradient(135deg, #5568d3 0%, #653a91 100%);
        }
        .back-btn {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            flex: 1;
            min-width: 150px;
        }
        .back-btn:hover {
            background: linear-gradient(135deg, #e082ea 0%, #e4465b 100%);
        }
        .info {
            text-align: center;
            color: #666;
            margin-top: 25px;
            font-size: 14px;
        }
        body.dark-mode .info {
            color: #94a3b8;
        }
        .loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
            margin-right: 10px;
            vertical-align: middle;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 随机画师生成器</h1>
        <div class="theme-toggle-container">
            <button class="theme-toggle-btn" onclick="toggleTheme()" id="themeToggleBtn" title="切换主题">
                <i class="fas fa-moon"></i>
            </button>
        </div>
        <div class="result" id="result">点击按钮生成随机画师串</div>
        <div class="button-container">
            <button class="generate-btn" onclick="generateRandom()" id="generateBtn">
                生成随机画师
            </button>
            <button class="back-btn" onclick="goBack()">
                返回主页
            </button>
        </div>
        <div class="info">
                    by zzj
        </div>
    </div>

    <script>
        let isGenerating = false;
        let lastResult = '';

        function initTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                updateThemeIcon(true);
            } else {
                updateThemeIcon(false);
            }
        }

        function toggleTheme() {
            const body = document.body;
            const isDarkMode = body.classList.toggle('dark-mode');
            
            if (isDarkMode) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            
            updateThemeIcon(isDarkMode);
        }

        function updateThemeIcon(isDarkMode) {
            const themeToggleBtn = document.getElementById('themeToggleBtn');
            const icon = themeToggleBtn.querySelector('i');
            
            if (isDarkMode) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }

        function generateRandom() {
            if (isGenerating) return;
            
            isGenerating = true;
            const resultDiv = document.getElementById('result');
            const generateBtn = document.getElementById('generateBtn');
            
            resultDiv.className = 'result loading';
            resultDiv.innerHTML = '<span class="loading-spinner"></span>生成中...';
            generateBtn.disabled = true;
            
            fetch('?action=random', {
                method: 'GET',
                cache: 'no-cache'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('网络请求失败');
                    }
                    return response.text();
                })
                .then(data => {
                    resultDiv.className = 'result success';
                    resultDiv.textContent = data;
                    lastResult = data;
                })
                .catch(error => {
                    resultDiv.className = 'result error';
                    resultDiv.textContent = '生成失败: ' + error.message;
                })
                .finally(() => {
                    isGenerating = false;
                    generateBtn.disabled = false;
                });
        }

        function goBack() {
            window.location.href = 'index.html';
        }

        document.addEventListener('DOMContentLoaded', function() {
            initTheme();
            
            const resultDiv = document.getElementById('result');
            
            resultDiv.addEventListener('click', function() {
                if (lastResult && !isGenerating) {
                    navigator.clipboard.writeText(lastResult).then(() => {
                        const originalText = resultDiv.textContent;
                        resultDiv.textContent = '已复制到剪贴板！';
                        resultDiv.className = 'result success';
                        setTimeout(() => {
                            resultDiv.textContent = originalText;
                            resultDiv.className = 'result';
                        }, 1500);
                    }).catch(err => {
                        console.error('复制失败:', err);
                    });
                }
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.code === 'Space' || e.code === 'Enter') {
                    e.preventDefault();
                    generateRandom();
                }
            });
        });
    </script>
</body>
</html>
