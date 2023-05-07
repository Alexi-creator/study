import { useDispatch, useSelector } from 'react-redux'

import styles from './Header.module.scss'
import { AppDispatch } from 'src/store'
import { logoutUser } from 'src/store/user'
import { selectorUser } from 'src/store/user/selector'

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuth } = useSelector(selectorUser)

  return (
    <div className={styles.root}>
      Header
      {isAuth && <button onClick={() => dispatch(logoutUser())}>logout</button>}
    </div>
  )
}
