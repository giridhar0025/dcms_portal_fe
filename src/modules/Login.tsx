import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/auth/authSlice'

export default function Login() {
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm<{ username: string }>()

  const onSubmit = (data: { username: string }) => {
    dispatch(login(data.username))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">

    </form>
  )
}
