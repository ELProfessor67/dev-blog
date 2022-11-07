import React, { Fragment } from 'react'
import style from '../styles/blogsection.module.scss';
import BlogCard from './BlogCard';
import Link from 'next/link';
import {FiDatabase} from 'react-icons/fi';
import {MdOutlineSecurity} from 'react-icons/md';
import {BsCodeSlash} from 'react-icons/bs';
import {FaFacebookF, FaTwitter, FaInstagram} from 'react-icons/fa';
import { useRouter } from 'next/router';

const BlogSection = ({posts}) => {
  if(posts) posts = JSON.parse(posts);
  const router = useRouter();

  const navigate = (category) => {
    router.push(`/blog?category=${category}`);
  }
  return (
    <>
        <section className={style.section_blog}>
            <div className={style.container}>
                {/* left side  */}
                {posts.length !== 0 &&
                <div className={style.left_side}>
                    <h2 className={style.heading}>Latest Blog Post</h2>
                    <div className={style.blog_card_group}>
                        {posts && posts.map(({image, author, slug, shorDiscreption, category, createdAt, title},i) => {
                            return(
                            <Fragment key={i}>
                                <BlogCard image={image} author={author} createdAt={createdAt} title={title} category={category} shorDiscreption={shorDiscreption} slug={slug}/>
                            </Fragment>
                            )
                        })}
                    </div>
                    <div className={style.btns}>
                        <Link href='/blog'>See More</Link>
                    </div>
                </div>
                }
                {/* right side  */}
                <div className={style.right_side}>
                    <div className={style.topics}>
                        <h2 className={style.heading}>Topics</h2>
                        <div onClick={() => navigate('programming')}>
                            <div>
                                <FiDatabase/>
                            </div>
                            <div>
                                <p>Database</p>
                            </div>
                        </div>
                        <div onClick={() => navigate('cyber security')}>
                            <div>
                                <MdOutlineSecurity/>
                            </div>
                            <div>
                                <p>Cyber Security</p>
                            </div>
                        </div>
                        <div onClick={() => navigate('web development')}>
                            <div>
                                <BsCodeSlash/>
                            </div>
                            <div>
                                <p>Web Development</p>
                            </div>
                        </div>
                    </div>

                    <div className={style.tags}>
                        <h2 className={style.heading}>Tags</h2>
                        <div>
                            <button>#mongodb</button>
                            <button>#nodejs</button>
                            <button>#reactjs</button>
                            <button>#python</button>
                            <button>#expressjs</button>
                            <button>#security</button>
                            <button>#javascript</button>
                            <button>#CSS</button>
                            <button>#HTML</button>
                        </div>
                    </div>

                    <div className={style.lets_talk}>
                        <h2 className={style.heading}>Let&apos;s Talk</h2>
                        <div>
                            <p>
                                Do you want to learn more about how I can help your company overcome problems? Let us have a conversation.
                            </p>
                            <div className={style.social_midea}>
                                <a href='https://www.facebook.com/profile.php?id=100081836541264' target='_zeeshan'><FaFacebookF/></a>
                                <a href='https://twitter.com/JiyaKha21511585' target='_zeeshan'><FaTwitter/></a>
                                <a href='https://www.instagram.com/jiya59219/?igshid=YmMyMTA2M2Y%3D' target='_zeeshan'><FaInstagram/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default BlogSection