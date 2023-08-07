import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../data/Context';
import './Header.css'
import cart from '../../img/cart.svg'
import burger from '../../img/menu.png'
import sun from '../../img/sun.svg'
import moon from '../../img/moon.svg'
import defaultAvatar from '../../img/avatar.svg'

const Header = () => {
    const {cardBooks,setCardBooks,theme,setTheme} = useContext(Context)
    const [{user,image}, setParsedUser] = useState({})
    const [mobile, setMobile] = useState(false)
    const signInPerson = localStorage.getItem('user')
    
    let includesBooks = {};
    let filtered = cardBooks.filter(obj => {
        return obj.id in includesBooks ? 0 : (includesBooks[obj.id] = 1);
    });
    
    function signOut (){
        localStorage.removeItem('user')
        localStorage.removeItem('cardBook')
        localStorage.removeItem('data')
        setParsedUser('')
        setCardBooks([])
        setMobile(false)
    }

    useEffect(()=>{
        signInPerson ? setParsedUser(JSON.parse(localStorage.getItem('user'))) : setParsedUser('')
    },[signInPerson])

    return (
        <header className={theme ? 'header_bg-dark header' : 'header' }>
            <div className='header_logo'>
                <Link to='/books'><span>X-course task </span>/ Borys Shahiiev</Link>
            </div>
            <label className="switch">
                <img src={sun} className="sun" alt='Sun'></img>
                <img src={moon} className="moon" alt='Moon'></img>
                <input type="checkbox" className="input" onClick={() => setTheme(!theme)}/>
                <span className="slider"></span>
            </label>
            <div className={user ? 'header_management' : 'hidden'}>
                <div className='header_management_desktop'>
                    <Link className='card_link' to='/cart' data-count={filtered ? filtered.length : false}><img className='header_cart' src={cart} alt='Avatar' /></Link>
                    <Link to='/' className='signout_btn' onClick={signOut} >Sign-Out</Link>
                    <img className='header_avatar' src={image || defaultAvatar} alt='Cart'/>
                    <p>{user}</p>
                </div>
                <button data-count={filtered ? filtered.length : false} className={theme ? 'menu_btn-dark menu_btn' : 'menu_btn'} onClick={() => setMobile(!mobile)}><img src={burger} alt='Menu'/></button>
                <div className={!mobile ? 'header_management_mobile_overlay dark_bg' : 'visible_overlay header_management_mobile_overlay'} onClick={() => setMobile(!mobile)}></div>
                <div className={!mobile ? 'header_management_mobile' : 'visible_menu header_management_mobile'}>
                    <img className='menu_avatar' src={image || defaultAvatar} alt='Avatar'/>
                    <p className='menu_user'>{user}</p>
                    <Link className='menu_books_link' to='/books' onClick={() => setMobile(!mobile)}>Books list</Link>
                    <Link className='menu_card_link' to='/cart' onClick={() => setMobile(!mobile)}>Cart <span className='menu_cart_count'>{filtered.length}</span></Link>
                    <Link to='/' className='menu_signout_btn' onClick={signOut} >Sign-Out</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;