import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // متغيرات الفورم الجديدة
  const [name, setName] = useState(''); // عشان نخزن الاسم اللي المستخدم هيدخله
  const [submissionStatus, setSubmissionStatus] = useState(''); // عشان نخزن رسالة النجاح أو الخطأ

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/data`)
      .then(response => response.json())
      .then(data => {
        setData(data.message);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // دالة معالجة إرسال الفورم
  const handleSubmit = async (e) => {
    e.preventDefault(); // منع الصفحة من إعادة التحميل
    setSubmissionStatus('جاري الإرسال...');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submit`, {
        method: 'POST', // تحديد طريقة الإرسال
        headers: {
          'Content-Type': 'application/json', // تحديد نوع المحتوى
        },
        body: JSON.stringify({ name: name }), // تحويل البيانات لـ JSON وإرسالها
      });

      const result = await response.json();

      if (result.success) {
        setSubmissionStatus(result.message);
        setName(''); // تفريغ حقل الإدخال بعد الإرسال
      } else {
        setSubmissionStatus(result.message);
      }
    } catch (error) {
      setSubmissionStatus('حدث خطأ أثناء الإرسال.');
      console.error('Submission error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-blue-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">موقعي الاحترافي</h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6 rounded-full"></div>
          <h2 className="text-xl font-semibold text-gray-600 mb-4">بيانات من الباك إند:</h2>
          <p className="text-lg text-gray-500 bg-gray-100 p-4 rounded-lg mb-6">
            {data}
          </p>
        </header>

        {/* الفورم الجديد */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">اكتب اسمك:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="اسمك هنا"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            أرسل
          </button>
        </form>

        {/* عرض رسالة النجاح أو الخطأ */}
        {submissionStatus && (
          <p className="mt-4 text-center text-sm font-semibold text-green-600">
            {submissionStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;