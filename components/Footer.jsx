import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import style from '../styles/footersection.module.scss';
import Image from 'next/image';
import {loadAdmin} from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';

const Footer = ({theme}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadAdmin());
    },[]);


    // show message
    const {error, message, isAdmin} = useSelector(state => state.auth);
    useEffect(() => {
        if(error && isAdmin){
            toast.error(error, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // theme: "light",
            });
            dispatch({type: 'clearError'});
        }

        if(message && isAdmin){
            toast.success(message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                // theme: "light",
            });
            dispatch({type: 'clearMessage'});
        }
    },[error,message]);

  return (
    <footer>
        <div className={style.section_footer}>
            <div className={style.container}>
                <div className={style.about}>
                    <Link href='/'>
                    {
                        theme === 'light-theme'?
                        <Image src='/images/logo-light.svg' alt='dark logo' width={200} height={50}/>:
                        <Image src='/images/logo-dark.svg' alt='dark logo' width={200} height={50}/>
                    }
                    </Link>
                    <p>Learn about Cyber Security, Web Development and Database management.</p>
                </div>
                <div className={style.quick_link}>
                    <h3>Quick Links</h3>
                    <Link href='/'>Advertise with us</Link>
                    <a href='https://sawira-majeed.herokuapp.com/' target='_zeeshan'>About Us</a>
                    <Link href='/contact'>Contact Us</Link>
                </div>
                <div className={style.legal_link}>
                    <h3>Legal Stuff</h3>
                    <Link href='/'>Privacy Notice</Link>
                    <Link href='/'>Cookie Policy</Link>
                    <Link href='/'>Terms Of Use</Link>
                </div>
            </div>
        </div>
        <p className={style.bottom}>© Copyright 2022 | This template this is made <span style={{color: 'red'}}>❤</span> by Jiya Khan.</p>
    </footer>
  )
}

export default Footer