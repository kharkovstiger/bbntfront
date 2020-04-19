export class Post {
  id: string;
  u21?: boolean;
  title: string;
  text: string;
  author: string;
  date: Date;
  comments: Post[];
}
