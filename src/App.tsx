import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { Footer } from './layout/Footer'
import { Header } from './layout/Header'
import { Index as CarDetails } from './pages/car-details/Index'
import { Index as Cars } from './pages/cars/Index'
import { NoMatch } from './pages/NoMatch'
import styles from './App.module.scss'

function App() {
  return (
    <>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/cars" />
            </Route>
            <Route path="/cars/:carId" component={CarDetails} />
            <Route path="/cars" component={Cars} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
