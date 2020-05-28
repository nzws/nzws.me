# nzws.me

ねじわさみー！！！

## (開発者向け)

- ブログの実装の実体: `pages/blog/**`
- ブログデータ: `blog-data/posts/*.md`

記事リスト用インデックス生成:

```bash
yarn generate-index
```

> デフォルトで差分生成が行われます。クリアするには `blog-data/.index.json` を削除してください。
