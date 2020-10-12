import * as React from "react";

type TImage = {
  url: string;
  post: string;
};

export const Image = ({ url, post }: TImage) => {
  return (
    <>
      <div>
        <a href={post}>
          <img src={url} />
        </a>
      </div>
      <style jsx>{`
        img {
          @apply w-full;
        }

        div a {
          @apply box-border h-full block border-solid border-transparent border-8;
        }

        div a:hover {
          @apply border-black;
        }

        @screen md {
          img {
            @apply w-auto h-full;
          }

          div {
            @apply h-full;
          }
        }
      `}</style>
    </>
  );
};
