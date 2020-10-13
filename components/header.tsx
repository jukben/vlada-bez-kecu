import Head from "next/head";
import * as React from "react";

const isProduction = process.env.NODE_ENV === "production";

const GA_TRACKING_ID = "UA-6746435-8";

export const Header = () => (
  <>
    <Head>
      <title>VládaBezKeců.cz</title>
      <meta
        name="description"
        content="Protože nejlepší komunikační kanál Vlády ČR je ten neoficiální od Dominika Feriho!"
      />
      <meta
        name="keywords"
        content="Dominik Feri, Vlada Bez Kecu, Vláda Bez Keců, Covid, Covid-19"
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
      {isProduction && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
            
                gtag('config', '${GA_TRACKING_ID}');
              `,
            }}
          />
        </>
      )}
    </Head>

    <style global jsx>{`
      body {
        @apply bg-white p-0 m-0 font-sans bg-yellow;
      }
    `}</style>
  </>
);
