import * as React from "react";

export const Fallback = () => {
  return (
    <>
      <div>
        <span>Žádná aktualita!</span>
      </div>
      <style jsx>{`
        div {
          @apply w-full text-3xl py-24 flex items-center justify-center;
        }
      `}</style>
    </>
  );
};
