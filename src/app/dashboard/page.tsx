'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/dashboard.module.scss';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.replace('/auth');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return null;

  return (
    <div className={styles.dashboard}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to the Dashboard</h1>
        <p className={styles.name}>Hello {user.name.first} {user.name.last} </p>
      </div>
    </div>
  );
}
