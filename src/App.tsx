import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'

const Home = lazy(() => import('./modules/Home'))
const Login = lazy(() => import('./modules/Login'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </Suspense>
  )
}

export default App
