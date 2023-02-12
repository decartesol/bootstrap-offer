import { Calculator } from '@/content/calculator'
import { Header } from '@/content/header'
import { Intro } from '@/content/intro'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Decartes Web 3</title>
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      <Header />
      <Intro />
    </>
  )
}
