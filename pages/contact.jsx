import React from 'react';
import style from '../styles/contact.module.scss';
import Head from 'next/head';
import {useState} from 'react';
import {message as messageSender} from '../redux/action';
import {toast} from 'react-toastify';

const Contact = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const mess = await messageSender(name,email,subject,message);

    toast.success(mess, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  }

  return (
    <section className={style.contact_section}>
      <Head>
        <title>Contact --devblog.com</title>
      </Head>
      <div className={style.container}>
          <div className={style.form_container}>
            <h1 className={style.heading}>Contact Us</h1>
            <form onSubmit={submitHandler}>
              <div className={style.input_field}>
                  <label htmlFor='name'>Name</label>
                  <input type='text' placeholder='Name' id='name' value={name} onChange={(e) => setName(e.target.value)} name='name' required/>
              </div>
              <div className={style.input_field}>
                  <label htmlFor='email'>Email</label>
                  <input type='email' placeholder='Email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' required/>
              </div>
              <div className={style.input_field}>
                  <label htmlFor='subject'>Subject</label>
                  <input type='text' placeholder='Subject' id='subject' value={subject} onChange={(e) => setSubject(e.target.value)} name='subject' required/>
              </div>
              <div className={style.input_field}>
                  <label htmlFor='message'>Message</label>
                  <textarea type='text' placeholder='Message' id='message' value={message} onChange={(e) => setMessage(e.target.value)} className={style.content} name='message' required/>
              </div>
              <div className={style.input_field}>
                <button type='submit' className={style.btn}>Submit</button>
              </div>
            </form>
          </div>
      </div>
    </section>
  )
}

export default Contact