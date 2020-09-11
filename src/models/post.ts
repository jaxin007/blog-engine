export interface Post {
  author: number;
  body: string;
}

export interface UserPost extends Post {
  author: number;
  created_at: string;
  likes: number;
  comment: string;
}

export interface Comment {
  id: number;
  body: string;
}
