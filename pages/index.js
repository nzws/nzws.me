import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { User, MapPin, MessageSquare, Mail } from 'react-feather';
import {
  Mastodon,
  Twitter,
  Github,
  Keybase
} from '@icons-pack/react-simple-icons';
import media from 'styled-media-query';
import Link from 'next/link';
import List from '../components/home/list';
import Item from '../components/home/item';

const mobile = media.lessThan('medium');
const desktop = media.greaterThan('medium');

const Container = styled.div`
  ${desktop`
    height: 100vh;
    display: grid;
    grid-template-columns: 340px 1fr;
    grid-template-rows: 1fr;
  `};
`;

const Profile = styled.div`
  grid-column: 1;
  background: ${({ theme: { background } }) => lighten(0.15, background)};
  border-radius: 0 1em 1em 0;
  padding: 10px;

  ${mobile`
    border-radius: 0 0 1em 1em;
  `};
`;

const Image = styled.div`
  img {
    border-radius: 5px;
    width: 70px;
    margin-right: 10px;
  }

  div {
    display: inline-block;
    vertical-align: top;
  }

  h1 {
    margin: 2px 0;
  }
`;

const Contents = styled.div`
  grid-column: 2;
  padding: 20px;
`;

const Columns = styled.div`
  column-width: 300px;
  column-gap: 1rem;
`;

const Index = () => {
  const [email, setEmail] = useState('');
  useEffect(() => {
    setEmail(['hi', 'nzws.me'].join('@'));
  }, []);

  return (
    <Container>
      <Profile>
        <Image>
          <img src="/static/avatar.png" alt="nzws" />
          <div>
            <h1>ねじわさ</h1>
            @nzws
          </div>
        </Image>

        <p>React, Node.jsが好き / 学生</p>

        <List
          title="Profile"
          values={[
            ['Pronouns', 'he/him', User],
            ['Location', 'Nagoya, Japan', MapPin],
            ['Languages', 'ja-JP, JS and PHP', MessageSquare]
          ]}
        />

        <List
          title="Accounts"
          values={[
            [
              'Mastodon',
              'nzws@don.nzws.me',
              Mastodon,
              'https://don.nzws.me/@nzws'
            ],
            ['Twitter', '@nzws_me', Twitter, 'https://twitter.com/nzws_me'],
            ['GitHub', '@nzws', Github, 'https://github.com/nzws'],
            ['Keybase', '@nzws', Keybase, 'https://keybase.io/nzws'],
            ['E-mail', email, Mail, `mailto:${email}`]
          ]}
        />

        <List
          title="Donate"
          values={[
            [
              'GitHub Sponsors',
              '@nzws',
              null,
              'https://github.com/sponsors/nzws'
            ],
            ['Kyash', 'nzws', null, 'kyash://qr/u/3407272513115463336'],
            ['ほしいも', 'Link', null, 'http://amzn.asia/cjmzTWf']
          ]}
        />

        <Link href="/blogs/supporter">
          <a>
            <b>Supporters List</b>: Thank you for supporting 🙇
          </a>
        </Link>
      </Profile>
      <Contents>
        <Columns>
          <Item
            title="now-secrets"
            link="https://github.com/dotplants/now-secrets"
            tags={['Node.js', 'Vercel API']}
            description="Vercelのシークレットを.envファイルを元に自動更新するCLIです。"
            image="https://i.imgur.com/vBAkYuW.png"
          />

          <Item
            title="turtle-action"
            link="https://github.com/nzws/turtle-action"
            tags={['GitHub Actions', 'Node.js', 'Expo']}
            description="Turtle CLI (Expo)をGitHub Actionsで動作させるActionです。"
          />

          <Item
            title="sms-code-extension"
            link="https://github.com/nzws/sms-code-extension"
            tags={['JavaScript', 'Browser extension']}
            description="SMS で受信した確認コードを Pushbullet を経由してクリップボードに自動コピーします。"
            image="https://i.imgur.com/yBBokFm.png"
          />

          <Item
            title="auto-merge-bot"
            link="https://github.com/apps/auto-merge-bot"
            tags={['GitHub Bot', 'Node.js']}
            description="ラベルが貼られたPRを自動レビュー&マージするBotです。気が付いたら東京都公式コロナ対策サイトでの利用実績があったそう..."
          />

          <Item
            title="add-pkg"
            link="https://add-pkg.dotplants.net/"
            tags={['Node.js', 'CLI']}
            description="nodeのパッケージマネージャーを自動的に使い分けるCLIです。"
            image="https://i.imgur.com/zyhDxxP.png"
          />

          <Item
            title="@dotplants/cli"
            link="https://github.com/dotplants/cli"
            tags={['Node.js', 'CLI']}
            description="TypeScriptで書かれた軽量なCLIフレームワークです。"
          />

          <Item
            title="madocome"
            link="https://github.com/dotplants/madocome"
            tags={['JavaScript', 'React']}
            description="YouTube Live向けコメントビューワーです。"
          />

          <Item
            title="OpenStatus"
            link="https://github.com/nzws/OpenStatus"
            tags={['JavaScript', 'GAS', 'hyperapp']}
            description="OSSの死活監視/サービスステータス表示ツールです。（開発終了）"
            image="https://i.imgur.com/ALrZ9eu.png"
          />

          <Item
            title="KnzkApp"
            link="https://github.com/nzws/KnzkApp"
            tags={['JavaScript', 'Cordova', 'Onsen UI']}
            description="SNSのサードパーティークライアントです。（開発終了）"
          />

          <Item
            title="KnzkLive"
            link="https://github.com/nzws/KnzkLive"
            tags={['Node.js', 'PHP', 'Bootstrap']}
            description="OSSの生放送ウェブサービスです。（開発終了）"
            image="https://user-images.githubusercontent.com/38746192/54084345-d1668380-4372-11e9-96b9-42361b974953.gif"
          />
        </Columns>
      </Contents>
    </Container>
  );
};

export default Index;
