export interface Post {
  body: string;
  author: number;
}

export interface UserPost extends Post {
  author: number;
  created_at: string;
  likes: number;
  comment: string;
}

export interface Comment {
  body: string;
  id: number;
}
