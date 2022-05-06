import { FC, ReactNode } from 'react';

type Props = {
  href: string;
  rel?: string;
  children: ReactNode;
};

const ExternalLink: FC<Props> = props => {
  const { href, children, rel, ...prop } = props;

  const Rel = ['noopener', 'noreferrer', ...(rel || '').split(' ')].join(' ');

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a target="_blank" rel={Rel} href={href} {...prop}>
      {children}
    </a>
  );
};

export default ExternalLink;
