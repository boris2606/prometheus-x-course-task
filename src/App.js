import { Route, Routes } from 'react-router-dom'
import './App.css'
import './theme-styles/Theme.css'
import SignIn from "./pages/signin/SignIn"
import Context from './data/Context';
import BookList from './pages/book-list/BookList';
import ProtectedRoutes from './ProtectedRoutes';
import SpecificBook from './pages/specific-book/SpecificBook'
import Cart from './pages/cart/Cart';
import { useEffect, useState } from 'react';
import Error from './pages/error-page/Error';
import Layout from './components/Layout';

function App() {

  const [cardBooks,setCardBooks] = useState([])
  const [filteredBooks,setFilteredBooks] = useState([])
  const [theme,setTheme] = useState(false)

  const data = JSON.parse(localStorage.getItem('data')) || []

  const fetchData = async () => {
    try {
      await fetch('books.json')
              .then(response => response.json())
              .then(dataBooks => {
                localStorage.setItem('data', JSON.stringify(dataBooks))
              })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> { 
    fetchData()
    setCardBooks(JSON.parse(localStorage.getItem('cardBook')) || [])
  },[setCardBooks])

  return (
    <Context.Provider value={{data,cardBooks,setCardBooks,filteredBooks,setFilteredBooks,theme,setTheme}}>
      <main className={theme ? 'app_bg-dark App' : 'App'}>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<SignIn/>}/>
            <Route path='/books' element={<ProtectedRoutes component={<BookList/>}/>}/>
            <Route path='/books/:bookId' element={<ProtectedRoutes component={<SpecificBook/>} error={<Error/>}/>}/>
            <Route path='/cart' element={<ProtectedRoutes component={<Cart/>}/>}/>
            <Route path='*' element={<Error/>}/>
          </Route>
        </Routes>
      </main>
    </Context.Provider>
  );
}

export default App;
