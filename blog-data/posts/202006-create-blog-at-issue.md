---
title: '「Blog@Issue: Issueからブログ記事を投稿」を作りました'
category:
  - 作ったもの
tags:
  - TypeScript
  - GitHub Actions
  - NodeJS
date: '2020-06-30'
---

[![](https://user-images.githubusercontent.com/14953122/86038914-a4b11080-ba7c-11ea-8eb2-0977c47e0787.gif)](https://imgur.com/pULRHll)

どうもこんにちは、 [ねじわさ](https://nzws.me) です。  
マークダウン式ブログで使用できる、GitHub Issue からブログ記事を簡単に編集/投稿できる Action「[Blog@Issue](https://github.com/nzws/blog-at-issue-action)」を開発しました。([ちなみにこの記事はこれを使ってます](https://github.com/nzws/nzws.me/issues/44))

## なにができるの？

- 特定ラベルの付けられた Issue をマークダウンファイルに書き起こし、プルリクエストを作成
- 必要に応じて、[Prettier](https://prettier.io/)や[TextLint](https://textlint.github.io/)といった Formatter/Linter を使用可能
- **Issue を作成する**ので、スマホなどからも作成可能
- マージするまでいくらでも編集可能（ドラフトのように使える）

5000 兆年ぶりに Action を作成しました。割と GitHub Action は toolkit が充実していてなおかつ ts なので書きやすくはあるのですが、試しに動かしてみるというのがとても不便です。適当なプライベートリポジトリを作ってガンガン回しまくってるのですがこれ以外に開発方法ないですかね...  
あと Octokit(GitHub API と通信するやつ)のレスポンスがどう返ってくるとかも中々分かりにくいです。今回 Action 開発では初めて TypeScript を使ってみたのですが、Octokit の型定義にめちゃくちゃ救われました。こういう時はめちゃくちゃ便利ですね。

躓いた点としては、まず action.yml で変数の構文を使わないようにしましょう。何故かあそこも解釈対象らしく、例示として description に `'Use ${{ secrets.GITHUB_TOKEN }}'` みたいな感じに書いていたら secrets は存在しないよエラーが出てきて、最初ワークフローの設定が悪いのかと数時間悩んでました。めっちゃ辛かったです。

次に Prettier や TextLint についてですが、これらは通常 CLI で使うことが多いと思いますが、一応 API が提供されていて例えば Prettier では次のように使用できます： ([参考](https://prettier.io/docs/en/api.html))

```javascript
import prettier from 'prettier';

const formatted = prettier.format('foo ( )');
console.log(formatted);
// foo();
```

なので、当初は API を通してフォーマットや Lint を行う予定でした。  
しかし、Action のプログラムは Web のように依存関係含め一つのファイルにまとめておきワークフローが読み込まれた時点ですぐに使える状態でないといけないため（多分？要調査）、Prettier や TextLint ではそれが考慮されておらず、**そもそもビルダーが固まったり**、なんとかビルドできても数十 MB になるなどあまり実用的ではなくここで躓いてるくらいなら `@actions/exec` を用いて CLI にアクセスした方が楽だろうと判断しました。  
また、特に TextLint では Lint ルールを npm パッケージとしてインストールするため、そこらへんの考慮も CLI であれば `yarn install` するだけでいいのでこっちの方が楽だったと思います。

3 つ目に Action からの git へのアクセスについてなのですが、これは単純に Author を `GitHub Actions <action@github.com>` にして push 時の認証は `git push "https://${process.env.GITHUB_ACTOR}:${token}@github.com/${repo}.git" ~~` とするだけで良かったです。 `GITHUB_ACTOR` は Issue の作成者で、アクセストークンは Action 用の一時トークンが `secrets.GITHUB_TOKEN` に流し込まれるのでそれを読んであげるだけでいいです。

> なお、git clone は無限に上手くいかなかったので素直に `actions/checkout` を使いましょう。

まあなんやかんや結構大変でしたが、思いついてから 3 日くらい？でひとまず動かせるようになったので良かったです。

## さいごに

今期のアニメがどんどん終わってゆく...😥
