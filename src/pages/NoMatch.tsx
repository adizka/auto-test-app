import React from 'react'
import { Link } from 'react-router-dom'
import { useEnv } from 'src/hooks/useEnv'
import styles from './NoMatch.module.scss'

export function NoMatch() {
  const { publicUrl } = useEnv()

  return (
    <div className={styles.noMatch}>
      <div>
        <img src={`${publicUrl}/media/logo.png`} alt="CAR1 Group logo" />
      </div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist</p>
      <p>
        You can always go back to the <Link to="/">homepage</Link>
      </p>
    </div>
  )
}
