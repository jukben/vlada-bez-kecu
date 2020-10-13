import * as React from "react";

export const Info = () => {
  return (
    <>
      <div>
        <p>
          Protože nejlepší komunikační kanál Vlády ČR je ten neoficiální
          od&nbsp;
          <a href="https://www.instagram.com/choco_afro/">
            Dominika&nbsp;Feriho
          </a>
          !
        </p>
        <p>
          Nebavilo mě scrollovat na Instagramu, abych se dozvěděl, co se děje,
          tak jsem udělal tohle. Díky a čau,&nbsp;
          <a href="https://www.twitter.com/jukben/">Jakub&nbsp;Beneš</a>.
          Mimochodem, tohle je{" "}
          <a href="https://github.com/jukben/vlada-bez-kecu">Open Source.</a>
        </p>
      </div>
      <style jsx>{`
        div {
          @apply p-4 text-xl;
        }

        div p {
          @apply m-2;
        }

        div a {
          @apply underline text-black;
        }

        div a:hover {
          @apply no-underline;
        }

        @screen sm {
          div {
            @apply text-3xl;
          }
        }

        @screen md {
          div {
            @apply text-4xl;
          }

          div p {
            @apply m-4;
          }
        }
      `}</style>
    </>
  );
};
