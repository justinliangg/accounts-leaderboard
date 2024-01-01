import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head title="Savings Accounts Leaderboard">
        {/* <!-- Chrome, Firefox OS and Opera --> */}
        <meta name="theme-color" content="#ffffff" />
        {/* <!-- Windows Phone (microsoft) --> */}
        <meta name="msapplication-navbutton-color" content="#ffffff" />
        {/* <!-- iOS Safari (apple) --> */}
        <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
