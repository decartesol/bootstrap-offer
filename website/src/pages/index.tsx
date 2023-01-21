import { Calculator } from '@/content/calculator'
import { Intro } from '@/content/intro'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Decartes Web 3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2>Intro</h2>
        <Intro address='9Mi32KJbNY3U7kfB8A1Uv8KMukRBa6JKcMYLZSizS6g' />
        <h2>Calculator</h2>
        <Calculator />
      </main>
    </>
  )
}
