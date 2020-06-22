---
title: 'nzws.meをTypeScriptに移行しました'
date: '2020-06-22'
category:
  - 作ったもの
tags:
  - 雑記
  - TypeScript
  - React
  - NextJS
scripts:
  - don-nzws-me
---

![](https://i.imgur.com/WI9Fgvw.png)

<div style="text-align: center;font-size: 1rem">

_たのしい　たのしい　型の世界の始まりだよ　たのしいね_

</div>

## TypeScript に移行

しました。基本的に 2017 年からずっと JavaScript 触るマンでほとんど TS には触ったことなかったのですが、流石に TS には慣れておかないとまずいなーと思い実験台代わりに移行しました。  
やはりドキュメントを長々と読むよりも手を動かした方が分かりやすいので今あるウェブサイトとかを ts に移行するのはいい勉強になると思います。**strict にしなければ**そこまで負担もかからないし。(ただ strict にしないと js とあんま変わらん印象)

ちなみに nzws.me のリポジトリはこちらです: https://github.com/nzws/nzws.me

## TypeScript ってなに

> TypeScript はマイクロソフトによって開発され、メンテナンスされているフリーでオープンソースのプログラミング言語である。TypeScript は JavaScript に対して、省略も可能な静的型付けとクラスベースオブジェクト指向を加えた厳密なスーパーセットとなっている。C#のリードアーキテクトであり、Delphi と Turbo Pascal の開発者でもあるアンダース・ヘルスバーグが TypeScript の開発に関わっている[3][4][5][6]。TypeScript はクライアントサイド、あるいはサーバサイド (Node.js) で実行される JavaScript アプリケーションの開発に利用できる。  
> https://ja.wikipedia.org/wiki/TypeScript より引用

## やったこと

nextjs は標準で ts をサポートしているので( https://nextjs.org/docs/basic-features/typescript )、ディレクトリのルートに **空の** `tsconfig.json` を作成して `yarn dev` するとステップが進み、その指示通りに従えば簡単に始める事ができます。  
あとは頑張って React Component のファイルを `.tsx` に、その他を `.ts` に書き換えてエラーが出た箇所を書き足していけばなんとかなります。

**問題なのが、** tsconfig.json を自分で書き換えた場合、必ず一度マシン上でビルドしてみて tsconfig が書き換わらないことを確認してください。nextjs は nextjs でサポートしていない tsconfig を検出するとしれっとデフォルトの設定に書き換えるようで、3 時間くらい CI で Prettier がコケてわからんわからん言ってたらこんな事に気が付きました。勝手に書き換えるよりもエラーでコケてほしかった...

<iframe src="https://don.nzws.me/@nzws/104382325741083702/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="100%" allowfullscreen="allowfullscreen"></iframe>

![](https://i.imgur.com/sy9ud8z.png)

## (現時点で)まだよくわかってないこと

- interface と type の使い分け - なんか interface の方が上位互換みがあるけど逆に type を使わないといけないときはある？またどっちでもいいときはどっち使うといいみたいなのはある？
- styled-components での ts の扱い方 - props がめちゃくちゃエラー出まくって strict できない...
- nextjs の\_document の戻り値 - 他ページの initialProps の値の予測なんてできるのかよくわからなくてとりあえず `Promise<any>` してしまっている ( https://github.com/nzws/nzws.me/blob/f24cb7a0de90459de7427547e9f93d485ea1dcc6/pages/_document.tsx#L14 )
- 型はどこに書くべき？ - 例えばちょっとした物や React の Props なら同じファイル内の直前に書けばいいんだろうけど、いくつものファイルで使う型をどこにしまうべきなのかよくわからない ( https://github.com/nzws/nzws.me/blob/f24cb7a0de90459de7427547e9f93d485ea1dcc6/types/post.ts )

有識者兄貴がいれば https://don.nzws.me/@nzws or https://twitter.com/nzws_me まで教えてください
