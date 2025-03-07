import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import SkupinePregled from './pages/skupine/SkupinePregled'
import SkupineDodaj from './pages/skupine/SkupineDodaj'
import SkupinePromjena from './pages/skupine/SkupinePromjena'
import moment from 'moment'



function App() {

  function trenutnaGodina(){
    return moment().year();
  }

  return (
    <>
      <Container>
        <NavBarEdunova />
        
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.SKUPINA_PREGLED} element={<SkupinePregled />} />
          <Route path={RouteNames.SKUPINA_NOVI} element={<SkupineDodaj />} />
          <Route path={RouteNames.SKUPINA_PROMJENA} element={<SkupinePromjena />} />
        </Routes>

        <hr />
        &copy; Maja {trenutnaGodina()}
      </Container>
     
    </>
  )
}

export default App
