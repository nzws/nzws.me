---
title: '鍵を 2 回ひねったらオートロックするオートメーションを作る'
category:
  - 雑記
tags:
  - IoT
  - スマートホーム
date: '2022-01-03'
---

# 鍵を 2 回ひねったらオートロックするオートメーションを作る

どうもこんにちは、[ねじわさ](https://don.nzws.me/@nzws) です。あけましておめでとうございます。  
去年は本当に大学とバイトで忙しくて凄く久々に書きました。（逆に年末年始は暇なので書いてる）

## 背景

さて、うちの家では[SESAME](https://jp.candyhouse.co/products/sesame4)を玄関の鍵に設置していて、スマートフォンや API 経由から鍵を施錠/解錠する事ができます。そもそも、何故か知らないけど鍵が家に住む人数分無く、私は鍵を持っておらず作ってくれそうな雰囲気でも無かったので勝手に取り付けました。

せっかくスマートロックを取り付けたので、オートロックとか入れたい気持ちがあるのですが、次の要件から SESAME 内蔵の時間式オートロックは使用できず別途工夫する必要がありました。

- ゴミ出しなどで締め出される危険性があるので、短時間のオートロックは NG
- ただし、何らかのアクションを使用した場合は 10 秒程度で閉まるようにしたい
- たまにドアが締まりきらない時があるので、施錠に失敗したら一回で諦めさせる
  - SESAME の内蔵機能は閉まるまで無限に試行する

そこで、内蔵機能は使用せず外部からオートメーションを用いる形でオートロックを設定しました。

## 設定内容とか

以前は Homebridge を使用していたのですが、これは Apple Homekit と連携するためのサードパーティアプリで Apple 製品をメインで使用している人間でないと使い勝手が悪いので、最近 Home Assistant(以後、HASS) という汎用的に使用できるものに移行しました。その際、HASS の Homekit Client を使用し Homebridge と iPhone/iPad を経由せずサーバー内で直接連携するという戦略を取ることで、無駄にスマートホームのサーバーが動くことにはなりますが、今までの Homebridge プラグインをそのまま使用しながらより柔軟性が高く安定動作させる事が可能になりました。

今回のオートメーションの設定は全て HASS 上で行っています。(下記の yaml は UI から書き出しているだけです)

### 長時間開いていた場合に、鍵を閉める

締め忘れていた時の保険用に、10 分間開きっぱなしであれば閉めるようにします。トリガーとして `10分間鍵が開いていたら` を指定し、アクションで鍵を閉めるように指示するシンプルなものです。

```yaml
alias: 'Auto Lock (Timeout)'
description: ''
trigger:
  - platform: device
    device_id: (id)
    domain: lock
    entity_id: lock.home
    type: unlocked
    for:
      hours: 0
      minutes: 10
      seconds: 0
      milliseconds: 0
condition: []
action:
  - device_id: (id)
    domain: lock
    entity_id: lock.home
    type: lock
mode: single
```

### 鍵を 2 回ひねったら、解錠 →10 秒待機 → 施錠する

すぐに鍵を閉めたいが、スマホを出すのが面倒な時に動作させるオートメーションです。やりたい事の手順としては下記の通りです。

- 鍵が閉まっている時に
- **手で鍵を開ける**
- **1 秒以内に手で鍵を閉める**
  - 条件が揃ったらオートメーションが鍵を開ける
  - 10 秒後、鍵を閉める

この動作については、Qrio Lock のオートロック一時停止を見て思いつきました。 [ゴミ出しやちょっとした外出に便利！オートロック一時停止機能って知ってました？ | Qrio Lock Blog](https://blog.qrio.me/smartlock/autolock-pause/)

今回要件としては「締め出しを防ぎつつオートロックする事」なので、Qrio Lock に搭載されている機能とは全く逆の事をしていますが、新たにボタン等を用意する事なく特別なアクションをする事ができたので丁度良かったです。

トリガーとしては前回と異なり解錠時にすぐオートメーションを開始します。ただし、開始後のアクションで [wait_for_trigger](https://www.home-assistant.io/docs/scripts/#wait-for-trigger) というアクションを使用し、1 秒以内に施錠イベントが来なければ**タイムアウトによりオートメーションを中止する**という分岐を行っています。その後は解錠 → 遅延 → 施錠と行っているだけです。

なお、一回目の施錠後自動で開けているのは、単純に手で動かすのが面倒な点と、SESAME から何かしらのアラートを出す事はできないので、タイミングなどの問題でオートメーションが失敗した場合に確実に分かるようにするためです。

```yaml
alias: 'Auto Lock (Immediately)'
description: ''
trigger:
  - platform: device
    device_id: (id)
    domain: lock
    entity_id: lock.home
    type: unlocked
condition: []
action:
  - wait_for_trigger:
      - platform: device
        device_id: (id)
        domain: lock
        entity_id: lock.home
        type: locked
    timeout: '1'
    continue_on_timeout: false
  - device_id: (id)
    domain: lock
    entity_id: lock.home
    type: unlock
  - delay:
      hours: 0
      minutes: 0
      seconds: 10
      milliseconds: 0
  - device_id: (id)
    domain: lock
    entity_id: lock.home
    type: lock
mode: single
```

## 課題など

今の所、

- 施錠に失敗したら一回で諦めさせる

については諦めた後それ以上アクションを起こさないので、オートメーションを過信して開いたまま誰もいないという可能性が出てきてしまいます。そのため、全員に対して通知を飛ばすとかやった方がいいかなとは思っています。
