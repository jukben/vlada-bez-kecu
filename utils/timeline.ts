import util from "util";
import fs from "fs";
import ColorThief from "colorthief";
import path from "path";

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
      mode: "cors",
    }
  );

  const instagram = (await response.json()) as Instagram;

  const timeline = instagram.graphql.user.edge_owner_to_timeline_media.edges;

  return timeline;
};

const isYellow = ([r, g, b]: [number, number, number]) => {
  return r > 240 && r < 255 && g > 230 && g < 255 && b > 0 && b < 10;
};

// promisify
const mkdir = util.promisify(require("fs").mkdir);
const streamPipeline = util.promisify(require("stream").pipeline);

export const getTimeline = async () => {
  const images = await getInstagramTimeline();

  // ensure we have timeline folder
  mkdir("./public/timeline/", { recursive: true });

  const timeline = await Promise.all(
    images.map(async (edge) => {
      const resource = edge.node.display_url;
      const id = edge.node.shortcode;
      const post = `https://www.instagram.com/p/${id}/`;
      const url = `/timeline/${id}.jpg`;
      const publicPathUrl = path.join("./public", url);

      const response = await fetch(resource);

      if (!response.ok) {
        throw new Error(`unexpected response ${response.statusText}`);
      }

      await streamPipeline(response.body, fs.createWriteStream(publicPathUrl));

      const colors = await ColorThief.getPalette(publicPathUrl, 2);

      return {
        post,
        url: url,
        isYellow: isYellow(colors[0]),
      };
    })
  );

  return timeline.filter((media) => media.isYellow);
};
