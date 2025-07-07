import { useEffect } from 'react';
import { PasswordResetSuccessCard } from '@/components/auth/passwordReset/passwordResetSuccessCard';
import { useNavigate } from '@tanstack/react-router';

export default function PasswordResetSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate({ to: '/auth/login' }), 3000);
  });

  return (
    <div className="flex h-screen w-full items-center justify-center p-8">
      <PasswordResetSuccessCard />
    </div>
  );
}
