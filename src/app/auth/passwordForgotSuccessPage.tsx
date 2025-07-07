import { useEffect } from 'react';
import PasswordForgotSuccessCard from '@/components/auth/passwordForgot/passwordForgotSuccessCard';
import { useNavigate } from '@tanstack/react-router';

export default function PasswordForgotSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate({ to: '/auth/login' });
    }, 3000);
  });

  return (
    <div className="flex h-screen w-full items-center justify-center p-8">
      <PasswordForgotSuccessCard />
    </div>
  );
}
