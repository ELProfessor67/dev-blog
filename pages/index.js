import Head from 'next/head'
import Image from 'next/image'
import style from '../styles/Home.module.scss'
import ReactTypingEffect from 'react-typing-effect';
import Link from 'next/link';
import BlogSection from '../components/BlogSection';
import { useState } from 'react';
import mongoose from 'mongoose';
import Post from '../models/post';
import Script from 'next/script';


export default function Home({posts}) {
  return (
    <>
      <Head>
        <title>Home --devblog.com</title>
      </Head>
      <Script
        src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
        async=""
      ></Script>
      <main className={style.hero_section}>
        <div className={style.container}>
            {/* left side */}
            <div className={style.left_side}>
              <h1>Hi, I&apos;m <span>Jiya Khan</span>.
                <br/>
                <ReactTypingEffect
                  eraseDelay={2000}
                  speed={100}
                  eraseSpeed={100}
                  typingDelay={800}
                  text={["Web Developer.", "Data Analyst.", "Programmer.", "Database Expert.", "Freelancer.", "Security Expert."]}
                />
              </h1>
              <p>Specialized in Cyber Security and Web Development.</p>
              <div className={style.btns}>
                <Link href='/contact'>Contact Me</Link>
                <Link href='https://sawira-majeed.herokuapp.com/'>About Me</Link>
              </div>
            </div>

            {/* right side  */}
            <div className={style.right_side}>
                <div className={style.image_box}>
                  <div className={style.pattern}></div>
                  <div className={style.image}>
                    <img src='/images/hero.png' alt='hero image'/>
                    <div className={style.shape_1}></div>
                    <div className={style.shape_2}></div>
                  </div>
                </div>
            </div>
        </div>
      </main>
      <BlogSection posts={posts}/>
    </>
  );
}

export async function getServerSideProps(context){
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.DATABASE_URL);
  }
  const post = await Post.find().sort({createdAt: -1}).limit(10).populate('author');

  return{props: {
    posts: post ? JSON.stringify(post) :  null
  }}
}