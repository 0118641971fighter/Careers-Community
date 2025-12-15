const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// في Vercel، بنعمل express app داخل كل طلب
const app = express();

// استخدام الـ Middleware
app.use(cors());
app.use(express.json());

// قاعدة بيانات مؤقتة
const users = [];

// Route لتسجيل الدخول
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' });
    }
    res.status(200).json({ success: true, message: `أهلاً بك يا ${user.fullname}! تم تسجيل الدخول بنجاح.` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم.' });
  }
});

// Route لإنشاء حساب جديد
app.post('/api/register', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'هذا البريد الإلكتروني مسجل بالفعل.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, fullname, email, password: hashedPassword };
    users.push(newUser);
    res.status(201).json({ success: true, message: 'تم إنشاء الحساب بنجاح!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم.' });
  }
});

// Route لإرسال التقديم
app.post('/api/submit-application', async (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'تم إرسال التقديم بنجاح!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم.' });
  }
});

// **أهم سطر:** تصدير الـ app
// Vercel هيتعامل مع كل ملف `api/index.js` كأنه function
module.exports = app;