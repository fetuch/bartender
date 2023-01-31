interface ingredient {
  name: string;
  measure: string;
}
export interface Drink {
  id: number;
  name: string;
  category: string;
  glass: string;
  instructions: string;
  ingredients: ingredient[];
  dateAdded: string;
}
export interface Spotlight {
  id: number;
  img: string;
  title: string;
  description: string;
}
export interface Category {
  id: number;
  name: string;
}
