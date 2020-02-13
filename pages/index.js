import React, { useState, useEffect } from 'react';
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

const Note = styled.div({
  marginBottom: '10px'
});

const Index = () => {
  const [email, setEmail] = useState('');
  useEffect(() => {
    setEmail(['hi', location.hostname].join('@'));
  }, []);

  return (
    <Container>
      <Intro>
        <Avatar src="/static/avatar.png" />
        <h1>nzws / ねじわさ</h1>
        High-school student, learning programming
      </Intro>

      <LinksBlock title="Profile 🙋">
        <ul>
          <li>
            Pronouns: <b>he/him</b>
          </li>
          <li>
            Location: <b>Nagoya, Japan</b>
          </li>
          <li>
            Languages: <b>ja(native), JS, PHP</b>
          </li>
        </ul>
      </LinksBlock>

      <LinksBlock title="Accounts 🙍">
        <ul>
          <li>
            ActivityPub(Mastodon):{' '}
            <ExternalLink href="https://don.nzws.me/@nzws" rel="me">
              nzws@don.nzws.me
            </ExternalLink>
          </li>
          <li>
            Twitter:{' '}
            <ExternalLink href="https://twitter.com/nzws_me" rel="me">
              @nzws_me
            </ExternalLink>
          </li>
          <li>
            GitHub:{' '}
            <ExternalLink href="https://github.com/nzws" rel="me">
              @nzws
            </ExternalLink>
          </li>
          <li>
            Keybase:{' '}
            <ExternalLink href="https://keybase.io/nzws" rel="me">
              @nzws
            </ExternalLink>
          </li>
          <li>
            E-mail:{' '}
            <ExternalLink href={email ? `mailto:${email}` : ''}>
              {email}
            </ExternalLink>
          </li>
        </ul>
      </LinksBlock>

      <LinksBlock title="Donate 💕">
        <ul>
          <li>
            Kyash: <a href="kyash://qr/u/3407272513115463336">nzws</a>
          </li>
          <li>
            <ExternalLink href="https://github.com/sponsors/nzws">
              GitHub Sponsors
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="http://amzn.asia/cjmzTWf">
              ほしいも
            </ExternalLink>
          </li>
        </ul>
      </LinksBlock>

      <LinksBlock title="Thank you for supporting 🙇">
        <Note>
          <small>
            If you have any questions about this list, please contact me.
          </small>
          <br />
          <small>
            もしあなたのお名前が追加されていなかったり、その他要望がございましたら、お手数おかけしますが問い合わせください。
          </small>
        </Note>

        <ul>
          {donors.map(name => (
            <li key={name}>
              <b>{name}</b>
              さん
            </li>
          ))}
        </ul>
      </LinksBlock>
    </Container>
  );
};

export default Index;
