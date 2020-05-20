---
title: tinypngで圧縮しつつs3にアップするやつを作った
tags:
  - JavaScript
  - SaaS
  - ZEIT Now
  - Lambda
  - s3
date: '2019-08-02 14:49:00'
url: image-uploader-now
---

![image](/static/files-blog-nzws-me/image-uploader-now/pf5p4rfh36.png)

[前回言っていた](https://blog.nzws.me/2019/07/tuyoi-netlify-cms/)S3 に画像上げたい問題を解決させました。  
ZEIT Now と Lambda で動いてるのでこれもタダ構成です。

GitHub: https://github.com/yuzulabo/image-uploader-now

# 特徴

- tinypng で圧縮して S3 にアップロード
- markdown ですぐにコピー
- クリップボードからの画像ペースト、ファイル D&D、ファイル選択ダイアログでアップロード可能
- アップロード履歴
- directory slug
- ZEIT Now と Lambda でタダ運用

です。

ブログへ画像アップする用に特化させたので、クリップボードからの画像ペーストとかを対応させていて中々強いです。また、アップしたらマークダウンをすぐにコピーできるようにもしました。  
![image](/static/files-blog-nzws-me/image-uploader-now/2019-08-02_14-36-36.gif)
