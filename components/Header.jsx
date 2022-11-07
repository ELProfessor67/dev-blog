import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import style from '../styles/Header.module.scss';
import {FaSearch} from 'react-icons/fa';
import {IoMdClose} from 'react-icons/io';
import {BsFillMoonFill, BsFillSunFill} from 'react-icons/bs';
import {FiMenu} from 'react-icons/fi';
import { useRouter } from 'next/router';
import {useSelector} from 'react-redux';

const Header = ({theme,setTheme}) => {
  const {isAdmin} = useSelector(state => state.auth);
  const [search, setSearch] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const onScrollSticky = () => {
    if(window.scrollY > 600){
        document.body.classList.add('sticky');
      }else{
        document.body.classList.remove('sticky');
    }
  }

  const searchhandler = () => {
    if(query.trim()){
      router.push(`/blog?query=${query}`);
      setNavActive(false);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(query.trim()){
      router.push(`/blog?query=${query}`);
      setNavActive(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll',onScrollSticky);
    return () => {
        window.removeEventListener('scroll',onScrollSticky); 
    }
  },[]);

  useEffect(() =>{
    document.body.className = theme;
  },[theme]);
  return (
    <header className={style.header}>
        <div className={style.container}>
          <div className={style.logo}>
              {
                theme === 'light-theme'?
                <Link href='/'><Image src='/images/logo-light.svg' alt='dark logo' width={150} height={50}/></Link>:
                <Link href='/'><Image src='/images/logo-dark.svg' alt='dark logo' width={150} height={50}/></Link>
              }
          </div>
          <div>
            <nav className={navActive && style.active}>
                <ul>
                    <li onClick={() => setNavActive(false)}><Link href='/'>Home</Link></li>
                    <li onClick={() => setNavActive(false)}><a href='https://sawira-majeed.herokuapp.com/' target='_zeeshan'>About</a></li>
                    <li onClick={() => setNavActive(false)}><Link href='/contact'>Contact</Link></li>
                    <li onClick={() => setNavActive(false)}><Link href='/blog'>Blog</Link></li>
                    {
                      isAdmin &&
                      <li onClick={() => setNavActive(false)}><Link href='/devblog-author/dashboard'>Dashboard</Link></li>
                    }
                    <li onClick={() => setSearch(!search)}><span>{search ? <IoMdClose/>: <FaSearch/> }</span></li>
                </ul>
                {/*<div className={`${style.search_box} ${search && style.search_active}`}>
                  <input type='text' placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)}/>
                  <span onClick={searchhandler}><FaSearch/></span>
                </div>*/}

                <form className={`${style.search_box} ${search && style.search_active}`} onSubmit={submitHandler}>
                  <input type='text' placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)}/>
                  <span onClick={searchhandler}><FaSearch/></span>
                </form>
            </nav>
            <button onClick={() => theme === 'light-theme' ? setTheme('dark-theme') : setTheme('light-theme')}>
              {
                theme === 'light-theme'?
                <BsFillSunFill/>:
                <BsFillMoonFill/>
              }
            </button>
            <div className={style.burger_menu} onClick={() => setNavActive(!navActive)}>
              {
                navActive ?
                <IoMdClose/> :
                <FiMenu/>
              }
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header;