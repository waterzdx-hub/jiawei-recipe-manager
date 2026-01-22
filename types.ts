
export interface Ingredient {
  name: string;
  amount: string;
}

export interface Step {
  description: string;
}

export interface Recipe {
  id: string;
  name: string;
  categories: string[];
  tags: string[];
  image: string;
  date: string;
  ingredients: Ingredient[];
  steps: Step[];
  chefNote?: string;
  description?: string;
}

export interface CartItem {
  recipeId: string;
  quantity: number;
}

export enum Page {
  Home = 'home',
  Add = 'add',
  Detail = 'detail',
  Cart = 'cart'
}
