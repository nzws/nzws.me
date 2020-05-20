---
title: 'ゆる募: Google Payアプリが動かんくなったので解決方法を教えてくれ'
tags:
  - Google
  - キャッシュレス
date: '2020-04-04 16:46:00'
url: google-pay-is-unavailable
---

# 追記

**Google Play 開発者サービス** のキャッシュとストレージ消したら直った。

ここより下追記前

---

本当はこんな事たらたらブログに書くつもりじゃなかったのですがイライラ度が増してきたので書きます。解決方法知ってたら [Mastodon: @nzws@don.nzws.me](https://don.nzws.me/@nzws) か [Twitter: @nzws_me](https://twitter.com/nzws_me) までリプください。お願いします！！！

## 何が起こった

<iframe src="https://don.nzws.me/@nzws/103936163125647012/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe>

> Google Pay is unavailable

という表示が出てアプリが開けない（というか途中で阻止されて強制終了される）状態です。

## 試したこと

まず、自力での解決を試み、次の事は試しました。

- アプリが最新かどうか確認した
- アプリの強制終了 → 再起動
- アプリのキャッシュ、ストレージクリア
- 端末の再起動

これでも同じ現象が起こったので、Google Pay サポートに問い合わせた所、次の事をするように返答がありました。

> 余談なのですが、ちゃんと**Pay**のサポートに送信したのに、なぜか**Play ストア**のサポートから返信が来て本文が全体的に Play ストアに問題があるかのように誤解されてるようでした。なんでだよ。

- アプリを強制停止し、デバイスを Google サーバーと同期する
  - 強制停止: 前やった
  - 同期: 端末時刻を意図的にずらして元に戻すと強制同期されるらしい、やってみた
- Play ストアとダウンロード アプリのキャッシュとデータを削除する
  - 前やった
- デバイスがサポートされていることを確認する
  - 正規品の Android One X2 だし OS もカスタム ROM じゃなくて公式のだし root 化もしてないよ
- (端末から)Google アカウントを削除し、追加し直す
  - やってみた、全部の同期が外れてアプリログインし直しでくそ面倒だった
- デバイスを再起動する
  - 前やった
- 別の方法でインターネットに接続してみる
  - Wi-Fi とセルラー両方試した
- Play ストアのアップデートをアンインストールして再インストールする
  - 前やった
- デバイスのリセット
  - **やってない**

流石に端末の初期化は面倒すぎて試してないです。しなきゃ駄目なのかなぁ...

## さいごに

丸 2 日ぐらいこの現象が続いててここまで酷い状況になってるのは久しぶりです。本当に知ってる人いたら教えてください...