import React from 'react';
import '../scss/index.scss';

import Meta from '../components/meta';
import ExternalLink from '../components/link';
import donors from '../donors';

const Index = () => {
  return (
    <div className="container mt-4">
      <Meta />

      <div className="mt-2 mb-4">
        <img
          src="/static/avatar.png"
          className="avatar rounded-circle float-right"
        />
        <h2>nzws (ねじわさ)</h2>
        <div className="mt-2 text-muted">高校生, エンジニア見習いのアホ</div>
      </div>

      <div className="mb-4">
        <b>🙋‍ Profile</b>
        <ul>
          <li>
            Pronouns: <b>he/him</b>
          </li>
          <li>
            Location: <b>Nagoya, Japan</b>
          </li>
          <li>
            Favorite languages:
            <b className="ml-1">
              JavaScript (node, react, hyperapp, etc) and PHP
            </b>
          </li>
          <li>
            Owned devices:
            <b className="ml-1">
              HTC X2-HT, iPhone 6s, Macbook Air, Windows PC, Linux Server
            </b>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <b>🙍‍ Accounts</b>
        <ul className="accounts">
          <li>
            ActivityPub(Mastodon):
            <ExternalLink href="https://don.nzws.me/@nzws">
              nzws@don.nzws.me
            </ExternalLink>
          </li>
          <li>
            Twitter:
            <ExternalLink href="https://twitter.com/nzws_me">
              @nzws_me
            </ExternalLink>
          </li>
          <li>
            GitHub:
            <ExternalLink href="https://github.com/nzws">@nzws</ExternalLink>
          </li>
          <li>
            Keybase:
            <ExternalLink href="https://keybase.io/nzws">@nzws</ExternalLink>
          </li>
          <li>
            E-mail: <code>i@$&#123;location.hostname&#125;</code>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <b>💕 Donate</b>
        <ul>
          <li>
            Kyash: <a href="kyash://qr/u/3407272513115463336">nzws</a>
          </li>
          <li>PayPay: nzws</li>
          <li>
            <ExternalLink href="https://www.pixiv.net/fanbox/creator/28848886">
              pixiv FANBOX
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href="http://amzn.asia/cjmzTWf">
              ほしいも
            </ExternalLink>
          </li>
          <li>
            Stellar🌠:
            <b className="ml-1">nzws*keybase.io</b>
            <small className="ml-1 text-muted">
              (GC74VR4V3QAYYRYLVS2444HSHDUMDGORMC6KQBWQNS5E5NDAGUQL2HPM)
            </small>
          </li>
          <li>
            Bitcoin:
            <b className="ml-1">1P2xtPpz2gKcS3WkVBxumsaNWmk9oWC74t</b>
          </li>
        </ul>
      </div>

      <div className="mb-4">
        <b>🙇 Thank you for supporting</b>
        <ul>
          {donors.map((name, key) => (
            <li key={key}>{name} さん</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;
