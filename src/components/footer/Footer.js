import React, { useContext } from 'react';
import './Footer.css'
import Context from '../../data/Context';

const Footer = () => {
    const {theme} = useContext(Context)

    return (
        <footer className={theme ? 'footer_bg-dark footer' : 'footer' }>
            <p className='footer_text'>Created in <a href='https://prometheus.org.ua/' target='_blank' rel='noreferrer'>Prometheus</a> © 2023</p>
        </footer>
    );
};

export default Footer;