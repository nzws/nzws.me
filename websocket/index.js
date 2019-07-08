const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 12030
});

wss.on('connection', connection => {
  connection.on('message', message => {
    console.log('received: %s', message);

    const data = commander(message);

    if (data === '__EXIT__') {
      connection.send('Good bye!');
      connection.close();
      return;
    }

    connection.send(data);
  });
  console.log('connected');

  connection.send(`
=====================================
nzws.me [Version 1.0]
Copyright (c) 2019 nzws.
Type "help" to see the command list.`);
});

const commander = command => {
  const args = command.split(' ');

  switch (args[0]) {
    case 'help':
      return `
=====================================
nzws.me [Version 1.0]
Copyright (c) 2019 nzws.
Type "help" to see the command list.

help: このリストを見る
exit: コネクションを終了
rm: ファイルを削除
cd: ワーキングディレクトリを変更
ls: ディレクトリを参照
pwd: 現在のワーキングディレクトリを表示
date: 日時を表示

whoami: 私について
random <min> <max>: <min>-<max>の乱数を生成
`;
    case 'whoami':
      return `
Hello, I'm nzws! >w<
I'm 👨, 👨‍💻, 👨‍🎓
💕: Anime, Otaku contents, JavaScript, PHP
🗣: ja-JP
🏠: Nagoya, Japan

Social accounts:
Twitter: @neziri_wasabi
Mastodon: @nzws@don.nzws.me
GitHub: @yuzulabo
E-mail: i@nzws.me

Thank you!
`;
    case 'date':
      return new Date().toString();
    case 'rm':
      if (args[1] !== '-rf' || args[2] !== '/') {
        return 'ファイルが見つかりません';
      }
      return '💥'.repeat(50000);
    case 'exit':
      return '__EXIT__';
    case 'cd':
    case 'ls':
      if (args[1] === '/' || args[1] === '~/' || args[1] === '~' || !args[1]) {
        return '';
      }

      return 'このディレクトリは存在しません';
    case 'pwd':
      return '/';
    case 'random':
      const min = parseInt(args[1] || 0);
      const max = parseInt(args[2] || 100);

      if (min > max) {
        return 'ERROR: min が max を超えています！';
      }

      return Math.round(Math.random() * (max - min)) + min;
    default:
      return 'このコマンドは存在しません';
  }
};
