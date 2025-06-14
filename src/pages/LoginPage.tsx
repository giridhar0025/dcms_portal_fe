import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Role } from '../constants/roles';
import { AppDispatch, RootState } from '../store';
import { login } from '../store/slices/authSlice';
import { Card, Input, Button } from '../components/ui';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await dispatch(
        login({ email: data.email, password: data.password })
      ).unwrap();

      const primaryRole = result.user.roles[0] as Role | undefined;
      console.log(primaryRole, 'vhvhvhv')
      switch (primaryRole) {
        case Role.Admin:
          navigate('/users');
          break;
        case Role.Receptionist:
          navigate('/appointments');
          break;
        case Role.Dentist:
          navigate('/patients');
          break;
      }
    } catch {
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="text-red-600" role="alert">
              {error}
            </div>
          )}
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <Button
            fullWidth
            loading={status === 'loading'}
            disabled={status === 'loading'}
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}
