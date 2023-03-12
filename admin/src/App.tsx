import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { Layout } from 'views'

import { Login } from 'components'

export const App: React.FC = () => {
  const isAuth = false
  const isLoad = false

  if (isLoad) {
    return <div>load</div>
  }

  if (isAuth) {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>home page</div>} />
          <Route path="login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<div>404 page</div>} />
        </Route>
      </Routes>
    )
  }

  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    )
  }

  return <div>error</div>
}
