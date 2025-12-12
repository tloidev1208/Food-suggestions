export interface Nutrition {
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
}

export interface Recipe {
  _id: string;
  name: string;
  image: string;
  cook_time?: string;
  ingredients?: string[];
  instructions?: string[]; // bạn đang join, nên phải là string[]
  nutrition?: Nutrition;   // <- KHÔNG được là string
}

