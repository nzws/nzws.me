export type Account = {
  id: string;
  username: string;
  acct: string;
  display_name: string;
  bot: boolean;
  url: string;
  avatar_static: string;
};

export type Status = {
  id: string;
  created_at: string;
  sensitive: boolean;
  spoiler_text: string;
  visibility: 'public' | 'unlisted' | 'private' | 'direct';
  url: string;
  content: string;
  reblog?: Status;
  account: Account;
};

export type StatusesContext = {
  ancestors: Status[];
  descendants: Status[];
};
