import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 1. كائن الترجمة (Translations Object) مع إضافة نصوص صفحة التقديم
const translations = {
  en: {
    welcome: 'WELCOME',
    login_prompt: 'Enter your credentials to access your account',
    username_placeholder: 'Username or Email',
    password_placeholder: 'Password',
    sign_in_button: 'Sign In',
    forgot_password: 'Forgot Password?',
    create_account: 'Create an Account',
    register_title: 'Create Account',
    fullname_placeholder: 'Full Name',
    email_placeholder: 'Email Address',
    reg_password_placeholder: 'Password',
    confirm_password_placeholder: 'Confirm Password',
    sign_up_button: 'Sign Up',
    logging_in: 'Logging in...',
    registering: 'Creating account...',
    password_mismatch: 'Passwords do not match!',
    connection_error: 'Failed to connect to the server.',
    // --- نصوص صفحة التقديم الجديدة ---
    application_title: 'Job Application Form',
    app_fullname_placeholder: 'Full Name',
    app_age_placeholder: 'Age',
    app_grad_year_placeholder: 'Graduation Year',
    app_experience_placeholder: 'Years of Experience',
    app_phone_placeholder: 'Phone Number',
    app_whatsapp_placeholder: 'WhatsApp Number',
    app_cv_label: 'Upload your CV (PDF only)',
    app_choose_file: 'Choose File',
    app_submit_button: 'Send Application',
    app_submitting: 'Sending...',
    app_success: 'Application sent successfully!',
    app_file_error: 'Please upload a PDF file.',
  },
  ar: {
    welcome: 'أهلاً بكم',
    login_prompt: 'أدخل بياناتك للوصول إلى حسابك',
    username_placeholder: 'اسم المستخدم أو البريد الإلكتروني',
    password_placeholder: 'كلمة المرور',
    sign_in_button: 'تسجيل الدخول',
    forgot_password: 'نسيت كلمة المرور؟',
    create_account: 'إنشاء حساب',
    register_title: 'إنشاء حساب جديد',
    fullname_placeholder: 'الاسم الكامل',
    email_placeholder: 'البريد الإلكتروني',
    reg_password_placeholder: 'كلمة المرور',
    confirm_password_placeholder: 'تأكيد كلمة المرور',
    sign_up_button: 'إنشاء الحساب',
    logging_in: 'جاري تسجيل الدخول...',
    registering: 'جاري إنشاء الحساب...',
    password_mismatch: 'كلمتا المرور غير متطابقتين!',
    connection_error: 'فشل الاتصال بالخادم.',
    // --- نصوص صفحة التقديم الجديدة ---
    application_title: 'نموذج التقديم للوظيفة',
    app_fullname_placeholder: 'الاسم الكامل',
    app_age_placeholder: 'العمر',
    app_grad_year_placeholder: 'سنة التخرج',
    app_experience_placeholder: 'سنوات الخبرة',
    app_phone_placeholder: 'رقم الهاتف',
    app_whatsapp_placeholder: 'رقم الواتساب',
    app_cv_label: 'ارفع سيرتك الذاتية (PDF فقط)',
    app_choose_file: 'اختر ملف',
    app_submit_button: 'إرسال التقديم',
    app_submitting: 'جاري الإرسال...',
    app_success: 'تم إرسال التقديم بنجاح!',
    app_file_error: 'يرجى رفع ملف PDF فقط.',
  },
  de: {
    welcome: 'WILLKOMMEN',
    login_prompt: 'Geben Sie Ihre Anmeldedaten ein, um auf Ihr Konto zuzugreifen',
    username_placeholder: 'Benutzername oder E-Mail',
    password_placeholder: 'Passwort',
    sign_in_button: 'Anmelden',
    forgot_password: 'Passwort vergessen?',
    create_account: 'Konto erstellen',
    register_title: 'Konto Erstellen',
    fullname_placeholder: 'Vollständiger Name',
    email_placeholder: 'E-Mail-Adresse',
    reg_password_placeholder: 'Passwort',
    confirm_password_placeholder: 'Passwort bestätigen',
    sign_up_button: 'Registrieren',
    logging_in: 'Anmelden...',
    registering: 'Konto wird erstellt...',
    password_mismatch: 'Passwörter stimmen nicht überein!',
    connection_error: 'Verbindung zum Server fehlgeschlagen.',
    // --- Texte für die Bewerbungsseite ---
    application_title: 'Bewerbungsformular',
    app_fullname_placeholder: 'Vollständiger Name',
    app_age_placeholder: 'Alter',
    app_grad_year_placeholder: 'Abschlussjahr',
    app_experience_placeholder: 'Berufserfahrung in Jahren',
    app_phone_placeholder: 'Telefonnummer',
    app_whatsapp_placeholder: 'WhatsApp-Nummer',
    app_cv_label: 'Lebenslauf hochladen (nur PDF)',
    app_choose_file: 'Datei auswählen',
    app_submit_button: 'Bewerbung senden',
    app_submitting: 'Wird gesendet...',
    app_success: 'Bewerbung erfolgreich gesendet!',
    app_file_error: 'Bitte laden Sie nur eine PDF-Datei hoch.',
  },
  zh: {
    welcome: '欢迎',
    login_prompt: '输入您的凭据以访问您的账户',
    username_placeholder: '用户名或邮箱',
    password_placeholder: '密码',
    sign_in_button: '登录',
    forgot_password: '忘记密码？',
    create_account: '创建账户',
    register_title: '创建账户',
    fullname_placeholder: '全名',
    email_placeholder: '电子邮件地址',
    reg_password_placeholder: '密码',
    confirm_password_placeholder: '确认密码',
    sign_up_button: '注册',
    logging_in: '登录中...',
    registering: '创建账户中...',
    password_mismatch: '密码不匹配！',
    connection_error: '无法连接到服务器。',
    // --- 申请页面文本 ---
    application_title: '求职申请表',
    app_fullname_placeholder: '全名',
    app_age_placeholder: '年龄',
    app_grad_year_placeholder: '毕业年份',
    app_experience_placeholder: '工作经验年限',
    app_phone_placeholder: '电话号码',
    app_whatsapp_placeholder: 'WhatsApp号码',
    app_cv_label: '上传您的简历（仅PDF）',
    app_choose_file: '选择文件',
    app_submit_button: '发送申请',
    app_submitting: '发送中...',
    app_success: '申请发送成功！',
    app_file_error: '请仅上传PDF文件。',
  },
  ja: {
    welcome: 'ようこそ',
    login_prompt: 'アカウントにアクセスするために資格情報を入力してください',
    username_placeholder: 'ユーザー名またはメールアドレス',
    password_placeholder: 'パスワード',
    sign_in_button: 'サインイン',
    forgot_password: 'パスワードをお忘れですか？',
    create_account: 'アカウントを作成',
    register_title: 'アカウント作成',
    fullname_placeholder: '氏名',
    email_placeholder: 'メールアドレス',
    reg_password_placeholder: 'パスワード',
    confirm_password_placeholder: 'パスワードを確認',
    sign_up_button: 'サインアップ',
    logging_in: 'ログイン中...',
    registering: 'アカウントを作成中...',
    password_mismatch: 'パスワードが一致しません！',
    connection_error: 'サーバーへの接続に失敗しました。',
    // --- 申請ページのテキスト ---
    application_title: '求人応募フォーム',
    app_fullname_placeholder: '氏名',
    app_age_placeholder: '年齢',
    app_grad_year_placeholder: '卒業年度',
    app_experience_placeholder: '経験年数',
    app_phone_placeholder: '電話番号',
    app_whatsapp_placeholder: 'WhatsApp番号',
    app_cv_label: '履歴書をアップロード（PDFのみ）',
    app_choose_file: 'ファイルを選択',
    app_submit_button: '応募を送信',
    app_submitting: '送信中...',
    app_success: '応募が正常に送信されました！',
    app_file_error: 'PDFファイルのみをアップロードしてください。',
  },
};

// 2. كومبوننت الهيدر الجديد
function Header({ language, setLanguage }) {
  return (
    <header className="app-header">
      <h1>Careers Community</h1>
      <select
        id="language-selector"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">🇺🇸 English</option>
        <option value="ar">🇸🇦 العربية</option>
        <option value="de">🇩🇪 Deutsch</option>
        <option value="zh">🇨🇳 中文</option>
        <option value="ja">🇯🇵 日本語</option>
      </select>
    </header>
  );
}

function App() {
  const [notification, setNotification] = useState({ message: '', isVisible: false });
  const [currentPage, setCurrentPage] = useState('splash');
  const [language, setLanguage] = useState('en');
  const [textDirection, setTextDirection] = useState('ltr');

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    fullname: '', regEmail: '', regPassword: '', regConfirmPassword: '',
  });

  // حالة جديدة لبيانات فورم التقديم
  const [applicationData, setApplicationData] = useState({
    fullname: '', age: '', gradYear: '', experience: '', email: '', phone: '', whatsapp: '',
  });
  const [cvFile, setCvFile] = useState(null);
  const fileInputRef = useRef(null); // للتحكم في اختيار الملف

  const t = (key) => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    if (language === 'ar') {
      setTextDirection('rtl');
    } else {
      setTextDirection('ltr');
    }
  }, [language]);

  const showNotification = (message) => {
    setNotification({ message, isVisible: true });
    setTimeout(() => {
      setNotification({ message: '', isVisible: false });
    }, 3000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage('login');
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // دالة معالجة تسجيل الدخول (معدلة)
  const handleLogin = async (e) => {
    e.preventDefault();
    showNotification(t('logging_in'));

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginData.username, password: loginData.password }),
      });

      const result = await response.json();

      if (result.success) {
        showNotification(result.message);
        setCurrentPage('application'); // الانتقال لصفحة التقديم
      } else {
        showNotification(result.message);
      }
    } catch (error) {
      showNotification(t('connection_error'));
      console.error('Login error:', error);
    }
  };

  // دالة معالجة إنشاء الحساب
  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.regPassword !== registerData.regConfirmPassword) {
      showNotification(t('password_mismatch'));
      return;
    }
    showNotification(t('registering'));

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: registerData.fullname,
          email: registerData.regEmail,
          password: registerData.regPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        showNotification(result.message);
        setCurrentPage('login');
      } else {
        showNotification(result.message);
      }
    } catch (error) {
      showNotification(t('connection_error'));
      console.error('Register error:', error);
    }
  };

  // دالة جديدة لإرسال بيانات التقديم
  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    if (!cvFile || cvFile.type !== 'application/pdf') {
      showNotification(t('app_file_error'));
      return;
    }

    showNotification(t('app_submitting'));

    const formData = new FormData();
    formData.append('fullname', applicationData.fullname);
    formData.append('age', applicationData.age);
    formData.append('gradYear', applicationData.gradYear);
    formData.append('experience', applicationData.experience);
    formData.append('email', applicationData.email);
    formData.append('phone', applicationData.phone);
    formData.append('whatsapp', applicationData.whatsapp);
    formData.append('cv', cvFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submit-application`, {
        method: 'POST',
        body: formData, // لا نضع Content-Type هنا، المتصفح يضعه تلقائياً
      });
      const result = await response.json();
      if (result.success) {
        showNotification(t('app_success'));
        // تفريض الفورم بعد الإرسال
        setApplicationData({ fullname: '', age: '', gradYear: '', experience: '', email: '', phone: '', whatsapp: '' });
        setCvFile(null);
        if(fileInputRef.current) fileInputRef.current.value = '';
      } else {
        showNotification(result.message);
      }
    } catch (error) {
      showNotification(t('connection_error'));
      console.error('Application error:', error);
    }
  };

  return (
    <div className={`app-container lang-${language}`} dir={textDirection}>
      <div id="notification" className={`notification ${notification.isVisible ? 'show' : ''}`}>
        {notification.message}
      </div>

      {/* 3. إضافة الهيدر هنا ليظهر في كل الصفحات ماعدا Splash */}
      {currentPage !== 'splash' && <Header language={language} setLanguage={setLanguage} />}

      {currentPage === 'splash' && (
        <div id="splash-page" className="page">
          <div className="splash-container">
            <h1>Careers Community</h1>
          </div>
        </div>
      )}

      {currentPage === 'login' && (
        <div id="login-page" className="page">
          <div className="login-container">
            <div className="login-form">
              <div className="welcome-section">
                <h1>{t('welcome')}</h1>
              </div>

              <p>{t('login_prompt')}</p>

              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    required
                  />
                  <label htmlFor="username" className={loginData.username ? 'active' : ''}>{t('username_placeholder')}</label>
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                  <label htmlFor="password" className={loginData.password ? 'active' : ''}>{t('password_placeholder')}</label>
                </div>

                <button type="submit">{t('sign_in_button')}</button>
              </form>

              <div className="form-links">
                {/* تم استبدال <a href="#"> بـ <button> لحل مشكلة الـ accessibility */}
                <button type="button" className="link-button" onClick={() => alert('Feature coming soon!')}>
                  {t('forgot_password')}
                </button>
                <button type="button" className="link-button" onClick={() => setCurrentPage('register')}>
                  {t('create_account')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'register' && (
        <div id="register-modal" className="modal">
          <div className="modal-overlay" onClick={() => setCurrentPage('login')}></div>
          <div className="modal-content">
            <div className="register-form"><h2>{t('register_title')}</h2>

              <form onSubmit={handleRegister}>
                <div className="input-group">
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={registerData.fullname}
                    onChange={(e) => setRegisterData({ ...registerData, fullname: e.target.value })}
                    required
                  />
                  <label htmlFor="fullname" className={registerData.fullname ? 'active' : ''}>{t('fullname_placeholder')}</label>
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    id="reg-email"
                    name="reg-email"
                    value={registerData.regEmail}
                    onChange={(e) => setRegisterData({ ...registerData, regEmail: e.target.value })}
                    required
                  />
                  <label htmlFor="reg-email" className={registerData.regEmail ? 'active' : ''}>{t('email_placeholder')}</label>
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    id="reg-password"
                    name="reg-password"
                    value={registerData.regPassword}
                    onChange={(e) => setRegisterData({ ...registerData, regPassword: e.target.value })}
                    required
                  />
                  <label htmlFor="reg-password" className={registerData.regPassword ? 'active' : ''}>{t('reg_password_placeholder')}</label>
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    id="reg-confirm-password"
                    name="reg-confirm-password"
                    value={registerData.regConfirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, regConfirmPassword: e.target.value })}
                    required
                  />
                  <label htmlFor="reg-confirm-password" className={registerData.regConfirmPassword ? 'active' : ''}>{t('confirm_password_placeholder')}</label>
                </div>

                <button type="submit">{t('sign_up_button')}</button>
              </form>
            </div>
            <button className="modal-close-btn" onClick={() => setCurrentPage('login')}>&times;</button>
          </div>
        </div>
      )}

      {currentPage === 'application' && (
        <div className="application-container page">
          <div className="application-form">
            <h1>{t('application_title')}</h1>

            <form onSubmit={handleApplicationSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  value={applicationData.fullname}
                  onChange={(e) => setApplicationData({ ...applicationData, fullname: e.target.value })}
                  required
                />
                <label className={applicationData.fullname ? 'active' : ''}>{t('app_fullname_placeholder')}</label>
              </div>

              <div className="input-group">
                <input
                  type="number"
                  value={applicationData.age}
                  onChange={(e) => setApplicationData({ ...applicationData, age: e.target.value })}
                  required
                />
                <label className={applicationData.age ? 'active' : ''}>{t('app_age_placeholder')}</label>
              </div>

              <div className="input-group">
                <input
                  type="number"
                  value={applicationData.gradYear}
                  onChange={(e) => setApplicationData({ ...applicationData, gradYear: e.target.value })}
                  required
                />
                <label className={applicationData.gradYear ? 'active' : ''}>{t('app_grad_year_placeholder')}</label>
              </div>

              <div className="input-group">
                <input
                  type="number"
                  value={applicationData.experience}
                  onChange={(e) => setApplicationData({ ...applicationData, experience: e.target.value })}
                  required
                />
                <label className={applicationData.experience ? 'active' : ''}>{t('app_experience_placeholder')}</label>
              </div>

              <div className="input-group">
                <input
                  type="email"
                  value={applicationData.email}
                  onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                  required
                />
                <label className={applicationData.email ? 'active' : ''}>{t('email_placeholder')}</label>
              </div>

              <div className="input-group">
                <input
                  type="tel"
                  value={applicationData.phone}
                  onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                  required
                />
                <label className={applicationData.phone ? 'active' : ''}>{t('app_phone_placeholder')}</label>
              </div>

              <div className="input-group">
                <input
                  type="tel"
                  value={applicationData.whatsapp}
                  onChange={(e) => setApplicationData({ ...applicationData, whatsapp: e.target.value })}
                  required
                />
                <label className={applicationData.whatsapp ? 'active' : ''}>{t('app_whatsapp_placeholder')}</label>
              </div>

              <div className="file-upload-group">
                <label htmlFor="cv-upload" className="file-label">
                  <span className="file-icon">📄</span>
                  <span className="file-text">{cvFile ? cvFile.name : t('app_choose_file')}</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="cv-upload"
                  accept=".pdf"
                  onChange={(e) => setCvFile(e.target.files[0])}
                />
              </div>

              <button type="submit">{t('app_submit_button')}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;