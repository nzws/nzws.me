---
title: Google Analytics を Hexo + InstantClick 環境に入れる
date: 2019-07-30 10:22:41
tags:
  - Google Analytics
  - Hexo
  - InstantClick
  - JavaScript
---

このサイトに Google Analytics を入れました。

# Google Analytics ってなんぞや

> Google Analytics は、Google が無料で提供する Web ページのアクセス解析サービス。 元々は Google が 2005 年に買収した、米国の Web 解析ソリューションプロバイダー・Urchin 社の技術を利用している。
> https://ja.wikipedia.org/wiki/Google_Analytics より引用

# 入れ方

元々 Hexo のテーマに Google Analytics のコードが埋め込まれていて、config にトラッキングコードを入力すれば有効化できるものがあります。このテーマもそうだったのでサクッと有効化する事ができました。

## InstantClick の問題点

InstantClick によるページ移動では、通常の onload イベントなどは発火せず、独自のイベントで動かす必要があります。

`InstantClick googleアナリティクス` とかでぐぐると、以前の **analytics.js タグ** による設定方法は結構ありますが、新しい **gtag.js タグ** は見つかりません。
諦めて古いやつを使ってもいいのですが、謎に熱意が湧いたので自作しました。

## 解決策

まあというか公式ドキュメントで、[SPA で gtag.js を使用するみたいな記事](https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications?hl=ja)見たら解決しました。

要するに、

```javascript
gtag('config', '<GA_MEASUREMENT_ID>');
```

を動かすとトラッキングデータが飛んでいくので、これを InstantClick のページ移動イベントに入れてしまえば完成です。
`send` とかではなく `config` なので、単純に config セットしてるだけなのかなって思ったら違ったのでちょっと悩みました。

**ただし、** さっきの記事にも書いてある通り、ページ URL を必ず指定してあげないとトップページが読み込まれたとしか判定されませんのでご注意ください。

```javascript
InstantClick.on('change', () =>
  gtag('config', '{{ theme.analytics.google }}', {
    page_path: location.pathname + location.search
  })
);
```
