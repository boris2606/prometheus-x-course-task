import React, {useCallback, useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './BookList.css'
import Context from '../../data/Context';
import imageNotFound from '../../img/imageNotFound.png'

const BookList = () => {
    let {data,filteredBooks,setFilteredBooks,theme} = useContext(Context)
    
    const [search,setSearch] = useState('')
    const [price,setPrice] = useState('All')
    const [tag,setTag] = useState('All')
    const [level,setLevel] = useState('All')

    const filterFunction = useCallback((priceValueMin, priceValueMax ) => {
        setFilteredBooks(data.books
            .filter(book => tag !== 'All' ? book.tags.includes(tag) : data.books)
            .filter(book => level !== 'All' ? book.level === level : data.books)
            .filter(book => book.price >= priceValueMin && book.price <= priceValueMax))
    },[data.books,setFilteredBooks,tag,level])

    function resetFilters () {
        setPrice('All')
        setTag('All')
        setLevel('All')
        setSearch('')
    }

    function preventDefault(e){
        e.preventDefault()
    }

    useEffect(() => {
        switch (price) {
            case 'All':
                filterFunction(0,100)
                break;
            case '15':
                filterFunction(0,15)
                break;
            case '30':
                filterFunction(15,30)
                break;
            case '30+':
                filterFunction(30,100)
                break;
            default:
                break;
        }
    },[price,filterFunction])

    return (
        <section className='books_wrapper'>
            <div className='books_filters'>
                <form className='books_filters_form' onSubmit={(e)=>preventDefault(e)}>
                    <input className='books_search' 
                            placeholder='Search by book name' 
                            onChange={(e) => setSearch(e.target.value)}/>
                    <div className='select_content'>
                        <select className='books_value' onChange={(e)=>setPrice(e.target.value)}>
                            <option value='All'>All Prices</option>
                            <option value='15'>0-15 $</option>
                            <option value='30'>15-30 $</option>
                            <option value='30+'>30+ $</option>
                        </select>
                    </div>
                    <div className='select_content'>
                        <select className='books_value' onChange={(e)=>setTag(e.target.value)}>
                            <option value='All'>All tags</option>
                            <option value='core'>Core</option>
                            <option value='frontend'>Front-end</option>
                            <option value='javascript'>JavaScript</option>
                            <option value='react'>React</option>
                            <option value='angular'>Angular</option>
                            <option value='testing'>Testing</option>
                            <option value='ui'>UI</option>
                            <option value='ajax'>Ajax</option>
                            <option value='git'>Git</option>
                            <option value='db'>DB</option>
                            <option value='css'>CSS</option>
                            <option value='html'>HTML</option>
                            <option value='node'>Node.js</option>
                        </select>
                    </div>
                    <div className='select_content'>
                        <select className='books_value' onChange={(e)=>setLevel(e.target.value)}>
                            <option value='All'>All levels</option>
                            <option value='Beginner'>Beginner</option>
                            <option value='Middle'>Middle</option>
                            <option value='Pro'>Pro</option>
                        </select>
                    </div>
                    <button className='filters_reset' type='reset' onClick={resetFilters}>Reset filters</button>
                </form>
            </div>
        {filteredBooks.length !== 0 ? 
            <div className='books_container'>
                {filteredBooks.map((book,id) => {
                    if (book.title.toLowerCase().includes(search.toLowerCase())){
                        return <article className={theme ? 'book_bg-dark book' : 'book'} key={id}>
                                    <img className='book_image' 
                                            src={book.image || imageNotFound} 
                                            alt='Book poster'/>
                                    <div className='book_info_content'>
                                        <div className='book_info'>
                                            <h1 className='book_info_title'>{book.title.length >= 24 ? book.title.substring(0,24) + '...' : book.title}</h1>
                                            <p className='book_author'>{book.author}</p>
                                        </div>
                                        <div className='book_btn'>
                                            <p className='book_price'>{book.price} $</p>
                                            <Link className='view_btn' to={`/books/${book.id}`}>View</Link>
                                        </div>
                                    </div>
                                </article>
                        }
                    })
                }
            </div> : 
            <div className='books_not_found'>
                <p className='books_not_fount_txt'>There are no books at your request</p>
            </div>
        }
        </section>
    );
};

export default BookList;