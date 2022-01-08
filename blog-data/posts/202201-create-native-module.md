---
title: 'nodejsでネイティブモジュールを作りたい'
category:
  - 雑記
tags:
  - nodejs
  - C++
date: '2022-01-09'
scripts:
  - don-nzws-me
---

どうもこんにちは、そろそろ冬休みが終わり辛くなっている [ねじわさ](https://don.nzws.me/@nzws) です。ちなみに冬休みの後半はほとんどこれで潰しました。(本当は原神もしてた)

## 発端

<iframe src="https://don.nzws.me/@nzws/107463194198541192/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe>

自分のせいです。

で、どうやって作ろうかなと考えていたのですが、結構前に[絵文字ジェネレーター](https://emoji-gen.ninja/)というサイトを見ていて、サイトのソースだけでなく汎用的に使用できる C++ライブラリや、Python のラッパーが公開されていたのでこちらをお借りする事にしました。ただ、C++や Python はどちらもそんなに触ったことが無く、やっぱり nodejs で作りたいなという気持ちと、どうせならネイティブモジュール開発的な事(ただのラッパーだけど)を一度体験してみたかったので、C++ライブラリと nodejs を繋げるラッパーを作ってみました。

## 作った

[https://github.com/nzws/libemoji.js](https://github.com/nzws/libemoji.js)

npm から `@nzws/libemoji.js` を突っ込めば使えるようにしています。ただ多分今の所 Linux x64 でのみ動きます。

C++や TypeScript のコードはバリデーションとライブラリに引数渡すぐらいしかしていないのでとても適当なものですが、作業時間の 8 割は C++ライブラリのビルド、CI の整備、npm publish の整備などに食われました。

## 困ったこととか

### ビルドができない

C++知らなすぎてまず親ライブラリのビルドに困っていました。多分ほとんど Google のライブラリである skia のビルド中に依存関係に困っていたっぽいですが、エラー出まくりで一つ一つ検索しながら進めていました。

ただ最終的に skia のリポジトリ内に `./tools/install_dependencies.sh` という依存関係の一括インストールスクリプトがあることを知ったので、それをビルド前に突っ込むようにしました。依存先のライブラリの docs を読むのも大事でした。

なんか今も結局ビルド進めるとエラーは出るのですが、必要なファイルは生成されているっぽくその後のビルドプロセスと node の起動がすごいピンピンしていて問題ないのでとりあえず放置しています（C++よくわからん）

### skia のビルドに Python v2.x を求められる

Python もよく知らないですが v2 って deprecated じゃないんですか...？よくわからないけど怖いのでバージョンマネージャーの[asdf](https://github.com/asdf-vm/asdf)を使ってライブラリのビルドだけ python を使うように.tool-versions ファイルを設置しました。

### ビルドが遅い

ライブラリのビルドに GitHub Actions のマシンを使用すると 30 分以上かかってしまい、まともに CI として動かせないので、submodule か C++コード関係の更新、npm publish 時のみライブラリのビルドを行い、TypeScript などその他の部分は TypeScript 部分のテストと Lint のみを行うようにしました。また、submodule を更新しない限り、[@actions/cache](https://github.com/actions/cache) を用いて submodule 全体をキャッシュする事にしたので、最終的に C++の CI は 8 分程度、JS の CI は 3 分程度とそれなりに速く稼働するようにできました。（ただ submodule 全体が 8GB 程度あるようで C++の CI で 8 分かかっている内キャッシュの展開に 5 分ぐらいかかっています）

Actions のキャッシュはどのくらい使えるのだろうと思ったら、どうやら[現在は 10GB まで無料で使えるようになったそうで感謝感激です](https://github.com/actions/cache/issues/6)。

### ビルド繰り返してたら PC 落ちた

電源が悪いのかオーバーヒートしてるのかよく分からないですが、PC が丸ごと落ちるようになりました。ただ電源は RTX 3080 買ったときに変えていて、問題無いと思っているので原因がよくわからないです（1 ヶ月ほど前にボイチャしながら原神していたら同様に落ちて American Megatrends の真っ黒画面で CPU オーバーヒート的なエラーが一回だけ出たので、今回もそれかなぁと少し疑っています）

というかオーバーヒートだったとして水冷とか導入すれば冷えるんですかね。

### npm でネイティブモジュールを作る時の作法が全然わからない

なんとなく node-gyp で作るんだな程度は思っていたのですが、それ以外の情報がほぼ分からなかったので困りました。node-addon-api などを使用して C++/JavaScript のコードを書く、みたいな所はサンプルなどを見れば分かったのですが、npm にパッケージとして上げた時にどうすればネイティブライブラリとして実行されるのか、みたいな点がまずどう検索すればいいのか分からずに困っていました。

結局この時は stackoverflow かなんかで `gypfile: true` を package.json に突っ込むとインストール時何かが動いてネイティブライブラリとして使えるという所までは分かりました。

### 結局 npm のアップロードファイルに何が必要かわからない

パッケージとしてインストールした時にどういうコマンドが勝手に実行されるのか分かっておらず、適当にファイルを include させながら検証のために GitHub Package Registry で private repo に対して何度も publish しまくって別ディレクトリにインストールするという非常に無駄なやり方で試していました。

結局 `.a` の拡張子がついた静的ライブラリという名のめちゃくちゃ大きいファイルとヘッダファイル、こちら側の C++ソースコードがあれば node-gyp のビルドが通りそうだったので、それを突っ込んで npmjs.com に publish しようとしました。ただその時点で全体で 700MB 程度あったのと GitHub Package の帯域が一発で死んだので絶対おかしいなと思いましたが、案の定失敗しました。

![Untitled](https://user-images.githubusercontent.com/14953122/148654796-2b5df3cc-456a-4664-9d7a-fe6d89b8ad14.png)

### 適当に必要そうなファイル突っ込んだら 413 Payload Too Large

![Untitled 1](https://user-images.githubusercontent.com/14953122/148654804-30b04116-99d8-4ef1-9572-56218cf928f6.png)

検証用の GitHub Package Registry は何故か 700MB のパッケージが無理やりアップロードできたのですが、本番の npm Registry では流石に 413 吐いて止まりました。

前述の通りドキュメントが全然見つからない中で完全にお手上げだったので、先人の知恵として既存のネイティブライブラリのソースを見てみることにしました。最近使ったのが画像加工ライブラリの [sharp](https://github.com/lovell/sharp) だったので、それを見たところ明らかに.a なんてファイル入っていなさそうだったのと、どうやら CI で全部事前ビルドして、GitHub のリリースにそれぞれの環境のバイナリを上げておいて、ユーザーのインストール時に自動ダウンロードできるようにする [prebuild](https://nodejs.github.io/node-addon-examples/build-tools/prebuild) という仕組みがあるのを知りました。

prebuild はスクリプトもすべて用意されていて、GitHub のトークンを渡すだけでアップロードもやってくれたので prebuild を追加したら一瞬で全てが解決しました。ただし、ローカルでビルドするのに必要なデータはパッケージ内に入れていないので、ファールバックとして用意されているローカルビルドは無効化しており、現状 CI でビルドしている Linux x64+Node.js v12.x 以降？(NAPI v8 でビルドしたため)でしか動かせないです。

### yarn v2 で `yarn install --ignore-scripts` がしたい

![Untitled 2](https://user-images.githubusercontent.com/14953122/148654807-0ca011c0-ea7f-4447-98d8-0e53a7054847.png)

yarn install をする時に prebuild で追加した 自分の `install` スクリプトを試してしまい、存在しない prebuild ファイルを求めるようになってしまいました。ライブラリ開発時は prebuild のコマンドをスキップさせたいのですが、~~どうやら yarn v2 では install コマンドに ignore-scripts が無いようです。とりあえず適当な踏み台のスクリプトを用意して、環境変数で prebuild コマンドを動かすかどうか分岐させています。~~

[https://yarnpkg.com/cli/install](https://yarnpkg.com/cli/install) もしかしてお前 `--mode=skip-build` か...？（最後まで見てなかった）

## さいごに

ライブラリ作って満足していたけどそもそも Bot が欲しいんだがって話なのでこれから Bot 作ります。
