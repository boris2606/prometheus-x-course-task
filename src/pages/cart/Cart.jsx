import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'
import cartImg from '../../img/cart_blue.svg'
import cartImgWhite from '../../img/cart_white.svg'
import Context from '../../data/Context';

const Cart = () => {
    let {cardBooks,setCardBooks,theme} = useContext(Context)

    const mergedObjects = {};
    cardBooks.forEach(obj => {
        const { id, count, price, title, image } = obj;
        if (mergedObjects.hasOwnProperty(id)) {
            mergedObjects[id].count += count;
        } else {
            mergedObjects[id] = { id, count, price, title, image };
        }
    });
    const mergedABooksArray = Object.values(mergedObjects);

    const totalPriceBooks = mergedABooksArray.reduce((acc, book) => acc + (book.price * book.count),0)

    function clearCard(e){
        e.preventDefault()
        setCardBooks([])
        localStorage.removeItem('cardBook')
    }

    function deleteFromCart(removeBookId){
        setCardBooks(mergedABooksArray.filter(book => book.id !== removeBookId))
        localStorage.setItem('cardBook', JSON.stringify(mergedABooksArray.filter(book => book.id !== removeBookId)))
    }

    return (
        <section className='wrapper_cart'>
            <div className='wrapper_book_form'>
                <form className='cart_form'>
                    <button className={mergedABooksArray.length !== 0 ? 'book_purchase':'disable_btn'}
                            disabled={mergedABooksArray.length !== 0 ? false : true} 
                            onClick={clearCard}>Purchase</button>
                </form>
                {mergedABooksArray.length !== 0 ? 
                    mergedABooksArray.map((book,index) => {
                        return <div className='cart_book' key={index}>
                                    <div className='cart_book_info'>
                                        <div className='cart_book_main_info'>
                                            <img className='cart_book_img' src={book.image} alt={book.title}/>
                                            <h2 className='cart_txt'>Name: <span>{book.title}</span></h2>
                                            <p className='cart_txt'>Price: <span>{book.price}</span></p>
                                            <p className='cart_txt'>Count: <span>{book.count}</span></p>
                                        </div>
                                        <h2 className='cart_txt'>Total price: <span>{(book.count * book.price).toFixed(2)}</span></h2>
                                        <button className='delete_btn' onClick={() => deleteFromCart(book.id)}></button>
                                    </div>
                                </div>
                    })
                :
                <div className={theme ? 'empty_cart_content-dark empty_cart_content' : 'empty_cart_content'}>
                    <img src={theme ? cartImgWhite : cartImg} alt='Cart'/>
                    <p>Cart empty...</p>
                </div>
                }
                {totalPriceBooks ? 
                <p className={theme ? 'total_price_carts-dark total_price_carts' : 'total_price_carts'}>Total price, $: {totalPriceBooks.toFixed(2)}</p> : 
                false}
                <Link className='return_btn_cart' to='/'>Go to books</Link>
            </div>
        </section>
    );
};

export default Cart;