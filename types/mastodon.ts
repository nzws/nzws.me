export type Account = {
  id: string;
  username: string;
  acct: string;
  display_name: string;
  bot: boolean;
  url: string;
  avatar_static: string;
};

export type Tag = {
  name: string;
  url: string;
};

export type Status = {
  id: string;
  in_reply_to_id: string;
  created_at: string;
  sensitive: boolean;
  spoiler_text: string;
  visibility: 'public' | 'unlisted' | 'private' | 'direct';
  url: string;
  content: string;
  reblog?: Status;
  account: Account;
  tags: Tag[];
};

export type StatusesContext = {
  ancestors: Status[];
  descendants: Status[];
};
