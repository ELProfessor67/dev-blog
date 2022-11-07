import Link from 'next/link';
import React from 'react'
import style from '../styles/blogsection.module.scss';
import Avatar from '@mui/material/Avatar';
import {IoMdTime} from 'react-icons/io'
import agoFinder from '../utils/agoFinder';
import Image from 'next/image';

const BlogCard = ({image, author, slug, shorDiscreption, category, createdAt, title}) => {
  return (
    <div className={style.card}>
        {/* binner */}
        <div className={style.card_banner}>
          <img src={image.url}/>
          {/*<Image src={image.url} layout='fill'/>*/}
        </div>
        <div className={style.blog_content}>
          <button>{category}</button>
          <Link href={`/blog/${slug}`}><h3>{title}</h3></Link>
          <p>{shorDiscreption.substr(0,200)}</p>
          <div className={style.blog_author}>
            <div className={style.avatar}>
              <Avatar src={author.avatar.url} sx={{width: '5rem', height: '5rem'}}/>
            </div>
            <div className={style.name}>
              <h4>{author.name}</h4>
              <p>{new Date(createdAt).toDateString()}  .<span><IoMdTime/> {agoFinder(createdAt)}</span></p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default BlogCard