import Head from 'next/head'

import '../styles/reset.css'

export default function CC({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Shu’s Creative Coding Template</title>
      </Head>
      <Component {...pageProps} />
      <div className="author">
        2021 © Shu Ding.&nbsp;
        <a href="https://twitter.com/shuding_" target="_blank">
          @shuding_
        </a>
        .&nbsp;
        <a href="https://github.com/shuding/cc" target="_blank">
          GitHub Repository
        </a>
        .
      </div>
    </>
  )
}
