import { useState } from 'react';
import { signUp } from '@/app/api/UserApi/SignUp';

interface SignUpForm {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export function useSignUp(onSuccess?: () => void) {
  const [form, setForm] = useState<SignUpForm>({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof SignUpForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signUp(form);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
}
