const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Middleware ده مهم جداً عشان يقدر يقرأ الـ JSON body

app.get('/', (req, res) => {
  res.send('Hello from the backend! The server is working.');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'هذه هي البيانات القادمة من الباك إند!' });
});

// Route جديد بيستقبل بيانات (POST request)
app.post('/api/submit', (req, res) => {
  const { name } = req.body;
  console.log('Received name from frontend:', name);
  if (name) {
    res.json({ success: true, message: `أهلاً بك يا ${name}! تم استقبال بياناتك بنجاح.` });
  } else {
    res.status(400).json({ success: false, message: 'الرجاء إدخال اسم.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});