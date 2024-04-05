type Props = {
  url: string;
};

export function MastodonEmbed({ url }: Props) {
  return (
    <iframe
      src={`${url}/embed`}
      className="mastodon-embed"
      style={{
        width: "800px",
        maxWidth: "100%",
        border: "none",
      }}
      allowFullScreen
    />
  );
}
