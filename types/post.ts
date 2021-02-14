interface post {
  slug: string;
  title: string;
  date: number;
  summary: string;
  tags: Array<string>;
  isHidden: boolean;
  category: Array<string>;
  commentId?: string;
}

export default post;
