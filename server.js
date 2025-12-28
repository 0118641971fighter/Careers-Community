const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const multer = require('multer');
require('dotenv').config();

// إعداد multer لرفع الملفات
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// إعداد المنفذ
const PORT = process.env.PORT || 3000;

// Middlewarer
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

// إعدادات العرض
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware لإدارة اللغة
app.use((req, res, next) => {
    // اللغات المدعومة
    const supportedLangs = ['ar', 'en', 'zh', 'ja', 'de', 'fr', 'es'];
    
    // الحصول على اللغة من الكوكيز أو الرأس أو الافتراضي
    let lang = req.cookies?.lang || 'ar';
    if (!supportedLangs.includes(lang)) lang = 'ar';
    
    // أسماء اللغات
    const langNames = {
        ar: 'العربية',
        en: 'English',
        zh: '中文',
        ja: '日本語',
        de: 'Deutsch',
        fr: 'Français',
        es: 'Español'
    };
    
    // حفظ في locals للوصول في views
    res.locals.lang = lang;
    res.locals.langName = langNames[lang];
    res.locals.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    next();
});

// ============ المسارات ============

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.render('splash', {
        title: 'Careers Community',
        page: 'home'
    });
});

// صفحة التسجيل
app.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'Create Account - Careers Community',
        page: 'signup'
    });
});

// صفحة التقديم
app.get('/application', (req, res) => {
    // توليد سنوات التخرج
    const currentYear = new Date().getFullYear();
    const graduationYears = [];
    for (let year = currentYear; year >= 2000; year--) {
        graduationYears.push(year);
    }
    
    res.render('application', {
        title: 'Job Application - Careers Community',
        page: 'application',
        graduationYears: graduationYears
    });
});

// معالجة التسجيل
app.post('/signup-process', (req, res) => {
    const userData = req.body;
    
    console.log('📝 New Registration:', userData);
    
    // هنا يمكنك حفظ البيانات في قاعدة البيانات
    
    res.json({
        success: true,
        message: res.locals.lang === 'ar' ? 'تم إنشاء حسابك بنجاح!' : 'Account created successfully!',
        data: userData,
        redirect: '/application'
    });
});

// معالجة طلب التوظيف
app.post('/submit-application', upload.single('cv'), (req, res) => {
    const applicationData = req.body;
    
    // معلومات الملف إذا تم رفعه
    if (req.file) {
        applicationData.cvFile = req.file.filename;
        applicationData.cvPath = '/uploads/' + req.file.filename;
    }
    
    console.log('📋 New Job Application:', applicationData);
    
    // هنا يمكنك حفظ الطلب في قاعدة البيانات
    
    res.json({
        success: true,
        message: res.locals.lang === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Application submitted successfully!',
        data: applicationData,
        applicationId: 'APP-' + Date.now().toString().slice(-8),
        timestamp: new Date().toISOString()
    });
});

// تغيير اللغة
app.post('/change-language', (req, res) => {
    const { lang, langName } = req.body;
    const allowedLangs = ['ar', 'en', 'zh', 'ja', 'de', 'fr', 'es'];
    
    if (allowedLangs.includes(lang)) {
        // حفظ في الكوكيز
        res.cookie('lang', lang, { 
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 يوم
            httpOnly: true 
        });
        
        res.cookie('langName', langName, { 
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true 
        });
        
        return res.json({
            success: true,
            message: res.locals.lang === 'ar' ? 'تم تغيير اللغة' : 'Language changed',
            lang: lang,
            langName: langName
        });
    }
    
    res.json({
        success: false,
        message: res.locals.lang === 'ar' ? 'لغة غير مدعومة' : 'Language not supported'
    });
});

// صفحة النجاح
app.get('/success', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="${res.locals.lang}" dir="${res.locals.dir}">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${res.locals.lang === 'ar' ? 'تم الإرسال بنجاح' : 'Success'}</title>
            <style>
                body {
                    font-family: ${res.locals.lang === 'ar' ? "'El Messiri', 'Poppins'" : "'Poppins', sans-serif"};
                    background: #000;
                    color: #FFD700;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 20px;
                }
                .success-box {
                    text-align: center;
                    background: rgba(255, 215, 0, 0.05);
                    border: 1px solid rgba(255, 215, 0, 0.2);
                    border-radius: 20px;
                    padding: 50px;
                    max-width: 500px;
                    width: 100%;
                    backdrop-filter: blur(10px);
                }
                .checkmark {
                    font-size: 4rem;
                    margin-bottom: 20px;
                    animation: scale 1s ease-in-out;
                }
                @keyframes scale {
                    0% { transform: scale(0); }
                    70% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                h1 {
                    margin-bottom: 20px;
                    background: linear-gradient(45deg, #FFD700, #FFA500);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                p {
                    margin: 15px 0;
                    color: rgba(255, 215, 0, 0.9);
                }
                .home-link {
                    display: inline-block;
                    margin-top: 30px;
                    color: #FFD700;
                    text-decoration: none;
                    border: 1px solid #FFD700;
                    padding: 12px 30px;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                }
                .home-link:hover {
                    background: #FFD700;
                    color: #000;
                    transform: translateY(-3px);
                }
            </style>
        </head>
        <body>
            <div class="success-box">
                <div class="checkmark">✅</div>
                <h1>${res.locals.lang === 'ar' ? 'تم الإرسال بنجاح!' : 'Success!'}</h1>
                <p>${res.locals.lang === 'ar' ? 'شكراً لتقديمك في Careers Community' : 'Thank you for your submission to Careers Community'}</p>
                <p>${res.locals.lang === 'ar' ? 'سيتم مراجعة طلبك والاتصال بك في أقرب وقت' : 'Your application will be reviewed and we will contact you soon'}</p>
                <a href="/" class="home-link">${res.locals.lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to Home'}</a>
            </div>
        </body>
        </html>
    `);
});

// صفحة 404
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="${res.locals.lang}" dir="${res.locals.dir}">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${res.locals.lang === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}</title>
            <style>
                body {
                    background: #000;
                    color: #FFD700;
                    font-family: ${res.locals.lang === 'ar' ? "'El Messiri', 'Poppins'" : "'Poppins', sans-serif"};
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    text-align: center;
                    padding: 20px;
                }
                .error-code {
                    font-size: 8rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    background: linear-gradient(45deg, #FFD700, #FFA500);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .error-message {
                    font-size: 1.5rem;
                    margin-bottom: 30px;
                    color: rgba(255, 215, 0, 0.9);
                }
                .home-link {
                    color: #FFD700;
                    text-decoration: none;
                    border: 1px solid #FFD700;
                    padding: 12px 30px;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                }
                .home-link:hover {
                    background: #FFD700;
                    color: #000;
                }
            </style>
        </head>
        <body>
            <div class="error-code">404</div>
            <div class="error-message">
                ${res.locals.lang === 'ar' ? 'عذراً، الصفحة التي تبحث عنها غير موجودة' : 'Sorry, the page you are looking for does not exist'}
            </div>
            <a href="/" class="home-link">
                ${res.locals.lang === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to Homepage'}
            </a>
        </body>
        </html>
    `);
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🌐 Homepage: http://localhost:${PORT}/`);
    console.log(`📝 Signup: http://localhost:${PORT}/signup`);
    console.log(`📋 Application: http://localhost:${PORT}/application`);
    console.log('✅ Ready with multi-language support!');
});