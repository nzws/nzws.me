---
title: 'nzws.me/blog のコメント欄について'
date: '2021-02-14'
isHidden: true
---

導入経緯などについてはこちらを御覧ください: [試験的にコメント欄を作成します](/blog/202102-added-comment)

## コメントの付け方

### 「ActivityPub」と言われて何かわかる人

このブログのコメント欄では AP の特定の投稿についたリプライを直接コメントとして表示しています。
そのため、AP 対応サービスのアカウントをお持ちであればコメントを投稿する事が可能です。

インタラクトのリンクをコメント欄に設置しています。
そのページから各自のサーバーの返信欄に飛ぶことができ、そこで直接投稿する事ができます。

### わからない人

WIP

## 表示できないコメントやモデレーション方針について

- 若干ですが API レスポンスにキャッシュを挟んでいるのですぐには反映されません。
- 基本的にコメント欄導入後の記事にのみコメントできます。（対応していない記事にはコメント欄が出現しません）
- データの表示元サーバーに私が個人で運営する don.nzws.me から表示しています。このサーバーから閲覧できない投稿はコメントとして表示されません。
- Mastodon で言う「公開」「未収載」のみ表示できます。非公開やローカルのみ、DM などの公開範囲では表示できません。
- nzws.me/blog に関しては完全な個人ブログなため、コメントに対してある程度自由なモデレーションを行わせて頂く事があります。ご了承ください。
- 以上の理由から非表示になっている投稿に対しての返信も技術的な理由から全て非表示になります。
- 管理が難しそうだった場合、閉鎖を行う事があります。

暫定的に制限している内容:

- リンク → 表示しません。元投稿へのリンクから閲覧できます。
- 画像 → 表示しません。元投稿へのリンクから閲覧できます。
- spoiler や sensitive が有効になっている投稿 → 一覧から除外されます。
- Bot アカウント → 一覧から除外されます。

上記は変更される可能性があります。
