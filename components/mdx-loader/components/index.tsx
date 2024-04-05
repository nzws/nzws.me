import { MDXRemoteProps } from "next-mdx-remote/rsc";

import { Image } from "~/components/image";

import { ImageWithNote } from "./image-with-note";
import { Link } from "./link";
import { MastodonEmbed } from "./mastodon-embed";
import { YouTube } from "./youtube";

export const mdxComponents: MDXRemoteProps["components"] = {
  // @ts-expect-error: React image
  img: Image,
  a: Link,
  ImageWithNote,
  MastodonEmbed,
  YouTube,
};
