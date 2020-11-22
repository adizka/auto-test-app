import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useEnv } from '../hooks/useEnv'
import styles from './Header.module.scss'

export function Header() {
  const { publicUrl } = useEnv()

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={`${publicUrl}/media/logo.png`} alt="CAR1 Group" />
      </Link>

      <nav>
        <ul className={styles.nav}>
          <li>
            <NavLink to="/purchase">Purchase</NavLink>
          </li>
          <li>
            <NavLink to="/my-orders">My Orders</NavLink>
          </li>
          <li>
            <NavLink to="/sell">Sell</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
