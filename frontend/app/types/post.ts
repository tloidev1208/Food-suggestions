export interface Post {
  _id: string;
  user?: string;
  foodId?: string;
  foodName?: string;
  content?: string;
  ingredient?: string;
  createdAt?: string;
  likes?: number;

  // các field này phải là string CHẮC CHẮN
  imageUrl: string;
  name?: string;
  image?: string;
}
