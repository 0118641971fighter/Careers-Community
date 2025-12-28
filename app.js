const express = require('express');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// إعداد multer لرفع الملفات
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // إضافة timestamp لاسم الملف لتجنب التكرار
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    // قبول ملفات PDF و DOC و DOCX فقط
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('خطأ: يسمح فقط بملفات PDF و DOC و DOCX!');
    }
  }
});

// إعدادات التطبيق
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// صفحة البداية
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// صفحة التسجيل
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// صفحة التقديم
app.get('/application', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'application.html'));
});

// معالجة تسجيل المستخدم
app.post('/signup', (req, res) => {
  const { fullname, email, password } = req.body;
  
  // هنا يمكنك إضافة حفظ المستخدم في قاعدة البيانات
  console.log('مستخدم جديد:', { fullname, email });
  
  // توجيه إلى صفحة التقديم
  res.redirect('/application');
});

// معالجة تقديم الطلب
app.post('/submit-application', upload.single('cv'), (req, res) => {
  try {
    const { fullname, age, graduation_year, experience, skills } = req.body;
    const cvFile = req.file;
    
    if (!cvFile) {
      return res.status(400).json({ success: false, message: 'يرجى تحميل السيرة الذاتية' });
    }
    
    // هنا يمكنك إضافة حفظ البيانات في قاعدة البيانات
    console.log('طلب جديد:', {
      fullname,
      age,
      graduation_year,
      experience,
      skills,
      cvFile: cvFile.filename,
      submissionDate: new Date().toISOString()
    });
    
    // في الواقع، احفظ البيانات في قاعدة البيانات
    
    res.json({ 
      success: true, 
      message: 'تم استلام طلبك بنجاح!',
      data: {
        fullname,
        age,
        graduation_year,
        experience,
        skills,
        cvFileName: cvFile.filename
      }
    });
  } catch (error) {
    console.error('خطأ في معالجة الطلب:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
  }
});

// صفحة تأكيد الإرسال (اختيارية)
app.get('/confirmation', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>تم الإرسال بنجاح</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
        .container {
          max-width: 600px;
          padding: 3rem;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          backdrop-filter: blur(10px);
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
          line-height: 1.6;
        }
        .checkmark {
          font-size: 5rem;
          margin-bottom: 2rem;
        }
        .btn {
          background-color: white;
          color: #6a11cb;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 2rem;
          text-decoration: none;
          display: inline-block;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="checkmark">✓</div>
        <h1>تم إرسال طلبك بنجاح!</h1>
        <p>شكرًا لك على تقديم طلب الانضمام إلى Careers Community. سنقوم بمراجعة طلبك وسنقوم بالاتصال بك في أقرب وقت ممكن.</p>
        <p>رقم الطلب: #${Math.floor(100000 + Math.random() * 900000)}</p>
        <a href="/" class="btn">العودة إلى الصفحة الرئيسية</a>
      </div>
    </body>
    </html>
  `);
});

// صفحة لعرض الطلبات (للتطوير فقط - في الإنتاج تحتاج إلى نظام مصادقة)
app.get('/admin/applications', (req, res) => {
  // هذا مجرد مثال، في الواقع يجب أن تسترجعه من قاعدة البيانات
  const applications = [
    {
      id: 1,
      name: "أحمد محمد",
      age: 25,
      graduation_year: 2020,
      experience: "3-5 سنوات",
      skills: "JavaScript, React, Node.js",
      cv: "سيرة ذاتية.pdf",
      date: "2023-10-15"
    }
  ];
  
  res.json({
    success: true,
    count: applications.length,
    data: applications
  });
});

// بدء الخادم
app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});