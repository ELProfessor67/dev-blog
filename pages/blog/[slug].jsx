import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import style from '../../styles/blogdetail.module.scss';
import { Avatar} from '@mui/material';
import {IoMdTime} from 'react-icons/io';
import mongoose from 'mongoose';
import Post from '../../models/post';
import Error from 'next/error';
import agoFinder from '../../utils/agoFinder';
import Head from 'next/head';
import Link from 'next/link';
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import ReactMarkdown from 'react-markdown';

import 'highlight.js/styles/atom-one-dark.css';

function YouTube({ id }) {
  return (
    <div className={style.youtubecontainer}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        className={style.frame}
      />
    </div>
  );
}

function Ima({ src }) {
  return (<Image src={src} width={1703} height={980} alt="image"/>);
}

function Slug({post, reletedPost, source}){
  
  post = JSON.parse(post);
  reletedPost = JSON.parse(reletedPost);
  const [loadMore, setLoadMore] = useState(5);
  const LoadmoreHandler = () => {
    setLoadMore(loadMore + 5);
  }
  
  if(!post){
    return<Error statusCode={404} />
  }

  return (<>
    <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.shorDiscreption}/>
    </Head>
    <section className={style.section_blog__detail}>
        <div className={style.container}>
            <div className={style.detail_box}>
                <h1>{post.title}</h1>
                <div className={style.blog_author}>
                    <div className={style.avatar}>
                    <Avatar src={post.author.avatar.url} sx={{width: '5rem', height: '5rem'}}/>
                    </div>
                    <div className={style.name}>
                    <h4>{post.author.name}</h4>
                    <p>{new Date(post.createdAt).toDateString()} .<span><IoMdTime/> {agoFinder(post.createdAt)}</span></p>
                    </div>
                </div>
                <div className={style.image_box}>
                    <Image src={post.image.url} width={1703} height={980} alt='blog image'/>
                </div>
                <div className={style.markdown}>
                    <MDXRemote {...source} components={{ YouTube, Ima }}/>
                </div>
            </div>
            {
                reletedPost.length !== 0 &&
                <div className={style.releted_post}>
                    <h2>Releted Post</h2>
                    <div className={style.releted_post__container}>
                        {
                            reletedPost && reletedPost.length !== 0 &&
                            reletedPost.slice(0,loadMore).map(({createdAt, title, shorDiscreption, slug},i) => {
                                return(
                                    <Fragment key={i}>
                                        <div className={style.card}>
                                            <time>{new Date(createdAt).toDateString()}</time>
                                            <h2>{title}</h2>
                                            <p>{shorDiscreption}</p>
                                            <Link href={`/blog/${slug}`}>Read More</Link>
                                        </div>
                                    </Fragment>
                                )
                            })
                        }
                        {
                            reletedPost && reletedPost.length !== 0 && reletedPost.length > loadMore && 
                            <a onClick={LoadmoreHandler}>Load More</a>
                        }
                    </div>
                </div>
            }
        </div>
        {/* <Code/> */}
    </section>
    </>
  )
}

export default Slug;


// server side prps
export async function getServerSideProps(context){
        const slug = context.query.slug;
        // connect to DB
        if(!mongoose.connections[0].readyState){
            await mongoose.connect(process.env.DATABASE_URL);
        }
        let reletedPost = null;
        let mdxSource = null;

        const post = await Post.findOne({slug}).populate('author');
        if(post.content) mdxSource = await serialize(post.content, {
            mdxOptions: {
                rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings,{behavior: 'wrap'}],
                    rehypeHighlight
                ]
            }
        });
        if(post.category) reletedPost = await Post.find({category: post.category});
        if(reletedPost) reletedPost = reletedPost.filter(({_id}) => {
            return _id.toString() !== post._id.toString();
        });

        return({
            props: {
                post: post ? JSON.stringify(post) : null,
                reletedPost: reletedPost ? JSON.stringify(reletedPost) : null,
                source: mdxSource
            }
        });
}