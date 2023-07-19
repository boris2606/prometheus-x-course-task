import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Context from '../../data/Context';
import './SpecificBook.css'
import imageNotFound from '../../img/imageNotFound.png'

const SpecificBook = () => {

    const {bookId} = useParams()
    const {data,cardBooks,setCardBooks,theme} = useContext(Context)

    const [count,setCount] = useState(1)
    const [amountArr,setAmountArr] = useState([])

    let cardBookTotalCount = amountArr.reduce((acc, elem) => acc + elem.count,0)

    const countIncrement = (e) => {
        e.preventDefault()
        setCount(prev => prev < 42 ? prev + 1 : 42)
    }
    const countDecrement = (e) => {
        e.preventDefault()
        setCount(prev => prev > 1 ? prev - 1 : prev)
    }

    const addToCard = (e,book) =>{
        e.preventDefault()
        if (count >= 1 && count <= book.amount - cardBookTotalCount){
            let addedBook = {
                id: +bookId,
                count,
                inCard:true,
                title: book.title,
                price: book.price,
                image: book.image
            }
            localStorage.setItem('cardBook', JSON.stringify([...cardBooks || [], addedBook]))
            setCardBooks(JSON.parse(localStorage.getItem('cardBook')) || [])
        }
    }

    useEffect(() => {
        cardBooks.forEach(element => element.id === +bookId ? setCount(element.count) : false)
        setAmountArr(cardBooks.filter(element => element.id === +bookId))
    },[bookId,cardBooks])

    return (
        <section className='book_wrapper'>
            {data.books.map((book,id) => {
                if (book.id === +bookId){
                    return <div className={theme ? 'book_content-dark book_content' : 'book_content'} key={id}>
                                <div className='book_info_single'>
                                    <div className='book_img_wrapper'>
                                        <img className='book_img' 
                                            src={book.image || imageNotFound} 
                                            alt='Book wallpaper'
                                        />
                                    </div>
                                    <div className='book_property_content'>
                                        <div className='book_property'>
                                            <div className='book_property_info'>
                                                <h2>{book.title}</h2>
                                                <p>Book author : <span>{book.author}</span></p>
                                                <p>Book level : <span>{book.level}</span></p>
                                                <div className='book_tags'>
                                                    <span className='book_tags_tit'>Tags : </span>
                                                    {book.tags.map((tag,idTag)=>{
                                                        return <span className='book_tag' key={idTag}>{tag} / </span>      
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='book_buy_settings'>
                                            <form className='book_form'>
                                                <div className='book_form_row'>
                                                    <p>Price , $</p>
                                                    <span data-testid='price'>{book.price}</span>
                                                </div>
                                                <div className='book_form_row'>
                                                    <label htmlFor='book_count'>Count</label>
                                                    <input data-testid='counter'
                                                            className={theme ? 'value_books-dark value_books' : 'value_books'} 
                                                            type='number' 
                                                            min='1' 
                                                            max='42' 
                                                            value={count} 
                                                            onChange={(e)=> {
                                                                if (e.target.value >= 1 && e.target.value <= book.amount){
                                                                    setCount(+e.target.value)
                                                                }
                                                            }}
                                                    />
                                                    <div className='count_block'>
                                                        <button className='count_block_button' 
                                                                data-testid='increment' 
                                                                onClick={(e)=> countIncrement(e)}>
                                                                +
                                                        </button>
                                                        <hr noshade='true'/>
                                                        <button className='count_block_button' 
                                                                data-testid='decrement' 
                                                                onClick={(e)=> countDecrement(e)}>
                                                                -
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='book_form_row'>
                                                    <p>Total price</p>
                                                    <span>{(book.price * count).toFixed(2)}</span>
                                                </div>
                                                <div className='book_form_row'>
                                                    <p>Amount</p>
                                                    <span>{book.amount - cardBookTotalCount || 'Sold'}</span>
                                                </div>
                                                <button type='submit' 
                                                        className={(book.amount - cardBookTotalCount) > 0 &&  count <= (book.amount - cardBookTotalCount) ? 'book_buy_btn' : 'disable'} 
                                                        onClick={(e) => addToCard(e,book)}>
                                                    Add to card
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className='book_descr'>
                                    <p>{book.description}</p>
                                </div>
                                <Link className='all_books_btn' to='/'>Watch all books</Link>
                            </div>
                }
            })}
        </section>
    );
};

export default SpecificBook;