import { Header } from '@/content/header'
import { Intro } from '@/content/intro'
import Head from 'next/head'
import {basePath} from '../../next.config';

export default function Home() {
  return (
    <>
      <Head>
        <title>Decartes Web 3</title>
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Header />
      <Intro />
    </>
  )
}
