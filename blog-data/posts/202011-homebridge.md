---
title: 'うちのスマートホームをHomebridgeに移行した話'
category:
  - 雑記
tags:
  - スマートホーム
  - IoT
  - 家
date: '2020-11-29'
scripts:
  - don-nzws-me
---

みなさん、家の自動化はしてますか？どうもねじわさです。  
今回はスマートホームのあれこれを Homebridge に移行したレポです。

## why スマートホーム

- ロマンあるじゃん！！！
- (知らないけど)防犯対策になりそう...？
- (しっかり使いやすさを極めれば)実用的
  - 例えばベッドに寝たまま電気消せるのは作って一番良かったです。
  - 玄関や屋外でスマホから一発で色々な端末が操作できるし、何なら外出を検出して自動操作もできます。
  - 何個もアプリを横断してるような感じだと多分面倒になって手の方が早いじゃんってなってしまうので使いやすさはとても大事。

## 今まで行っていたスマートホーム

ハードについてはマジで全く分からん人なので複数の会社のスマートホーム機器を横断して使っています。現在使用しているのはこの 2 つです:

- リモコン操作: Nature Remo
- コンセント操作: TPLink スマートプラグ

この 2 つは本当に使いやすいし柔軟性がありおすすめできます。

システムについては各機器の API を使用した上で全て自作していました。[nzws/room-console](https://github.com/nzws/room-console)

![](https://i.imgur.com/vcBPmt4.png)

基本的な操作はブラウザから行います。スマホからのアクセスが毎回ブラウザを開かないといけなかったので PWA にしてもよかったな、とは思いました。  
また、Webhook API を設けて、IFTTT 経由で Google アシスタントと連携させることで、例えば「全ての機器を消す」といった大まかな操作をできるようにも作りました。  
あともう一つ自動操作として Discord インテグレーションを内部で設けていました。
これは Discord の現在のステータスを検出して今 PC を使用しているかどうか確認し、退席中であれば自動で電気を暗くする、みたいな設定にしていて、これはとても便利でした。

ブラウザを開かないといけない点と若干調子が悪くなる点があったのですが、概ね満足してました。

## 今回やったこと

今回、ハードは変えずにシステムの部分を自作のものから Homebridge に移行しました。
理由としては、

- 新しく Android 11 のスマホを買って電源メニューのあれを試したかった
- コア部分はいじらなくてよくなるので管理が楽になる
- Google Home や Apple Homekit と連携ができる、それぞれの公式アプリから直接操れるのでブラウザをわざわざ開かなくてよくなるしかっこいい
- AI アシスタントからもネイティブに操作できる
  - IFTTT ではやりたい事ごとにワードを設定する必要があったが、なんか適当に発言すればよしなにやってくれる
- Homebridge にはプラグインがあり、ある程度柔軟に使える
  - コア部分を完全に Homebridge に任せ、細かいやりたい事をプラグインとして自作すればなんでもできる
- 新しいハードを買ってもある程度簡単にカバーできる

という点から使ってみたくなり移行しました。

## その前に: Homebridge ちょっと説明

[Homebridge](https://github.com/homebridge/homebridge)は Apple Homekit に対応していないスマートホームを無理やりコミュニティで対応させようぜ！的なプロジェクトです（多分）。  
Homebridge 自体は Homekit と連携するためのパイプで、基本的に自分の持っているハードをコミュニティが作成したプラグインを入れまくってどんどん自分の Homebridge を大きくしていく感じです。
Homebridge 自体は Apple のスマートホームのエコシステム「Homekit」に対応するためのものですが、Google の Smart Home platform と API の設計が似ているため、
[Homebridge-gsh](https://github.com/oznu/homebridge-gsh)というプラグインで Google Home 上でも動かせるようになります。要するに Homebridge 最強。（ちなみに Alexa も対応できるらしいです、草）

## 使ったプラグインと作ったプラグイン

使わせて頂いたもの:

- [homebridge-config-ui-x](https://github.com/oznu/homebridge-config-ui-x): Homebridge を GUI で管理するプラグインです。簡易的な機器操作もできます。公式でもインストール推奨されるので基本的に全員入れると思います。
- [homebridge-gsh](https://github.com/oznu/homebridge-gsh): Google Smart Home platform と連携するプラグインです。
- [homebridge-tplink-smarthome](https://github.com/plasticrake/homebridge-tplink-smarthome): TPLink スマートプラグを操作するプラグインです。ローカルで通信されます。
  - ローカルで動くと何がいいかというと、とにかく応答速度が早いし、鯖落ちの影響を受けません。

作ったもの:

- @nzws/homebridge-nature-aircon: Nature Remo で動かすエアコン操作プラグインです。既存のプラグインもありましたが少し使い勝手が微妙だったため自作しました。
- @nzws/homebridge-mlru1-light: 照明操作プラグインです。自分の照明がしょぼすぎて 1 ボタンだったりするので状態記憶など色々無理やりするやつです。

## 使い勝手とか

- 毎日が楽しくなれます
- [前回の記事に書いた](https://nzws.me/blog/202011-pixel4a) Android 11 の電源メニューもとても使いやすいです。
- Homekit と Google Home 両対応でどの端末からも操作できるようになったのも嬉しいです。
- Google Home の在宅/外出モードが結構 IFTTT に比べて精度いいのでこれも使いやすいです。

## 欠点とか

これは Homebridge というより Homebridge-gsh と Google Smart Home platform の問題かもしれない（Homekit はローカルであるため感じない）のですが、Android からの情報読み込みが若干もたつきを感じました。  
まあでもサーバーでなんとかなるかもしれないのでいずれ改善したいです。

あとまあ何にも限らず今ある IoT 機器大体問題になってくる話なのですが、その会社のサーバーに依存している以上 **落ちたら何もできなくなりますし潰れても何もできなくなります。**  
定期的に思うのですが買い切りの端末でどうやって維持費と人件費回収してるんでしょう。  
ちょうどこの記事書いてるあたりで Nature Remo と所有はしてませんが SwitchBot のサーバーが落ちてみんな夜中に電気が消せなかったりしてました。
(これの根本的原因は AWS の大規模障害です。ちなみに AWS 内部でも該当リージョンを使用していたため、サービスステータスの更新ができなかったり色々大変だったらしいです)

で、これを防ぐためにどうするべきかと言うと外の API を経由せずにローカル通信もできるようにすべきです。
ちなみに Homekit はローカル通信を前提としていて、基本的に家の中にいれば常に操作できるのでこの設計はとても良いと思いました。
(HomePod や Apple TV、iPad など据え置き型端末がありそれらをハブとする事で初めてリモートで使えるようになります。)  
で、Nature Remo は実はローカル API が存在するため、同じネットワーク内にいる Homebridge なら直接ローカル API を触った方が応答も早くなるし良いと思いました。

## 最後に

うちの PC がピカピカ光るようになりました(ケースを [NZXT H510 Elite](https://nzxt.jp/products/detail/h510elite.html) に変えました)

<iframe src="https://don.nzws.me/@nzws/105286134348531178/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe>
