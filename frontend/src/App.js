import React, { useState, useEffect } from 'react';
import './App.css';

// 1. كائن الترجمة (Translations Object)
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
  },
};

function App() {
  const [notification, setNotification] = useState({ message: '', isVisible: false });
  const [currentPage, setCurrentPage] = useState('splash');
  const [language, setLanguage] = useState('en');
  
  // 2. حالة اتجاه النص (RTL/LTR)
  const [textDirection, setTextDirection] = useState('ltr');

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    fullname: '',
    regEmail: '',
    regPassword: '',
    regConfirmPassword: '',
  });

  // 3. دالة الترجمة
  const t = (key) => {
    return translations[language][key] || key;
  };

  // 4. useEffect لتغيير اتجاه النص عند تغيير اللغة
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

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', loginData);
    showNotification(t('login_success_message')); // We'll add this key later
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerData.regPassword !== registerData.regConfirmPassword) {
      showNotification(t('password_mismatch_message')); // We'll add this key later
      return;
    }
    console.log('Registering with:', registerData);
    showNotification(t('register_success_message')); // We'll add this key later
  };

  return (
    // 5. تطبيق اتجاه النص واللغة على الحاوية الرئيسية
    <div className={`app-container lang-${language}`} dir={textDirection}>
      <div id="notification" className={`notification ${notification.isVisible ? 'show' : ''}`}>
        {notification.message}
      </div>

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
              {/* 6. تعديل الهيكل: وضع العنوان ومحدد اللغة معاً */}
              <div className="welcome-section">
                <h1>{t('welcome')}</h1>
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
                <a href="#">{t('forgot_password')}</a>
                <a href="#" onClick={() => setCurrentPage('register')}>{t('create_account')}</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'register' && (
        <div id="register-modal" className="modal">
          <div className="modal-overlay" onClick={() => setCurrentPage('login')}></div>
          <div className="modal-content">
            <div className="register-form">
              <h2>{t('register_title')}</h2>

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
    </div>
  );
}

export default App;