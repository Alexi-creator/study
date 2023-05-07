import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { Layout } from 'views'

import { selectorUser } from './store/user/selector'
import { useDispatch, useSelector } from 'react-redux'

import { Login } from 'components'

import { AppDispatch } from './store'
import { checkAuth } from './store/user'
import { StatusEnum } from './store/user/types'

export const App: React.FC = () => {
  const { isAuth, status } = useSelector(selectorUser)
  const dispatch = useDispatch<AppDispatch>()

  React.useEffect(() => {
    if (localStorage.getItem('token') && !isAuth) {
      dispatch(checkAuth())
    }
  }, [dispatch, isAuth])

  if (status === StatusEnum.LOADING) {
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
