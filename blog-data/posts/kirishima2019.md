---
title: kirishima2019 (2019年アドベントカレンダー)
tags:
  - アドベントカレンダー
date: '2019-12-03 04:35:00'
url: kirishima2019
---

> これは [アスタルテ　アドベントカレンダー 2019](https://adventar.org/calendars/3971) 3 日目の記事です。

去年(2018 年)のアドベントカレンダーの記事は [こちら](https://kirishima2018.nzws.me/)

# 私について

[ねじわさ](https://don.nzws.me/@nzws) です。去年の時点では [knzk.me というユーザー 3000 人強いたインスタンス](https://fediverse.network/knzk.me) の鯖缶やってました。  
現在は閉鎖しちゃったので身内鯖開いて基本そこに籠もってたりします。

趣味としてはほぼほぼプログラミングしかやってないんですが、最近は React とか色々触ってます。というか今これ書いてる時に去年の記事読んだんですけど去年の時点では全く書けなかったので成長したなぁ...って思います。

霧島鯖はたまにタイムラインみてます。

# アスタルテにコントリビュートした

プログラミング系やったことない人にとってはコントリビュートってなんぞやって話ですが、
アスタルテ自体は "[本家 Mastodon](https://github.com/tootsuite/mastodon)" を "[改造して大きな機能を加えられた glitch-soc](https://github.com/glitch-soc/mastodon)" を "[きりひなによる改造](https://github.com/kirishima21/mastodon)" という手順を踏まれて作られています。
なかなかカオスです。  
そして、それぞれ動かすために必要なソースコードを閲覧でき、なにか不満や提案があったりすると、変更を加えたソースコードをプルリクエストという機能を用いて送信できます。管理者が承認すると実際に内部に取り込まれます。
今回は最後の [きりひな](https://github.com/kirishima21/mastodon) の所にプルリクエストを送信しています。

というわけで前置きが長くなりましたがコントリビュートしたものを振り返っていきます。今年やったものが対象です。

## 大きな変更

#### [Split and refactor kirishima-music by nzws · Pull Request #28 · Kirishima21/mastodon](https://github.com/Kirishima21/mastodon/pull/28)

Kirishima Music (左下にあるプレイヤー) を書き直しました。ちなみに [去年のアドベントカレンダーの記事](https://kirishima2018.nzws.me/) は一つ前の Music を書いたことについて触れています。今は React バリバリに書いてます。

外から見るとほぼほぼ変わったように見えないのですが、コードを完全に切り離していい感じになったんです！！！なったんです！！！(圧)

#### [Add Local-Toot/Secondary Button by nzws · Pull Request #33 · Kirishima21/mastodon](https://github.com/Kirishima21/mastodon/pull/33)

トゥート、セカンダリボタンの横にそれぞれのローカル版の投稿ボタンを表示・またそれを設定で切り替えできる改造です。  
Redux は全く分かんなかったのでローカルに切り替えるのを投稿ボタンまで穴を開けに行くのが中々大変でした。まあでもそれだけなんとかすれば割とサクサク書けました。  
ただ、思ったよりも変更行数が多く、今後のアプデで負担にならないかちょっと心配だったりします。

## 細かい修正など

- [Remove original_content by nzws · Pull Request #27 · Kirishima21/mastodon](https://github.com/Kirishima21/mastodon/pull/27): アプデされた際のミス修正です
- [merge components by nzws · Pull Request #30 · Kirishima21/mastodon](https://github.com/Kirishima21/mastodon/pull/30): アプデの負担を減らすため独自改造部分でダブってた所を一つにしました
- [Do not generate source-maps & bundle-analyzer in Production by nzws · Pull Request #31 · Kirishima21/mastodon](https://github.com/Kirishima21/mastodon/pull/31): アプデの負担を減らすためビルドの改善をしました
- [Fix some problems in mobile view / refactor style by nzws · Pull Request #34 · Kirishima21/mastodon](https://github.com/Kirishima21/mastodon/pull/34): モバイル版の表示がぶっ壊れる問題を修正したりしました

# さいごに

なんか毎年アドベントカレンダーの話題になって、一年一瞬だったな...とちょっと寂しい気持ちになってたりします。まあでも来年も頑張っていきたいです。

あとですね、私毎回 12/3 にアドベントカレンダー書いてるんすよ、それはなぜかって？？？

**誕生日です！！！** 17 歳になりました！これを見てくれた人は [@nzws@don.nzws.me](https://don.nzws.me/@nzws) におめでとうとかメンションしてください！！よろしくお願いします！！

> プレゼント BOX は [こちらです！！！！！！！！！！！！](http://amzn.asia/cjmzTWf)
