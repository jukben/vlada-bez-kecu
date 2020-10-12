import * as React from "react";
import { Info } from "../components/info";

type TContent = { children: React.ReactChild };

export const Content = (props: TContent) => {
  return (
    <>
      <main>
        <Info />
        <div>{props.children}</div>
      </main>
      <style jsx>{`
        main {
          @apply flex flex-col;
        }

        div {
          @apply flex flex-col overflow-auto;
        }

        @screen md {
          div {
            @apply flex-row flex-1;
          }

          main {
            @apply h-screen;
          }
        }
      `}</style>
    </>
  );
};
