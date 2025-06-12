import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const Home = lazy(() => import('./modules/Home'))
const Login = lazy(() => import('./modules/Login'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
