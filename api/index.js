const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // استدعاء مكتبة التشفير
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- قاعدة بيانات مؤقتة (In-memory Database) ---
// في مشروع حقيقي، هتكون هنا قاعدة بيانات زي MongoDB أو PostgreSQL
// دلوقتي بنستخدم array عشان الشغل يبقى سهل
const users = [];

// --- Routes اللي عندنا من قبل ---
app.get('/', (req, res) => {
  res.send('Hello from the backend! The server is working.');
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'هذه هي البيانات القادمة من الباك إند!' });
});

// --- Routes الجديدة لإنشاء الحساب وتسجيل الدخول ---

// Route جديد لإنشاء حساب جديد (Register)
app.post('/api/register', async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // 1. التحقق إذا المستخدم موجود قبل كده
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'هذا البريد الإلكتروني مسجل بالفعل.' });
    }

    // 2. تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10); // 10 هو عدد جولات التشفير

    // 3. إنشاء المستخدم الجديد
    const newUser = { id: users.length + 1, fullname, email, password: hashedPassword };
    users.push(newUser);

    console.log('Users array:', users); // عشان نشوف المستخدمين في الـ Terminal

    // 4. إرسال رد نجاح
    res.status(201).json({ success: true, message: 'تم إنشاء الحساب بنجاح!' });

  } catch (error) {
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم.' });
  }
});

// Route جديد لتسجيل الدخول (Login)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. البحث عن المستخدم بالإيميل
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' });
    }

    // 2. مقارنة كلمة المرور المدخلة بالكلمة المشفرة
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' });
    }

    // 3. إذا كل حاجة تمام، إرسال رد نجاح
    // في مشروع حقيقي، هتبعت هنا Token (JWT) عشان المستخدم يظل مسجل دخوله
    res.status(200).json({ success: true, message: `أهلاً بك يا ${user.fullname}! تم تسجيل الدخول بنجاح.` });

  } catch (error) {
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم.' });
  }
});


module.exports = app;