import React, { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import style from '../styles/blogPage.module.scss';
import BlogPageCard from '../components/BlogPageCard';
import Link from 'next/link';
import mongoose from 'mongoose';
import Post from '../models/post';
import Filters from '../utils/Filters';
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from 'next/head';

function Blog({query, category, posts, categoryList}){
  if(posts) posts = JSON.parse(posts);
  if(categoryList) categoryList = JSON.parse(categoryList);
  const [count,setCount] = useState(5);

  const fetchData = () => {
    setTimeout(() => {
        setCount(count + 5);
      }, 1500);
  }

  useEffect(() => {
    setCount(5);
  },[query, category])

  return (
    <section className={style.blog_page__secction}>
        <Head>
            <title>Blog --devblog.com</title>
        </Head>
        {
            query && 
            <h1 className={style.query}>Results for query: <span>{query}</span></h1>
        }
        <div className={style.container}>
            {
                !query &&
                <div className={style.category}>
                    <ul>
                        <li className={!categoryList.includes(category) ? style.active : null}><Link href={`/blog`}>Recent</Link></li>
                        {
                            categoryList.length !== 0 && Array.from(categoryList).map((cat,i) => (<Fragment key={i}><li className={category && category === cat ? style.active : null}><Link href={`/blog?category=${cat}`}>{cat}</Link></li></Fragment>))
                        }
                    </ul>
                </div>
            }

            <InfiniteScroll
                className={style.blog_container}
                dataLength={count} //This is important field to render the next data
                next={fetchData}
                hasMore={posts && count <= posts.length}
                loader={
                  <Fragment>
                    {
                      <div className={style.loader_container}>
                        <div className={style.loader}></div>
                      </div>
                    }
                  </Fragment>
                }
                scrollableTarget="scrollableDiv"
                endMessage={
                  <Fragment>
                    {posts && posts.length > 5 ?
                      <p className={style.see_all}>
                        You see all results
                      </p> : ''
                    }
                  </Fragment>
                }
            >
            {
                posts && 
                posts.slice(0,count).map(({image, author, slug, shorDiscreption, category, createdAt, title}) => {
                    return <Fragment key={slug}><BlogPageCard image={image} author={author} createdAt={createdAt} title={title} category={category} shorDiscreption={shorDiscreption} slug={slug} /></Fragment>
                })
            }
            {
                !posts && query &&
                <h2 className={style.not_found}>No Results Found</h2>
            }
            {
                !posts && !query &&
                <h2 className={style.not_found}>No posts yet</h2>
            }
            </InfiniteScroll>
        </div>
    </section>
  )
}

export default Blog;

export async function getServerSideProps(context){
    const {query, category} = context.query;
    if(!mongoose.connections[0].readyState){
        await mongoose.connect(process.env.DATABASE_URL);
    }
    const postsCategory = await Post.find();
    const categoryList = new Set();
    postsCategory.forEach(({category:cat}) => {
        categoryList.add(cat);
    });

    const filterPosts = new Filters(Post.find().populate('author'), context.query).search().searchCategory()
    const posts = await filterPosts.data;

    return{props:{
        query: query && query.length !== 0 ? query : null,
        category: category && category.length !== 0 ? category : null,
        posts: posts.length !== 0 ? JSON.stringify(posts) : null,
        categoryList: categoryList.length !== 0 ? JSON.stringify(Array.from(categoryList)) : null
    }}
}