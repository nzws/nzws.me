---
title: パスワードマネージャを乗り換えようとして色々使ってみた話
tags:
  - 雑記
date: '2019-10-26 09:02:00'
url: password-manager
---

どうもねじわさです。最近急に寒くなりましたね。

さて突然ですが私は変な所でセキュリティオタクなので、認証情報は結構ガッチガチにやるのが好きな人です。「パスワード使いまわしてる ZE」とか言ってる人がいたら白い目で見るタイプです。  
まあでもパスワードの羅列を数十個死ぬまで覚えられる人なんていないでしょう。そこでパスワードマネージャとかいうのがこの資本主義の時代にはいくつもあります。やったね。

# パスワードマネージャってなんだよ

パスワードを管理するサービスです。パスワードマネージャ自体のパスワードだけ覚えておくなり、生体認証なりでそれ自体を解錠するとログインしたいサービスの認証情報を教えてくれる便利なサービスです。  
大きく分けて開発会社がクラウドサービスとしてホスティングしているものと、単純に PC 上でオフラインで動くソフトがあります。  
最近はスマホなんていう 100 年後に 2000 年代に流行った伝説の石版とか名前つけられて展示されそうな文明の利器があり、1 人が複数の端末を持つのでクラウドで動いているパスワードマネージャが主流だと思います。

まあそんなサービスですが、もちろん一社が独占的に作っているわけではなく、多種多様な会社がサービスを展開しています。

# 今まで使っていたやつ

![image](/static/files-blog-nzws-me/password-manager/pecqtfseu08.png)

[Google Smart Lock](https://passwords.google.com) という、天下の Google 様が **無料** で提供しているパスワードマネージャです。Chrome を使っていて、`このパスワードを保存しますか？` 的なダイアログ出てきてパスワード保存してる人はこれ使ってます。  
この Google のパスワードマネージャは単純にめちゃくちゃシンプルなので、あまり詳しい操作をしたくないって人で Google 信者って人にはとてもおすすめできます。ただ、Google 製品にしか対応してないので、Android はまだしも、iOS はほぼほぼ使い物になりません。  
また、さっき言ったように本当にシンプルで設定が一切ないし、最近は改善されたものの、前は一覧の検索とかなかったです。勝手にどんどん保存されていくので、めちゃくちゃ埋もれて辛いことになりました。

# 使ってみたもの

## [1Password](https://1password.com/)

![image](/static/files-blog-nzws-me/password-manager/t8rqkffqfoo.png)

多分有料のパスワードマネージャだったらド定番のやつです。PC, スマホ, ブラウザのクライアントがそれぞれあります。私が比較しているものの中で一番高いですが、一番 UI がカッコよくて一番使い勝手が良いです。  
シンプルながら機能は充実していると思います。

特に便利だと思ったのが、スマホ版で ID、パスワード入力からの自動で 2 ファクタ認証のワンタイムパスワードをくれる機能です。<small>それはもう 2 ファクタじゃないんじゃねってちょっと突っ込みたいんですが黙っときます</small>

また、WatchTower (公式翻訳は監視塔らしい、日本語訳ダサくね？) というタブで、脆弱なパスワード、漏洩されたパスワードなど、不安な点を全てリストアップしてくれます。これも便利です。

![image](/static/files-blog-nzws-me/password-manager/aclrafrdhq.png)

(パスワードそのまま抽出してきたので重複がめちゃくちゃ多い)

## [Bitwarden](https://bitwarden.com/)

![image](/static/files-blog-nzws-me/password-manager/8engtb58k0g.png)

このサービスの特徴として、全て**オープンソース**です。ソフトやアプリは公式から提供されますが、ログイン画面でサーバアドレスを変更できるため、それがサーバのクライアントとして機能します。  
UI は一世代前みたいな感じでまぁ...という感じです。というか Web クライアントよりも PC, スマホ, ブラウザのクライアントの方がまだ見やすい印象があります。

![image](/static/files-blog-nzws-me/password-manager/708fsqleju.png)

Bitwarden はオープンソースなので、互換性のあるサーバも作られています。正直本家は C#と SQL Server とかいう今まで一切使ったことない構成でびびったので [bitwarden_rs](https://github.com/dani-garcia/bitwarden_rs) という Rust 製の互換サーバ使ってます。こっちは MySQL で動作するしサクッと動かせます。

# (今の所) キミにきめた

とりあえずは自分でホストした Bitwarden を使ってみています。ただ使い勝手はよく使ってみないと分からないので、もしかしたら 1Password 行くかなーとか色々悩んでいる感じです。
