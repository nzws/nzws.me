---
title: 新しいEdgeと古いEdgeを共存させたい
tags:
  - Windows
  - Edge
  - ブラウザ戦争
date: '2020-02-12 16:42:00'
url: edge
---

どうも [ねじわさ](https://nzws.me) です。  
みなさんはウェブサイト作ったりしますでしょうか。
最近私は何個か作っているのですが、そこでふと疑問に思った点があったので記事にしました。

さて、ウェブサイトは端末にインストールされたブラウザを通して閲覧できる訳ですが、資本主義の時代なので端末もブラウザもいくつも種類があります。バージョンまで見ちゃうと本当に組み合わせの量がやばい。

個人が趣味でちょろっとやっているレベルであれば自分のブラウザだけ見とけばいいのですが、他人のウェブサイトのお手伝いをするとなるとちょっと話が変わってきますよね。  
流石に古いバージョンまでは見切れていないのですが、ある程度メジャーブラウザは一通り目を通すようにしています。

私が考えるメジャーブラウザというと、

> 主語が大きいと「〇〇もメジャーやぞ！」って飛んできそうなのであえて「私が考える」って入れてます

- Chrome
- Firefox
- Edge
- Safari (特に iOS 版 Safari)

あたりかなって思います。

ところで、Edge は最近大型アップデートをしました：[新たな年に新たなブラウザーを – 新しい Microsoft Edge はプレビューを終え、ダウンロード提供を開始 - Windows Blog for Japan](https://blogs.windows.com/japan/2020/01/16/new-year-new-browser-the-new-microsoft-edge-is-out-of-preview-and-now-available-for-download/)  
これは何かって言うと、今まで EdgeHTML という Edge 独自のエンジンを使用していたのを、諦めて Chromium(Chrome がベースとして使用している)エンジンを使用する事になりました。Edge が実質 Chrome になったので、恐らく動き方も Chrome と変わらなくなったと思います。

バージョンとかそういう次元ではなく、一から(いちから!?)作り直された為、**古い Edge と新しい Edge を別々のブラウザとして切り分けて考慮する必要があります。** (新しい Edge は `新しい Microsoft Edge` とか `New Microsoft Edge` と呼ばれていて、古い方は `Microsoft Edge レガシ` とか `Microsoft Edge Legacy` と呼ばれているようです)

> しかも、上記のブログに `※日本のお客様に対しては、確定申告への影響を考慮し、Windows Updateを通じた新しいMicrosoft Edgeの配信は令和２年４月１日以降、順次開始される予定です。` と書いてある通り、一定期間日本の Windows ユーザーには新しい Edge は自動配布されないため、現時点では確実に古い Edge と新しい Edge 両方が存在する世界です。  
> 恐らく Windows Update を無効化していたり、Windows 8 以前を使い続けている人もいるはずなので、今後もシェアが低くなるとはいえ残っている事でしょう。

そこで疑問が発生するのは、私はリリース日に Chromium 版 Edge を興味本位で入れたのですが、一度新しい Edge を入れたらどうやって古いのを呼び出すんだ...？という事です。アプリ検索をしても Edge は一つしか出てきません。PC を 2 個用意するとかやろうとしてもそんな金はないしなぁ...みたいな感じでどうしようかぐぐった所、次のヘルプ記事を見つけました。

- [旧バージョンの Microsoft Edge にアクセスする | Microsoft Docs](https://docs.microsoft.com/ja-jp/deployedge/microsoft-edge-sysupdate-access-old-edge)

正直日本語の皮を被ったカタカナ語すぎて何言ってんのか全くわかんなかったのでもう少し日本語っぽく書き起こしました。
(まあ忠実に直訳するとこうなっちゃうよね感あるので翻訳/記事の質が悪いとかそういう訳ではないです)

- 1: [Microsoft Edge for business のページから**ポリシーファイル**をダウンロードします。](https://www.microsoft.com/en-us/edge/business/download)
  - この時、バージョンは Stable の一番最新を選択し、 `Get Policy Files` をクリックします。
- 2: ダウンロードした cab ファイルの中の zip ファイルを展開し、
  - `~~.zip/windows/admx` 直下にある `msedge.admx` と `msedgeupdate.admx` ファイルを取り出します。
  - `~~.zip/windows/admx/(あなたの言語、日本語ならja-JP)` 直下にある 2 つの `~~.adml` ファイルを取り出します。
- 3: それぞれ次のフォルダに突っ込みます。
  - 前述の `admx` ファイルは `C:\Windows\PolicyDefinitions` 直下に
  - 後述の `adml` ファイルは `C:\Windows\PolicyDefinitions\(さっきの言語と同じ名前)` 直下に
- 4: `gpedit.msc` をファイル名を指定して実行から開くなり、検索して開くなりして `ローカルグループポリシーエディタ` を開きます。
- 5: `コンピューターの構成` > `管理用テンプレート` > `Microsoft Edge の更新` > `アプリケーション` を開きます。
- 6: `Microsoft Edge でのブラウザーの同時実行エクスペリエンスを許可する` を開き、 `有効` にして適用します。
- 7: 最後に、[新しい Edge をもう一度ダウンロード&インストール](https://www.microsoft.com/en-us/edge) して、やっと Legacy が出てきます。

ここまで来ると、**Microsoft Edge レガシ**というのがアプリに入ってます。やったね！！

# さいごに

全人類 Chrome 使ってほしい
