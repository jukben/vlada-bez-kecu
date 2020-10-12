import * as React from "react";
import { Header } from "../components/header";
import { getTimeline } from "../utils/timeline";

type TFeed = {
  timeline: Array<{ url: string; post: string }>;
};

export default function Feed(props: TFeed) {
  const timeline = props.timeline;

  return (
    <>
      <Header />
      <main>
        <div className="info">
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
          </p>
        </div>
        <div className="content">
          {!timeline && (
            <div className="fallback">
              <span>Žádná aktualita!</span>
            </div>
          )}
          {timeline.map(({ url, post }) => (
            <div key={url} className="image">
              <a href={post}>
                <img src={url} />
              </a>
            </div>
          ))}
        </div>
      </main>
      <style jsx>{`
        main {
          @apply flex flex-col;
        }

        .info {
          @apply p-4 text-xl;
        }

        .info a {
          @apply underline text-black;
        }

        .info a:hover {
          @apply no-underline;
        }

        .content {
          @apply flex flex-col overflow-auto;
        }

        img {
          @apply w-full;
        }

        .image a {
          @apply box-border h-full block border-solid border-transparent border-8;
        }

        .image a:hover {
          @apply border-black;
        }

        .fallback {
          @apply w-full text-3xl py-24 flex items-center justify-center;
        }

        @screen md {
          main {
            @apply h-screen;
          }

          .info {
            @apply text-3xl;
          }

          .image {
            @apply h-full;
          }

          img {
            @apply w-auto h-full;
          }

          .content {
            @apply flex-row flex-1;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      timeline: await getTimeline(),
    },
    revalidate: 600,
  };
}
