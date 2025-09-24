import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layouts/Layout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/dashboard' element={<>simple dashboard</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
