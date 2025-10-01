import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layouts/Layout'
import UserList from './pages/UserList'
import AddUser from './pages/AddUser'
import UserView from './pages/UserView'
import EditUser from './pages/EditUser'
import { SearchProvider } from './context/SearchContext'

function App() {
  return (
    <>
      <SearchProvider>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/dashboard' element={<>simple dashboard</>} />
              <Route path='/user-list' element={<UserList />} />
              <Route path='/add-user' element={<AddUser />} />
              <Route path='/user-view/:id' element={<UserView />} />
              <Route path='/edit-user/:id' element={<EditUser />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SearchProvider>

    </>
  )
}

export default App
