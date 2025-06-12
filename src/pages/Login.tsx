import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../app/hooks'
import { login } from '../features/auth/authSlice'

export default function Login() {
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm<{ username: string }>()

  const onSubmit = (data: { username: string }) => {
    dispatch(login(data.username))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <Input placeholder="Username" {...register('username')} />
      <Button type="submit">Login</Button>
    </form>
  )
}
