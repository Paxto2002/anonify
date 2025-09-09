// src/app/(auth)/sign-in/page.tsx
import { Suspense } from 'react';
import SignInForm from './SignInForm';
import Loading from '@/components/Loading';

export default function SignInPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SignInForm />
    </Suspense>
  );
}