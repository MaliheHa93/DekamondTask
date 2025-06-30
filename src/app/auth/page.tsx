'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from '@/styles/auth.module.scss';
import inputStyles from '@/styles/Input.module.scss';
import buttonStyles from '@/styles/Button.module.scss';

export default function AuthPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validatePhone = (number: string) => /^09\d{9}$/.test(number);

  const handleLogin = async () => {
    if (!validatePhone(phone)) {
      setError('شماره تلفن معتبر نیست');
      return;
    }

    try {
      // استفاده از فایل لوکال
      const res = await fetch('/api.json');
      const data = await res.json();
      const user = data.results[0];

      localStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard');
    } catch (e) {
      console.error('API error', e);
      setError('خطا در دریافت اطلاعات کاربر');
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles['form-container']}>
        <h2>ورود به داشبورد</h2>
        <input
          type="tel"
          className={inputStyles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="شماره تلفن"
        />
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handleLogin} className={buttonStyles.button}>
          ورود
        </button>
      </div>
    </div>
  );
}
