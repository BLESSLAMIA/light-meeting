const express = require('express');
const path = require('path');
const app = express();

// ���þ�̬�ļ�Ŀ¼
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`��������������http://localhost:${PORT}`);
});
