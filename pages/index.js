import React from 'react';
import styled from 'styled-components';

import ExternalLink from '../components/link';
import donors from '../donors';
import { mobile } from '../components/media';
import LinksBlock from '../components/linksBlock';

const Container = styled.main({
  padding: '25px 15%',
  [mobile]: {
    padding: '15px'
  }
});

const Avatar = styled.img({
  float: 'right',
  borderRadius: '100%',
  width: '125px'
});

const Intro = styled.div({
  marginBottom: '20px'
});

const Index = () => {
  return (
    <Container>
      <Intro>
        <Avatar src="/static/avatar.png" />
        <h1>nzws / ねじわさ</h1>
        High-school student, learning programming
      </Intro>

      <LinksBlock title="Profile 🙋">
        <li>
          Pronouns: <b>he/him</b>
        </li>
        <li>
          Location: <b>Nagoya, Japan</b>
        </li>
        <li>
          Languages: <b>ja(native), JS, PHP</b>
        </li>
      </LinksBlock>

      <LinksBlock title="Accounts 🙍">
        <li>
          ActivityPub(Mastodon):
          <ExternalLink href="https://don.nzws.me/@nzws" rel="me">
            nzws@don.nzws.me
          </ExternalLink>
        </li>
        <li>
          Twitter:
          <ExternalLink href="https://twitter.com/nzws_me" rel="me">
            @nzws_me
          </ExternalLink>
        </li>
        <li>
          GitHub:
          <ExternalLink href="https://github.com/nzws" rel="me">
            @nzws
          </ExternalLink>
        </li>
        <li>
          Keybase:
          <ExternalLink href="https://keybase.io/nzws" rel="me">
            @nzws
          </ExternalLink>
        </li>
        <li>
          E-mail: <code>hello+me@$&#123;location.hostname&#125;</code>
        </li>
      </LinksBlock>

      <LinksBlock title="Donate 💕">
        <li>
          Kyash: <a href="kyash://qr/u/3407272513115463336">nzws</a>
        </li>
        <li>
          PayPay: <b>nzws</b>
        </li>
        <li>
          <ExternalLink href="https://github.com/sponsors/nzws">
            GitHub Sponsors
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.pixiv.net/fanbox/creator/28848886">
            pixiv FANBOX
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="http://amzn.asia/cjmzTWf">ほしいも</ExternalLink>
        </li>
      </LinksBlock>

      <LinksBlock title="Thank you for supporting 🙇">
        {donors.map(name => (
          <li key={name}>
            <b>{name}</b>
            さん
          </li>
        ))}
      </LinksBlock>
    </Container>
  );
};

export default Index;
