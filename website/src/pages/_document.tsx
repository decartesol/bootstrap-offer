import { Html, Head, Main, NextScript } from 'next/document';
import nextConfig from '../../next.config';
import * as consts from '@/utils/constants';

console.log(`consts of ${JSON.stringify(consts)}`);
console.log(`process env DEV_HELIUS_API_KEY`, process.env['DEV_HELIUS_API_KEY']);
console.log(`process env NEXT_PUBLIC_HELIUS_KEY`, process.env['NEXT_PUBLIC_HELIUS_KEY']);

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href={`${nextConfig.basePath}/custom.css`} />
        <link rel="stylesheet" href={`${nextConfig.basePath}/pico-master/css/pico.min.css`} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
