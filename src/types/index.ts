
import { CategoryAPIResponseSchema, DrinkAPIResponseS, DrinksAPIResponseS, RecipeAPIResponseSchema, SearchFilterSchema } from '../utils/recipes-schema';
import { z } from 'zod';

export type Categories = z.infer<typeof CategoryAPIResponseSchema>;

export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Drinks=z.infer<typeof DrinksAPIResponseS>
export type Drink = z.infer<typeof DrinkAPIResponseS>
export type Recipe=z.infer<typeof RecipeAPIResponseSchema>