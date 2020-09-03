export interface Post {
  body: string;
  id: number;
}

export interface UserPost extends Post {
  author: number;
  created_at: string;
  likes: number;
  comment: string;
}

export interface PostByUser {
  body: string;
  id: number;
}