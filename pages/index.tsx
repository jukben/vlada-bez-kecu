import * as React from "react";
import { Content } from "../components/content";
import { Fallback } from "../components/fallback";
import { Header } from "../components/header";
import { Image } from "../components/image";
import { getTimeline } from "../data/timeline";

type TFeed = {
  timeline: Array<{ url: string; post: string }>;
};

export default function Feed(props: TFeed) {
  const timeline = props.timeline;

  return (
    <>
      <Header />
      <Content>
        <>
          {timeline.length ? (
            timeline.map(({ url, post }) => (
              <Image key={url} post={post} url={url} />
            ))
          ) : (
            <Fallback />
          )}
        </>
      </Content>
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
