import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layouts/Layout'
import UserList from './pages/UserList'
import AddUser from './pages/AddUser'
import UserView from './pages/UserView'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/dashboard' element={<>simple dashboard</>} />
            <Route path='/user-list' element={<UserList />} />
            <Route path='/add-user' element={<AddUser />} />
            <Route path='/user-view/:id' element={<UserView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
