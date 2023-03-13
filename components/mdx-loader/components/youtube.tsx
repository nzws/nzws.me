type Props = {
  youtubeId: string;
  skip?: number;
};

export function YouTube({ youtubeId, skip }: Props) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${youtubeId}?start=${skip || 0}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{
        width: '100%',
        maxWidth: '100%',
        border: 'none',
        height: '500px'
      }}
    />
  );
}
