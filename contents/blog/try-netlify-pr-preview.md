---
title: Netlify の Deploy Preview を使ってみる
tags:
  - Netlify
  - SaaS
  - GitHub
date: 2019-07-30 08:46:48
url: try-netlify-pr-preview
---

[前回の記事](/2019/07/hello-world/)で書き忘れましたが、ホスティングには [Netlify](https://netlify.com) を使用しています。
その Netlify には、強力な GitHub 連携機能があります。例えば、

- GitHub にプッシュしたら自動でデプロイ
- デプロイ結果を通知
- **プルリクエストを受信したらプレビューをデプロイ (Deploy Preview)**

などなど、結構有能なのですが、今回はその中の **Deploy Preview** をこのサイトで有効化してみます。

# というのも

[このサイトは今朝オープンソースになったため](https://github.com/yuzulabo/blog)、例えば誤字を見つけたりしたら誰でも**プルリクエスト(変更依頼)**を送信できるようになっています。
そのため、Deploy Preview はあった方がいいかなと考えました。

# 有効化する

Netlify の管理画面からボタン押すだけなので簡単です。

1. **Settings > Build & deploy**に行き、
2. **Deploy notifications**で**GitHub pull request comment**を有効化し、

![](/static/files-blog-nzws-me/try-netlify-pr-preview/gs8bpjiryv7zh3dnitvn.png)

1. **Deploy Preview succeeded**を選択して保存するだけ

![](/static/files-blog-nzws-me/try-netlify-pr-preview/psknwkxdyic3jpwticr5.png)

あとは気長に PR が来るのを待つだけです。

# PR を送ってみる

と言ってもそんなすぐに来るわけがないので、自分で適当に送信してみます。
実際に送った PR が[こちら](https://github.com/yuzulabo/blog/pull/5)です。

![](/static/files-blog-nzws-me/try-netlify-pr-preview/ji0zuzh5gmhs5jcxd4zq.png)

こんな感じに、PR を送信するだけで Netlify Bot から URL を含むコメントが勝手に送られてきます。超簡単。

[Deploy Preview のリンク](https://deploy-preview-5--nzws-blog.netlify.com/) を開くと、PR で送った通りのウェブサイトになっています。

# まとめ

Netlify をすこれよ 😋
