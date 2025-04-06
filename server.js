const express = require('express');
const path = require('path');
const app = express();

// 设置静态文件目录
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`服务器已启动：http://localhost:${PORT}`);
});
