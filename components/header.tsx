import Head from "next/head";
import * as React from "react";

export const Header = () => (
  <>
    <Head>
      <title>VládaJasně.cz</title>
      <meta
        name="description"
        content="Protože nejlepší komunikační kanál Vlády ČR je ten neoficiální od Dominika Feriho!"
      />
      <meta
        name="keywords"
        content="Dominik Feri, Vlada Jasne, Vláda Jasně, Covid, Covid-19"
      />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Jakub Beneš" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
    </Head>

    <style global jsx>{`
      body {
        @apply bg-white p-0 m-0 font-sans bg-yellow;
      }
    `}</style>
  </>
);
