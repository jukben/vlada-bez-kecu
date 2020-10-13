import util from "util";
import fs from "fs";
import ColorThief from "colorthief";
import path from "path";
import fetch, { Response } from "node-fetch";

const CHOCO_AFRO = "choco_afro";

type Instagram = {
  graphql: {
    user: {
      edge_owner_to_timeline_media: {
        edges: Array<{
          node: {
            accessibility_caption: string;
            display_url: string;
            shortcode: string;
          };
        }>;
      };
    };
  };
};

const getInstagramTimeline = async () => {
  // well, sorry, Instagram, I'm not trying to cheat!
  const response = await fetch(
    `https://www.instagram.com/${CHOCO_AFRO}/?__a=1`,
    {
      headers: {
        "Content-Language": "en-US",
        "Accept-Language": "en-US",
        cookie: process.env.INSTAGRAM_COOKIE,
      },
    }
  );

  const instagram = (await response.json()) as Instagram;

  const timeline = instagram.graphql.user.edge_owner_to_timeline_media.edges;

  return timeline;
};

const isYellow = ([r, g, b]: [number, number, number]) => {
  return r > 240 && r < 255 && g > 230 && g < 255 && b > 0 && b < 10;
};

const streamPipeline = util.promisify(require("stream").pipeline);

export const getTimeline = async () => {
  const images = await getInstagramTimeline();

  console.log("getting files...");

  const timeline = await Promise.all(
    images.map(async (edge) => {
      const resource = edge.node.display_url;
      const id = edge.node.shortcode;
      const post = `https://www.instagram.com/p/${id}/`;

      let response: Response;
      try {
        response = await fetch(resource);
      } catch (e) {
        console.error(`...can't fetch the file (${id}`, e);
      }

      const buffer = await response.buffer();
      const url = `data:image/jpg;base64,` + buffer.toString("base64");

      if (!response.ok) {
        throw new Error(`unexpected response ${response.statusText}`);
      }

      const [main] = await ColorThief.getPalette(url, 2);
      const yellow = isYellow(main);

      console.log(`...file (${id}) saved and isYellow = ${yellow}`);

      return {
        post,
        url,
        yellow,
      };
    })
  );

  console.log("...done");

  return timeline.filter((media) => media.yellow);
};
