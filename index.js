const express = require('express');
const fetch = require('node-fetch');
const app = express();

// 核心下载路由
app.get('/download', async (req, res) => {
  try {
    const rawUrl = req.query.url;
    
    // 验证URL格式
    if (!rawUrl || !rawUrl.includes('raw.githubusercontent.com')) {
      return res.status(400).send('Invalid URL format');
    }

    // 获取文件名
    const fileName = rawUrl.split('/').pop() || 'download';
    
    // 设置下载头
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    
    // 从GitHub获取文件流并转发
    const response = await fetch(rawUrl);
    response.body.pipe(res);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
