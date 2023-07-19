import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../data/Context';
import './SIgnIn.css'
import defaultAvatar from '../../img/avatar.svg'
import defaultAvatarWhite from '../../img/avatar_white.svg'

const SignIn = () => {
    const {theme} = useContext(Context)
    const signInPerson = localStorage.getItem('user')

    const [user,setUser] = useState('')
    const [image,setImage] = useState('')

    const [validName, setValidName] = useState(true)
    const navigate = useNavigate()

    const submitPerson = e => {
        localStorage.setItem('user', JSON.stringify({user,image}))
        setUser('')
        navigate('/books')
    }

    const fileSelectedHandler = e => { 
        e.target.files[0] ? setImage(URL.createObjectURL(e.target.files[0])) : setImage(defaultAvatar)
    }

    useEffect(()=>{
        if (signInPerson){
            return navigate("/books");
        }
        user.length >= 4 && user.length <= 16 ? setValidName(false) : setValidName(true)
    },[user])

    return (
        <section className='sign_in_wrapper'>
            <div className='sign_in_block'>
                <img className='sign_in_avatar' 
                    src={theme ? image || defaultAvatarWhite : image || defaultAvatar} 
                    alt='Avatar person'/>
                <div className={theme ? 'file_input_container-dark file_input_container' : 'file_input_container'}>
                    <label className={theme ? 'file_label-dark file_label' : 'file_label'}>select avatar</label>
                    <input type="file" className="file_input" onChange={fileSelectedHandler}/>
                </div>
                <form className='sign_in_form' onSubmit={submitPerson}>
                    <label htmlFor='name' className={theme ? 'label_name-dark' : ''}>Username</label>
                    <input className={theme ? 'label_name-dark sign_in_input' : 'sign_in_input'} 
                            type='text' 
                            value={user} 
                            id='name' 
                            placeholder='Enter your name' 
                            required 
                            onChange={(e)=>setUser(e.target.value)}/>
                    <button  className={!validName ? 'sign_in_btn-dark sign_in_btn' : 'incorrect'} type='submit' disabled={validName}>Sign-In</button>
                </form>
            </div>
        </section>
    );
};

export default SignIn;