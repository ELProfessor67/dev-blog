import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charset="UTF-8"/>
        <meta name="description" content="dev blog this blog for developer. In this blog you will increase your knowledge."/>
        <meta name="keywords" content="HTML, CSS, JavaScript, Nextjs, deb blog"/>
        <meta name="author" content="Zeeshan Raza"/>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}