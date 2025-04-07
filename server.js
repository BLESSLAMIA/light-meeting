const express = require('express');
const path = require('path');
const app = express();

// 静态文件服务（包含 index.html、JS、CSS、图片等）
app.use(express.static(path.join(__dirname)));

// 处理根路径
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 监听地址绑定为 0.0.0.0，允许外部访问
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Web 服务已启动：http://122.51.36.132:${PORT}`);
});
