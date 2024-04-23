import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { RecipesSliceType, createRecipesSlice } from "./recipeSlice";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";

export type FavoritesSliceType = {
    favorites: Recipe[]
    hadleClickFavorite: (recipe:Recipe) => void
    favoriteExists:(id:Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType,[],[],FavoritesSliceType> = (set,get,api) => ({
    favorites: [],
    hadleClickFavorite: (recipe) => {
       if(get().favorites.some(favorite =>favorite.idDrink === recipe.idDrink)){
           set((state)=>({
                     favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
           })) 
           createNotificationSlice(set,get,api).showNotification({
                text: 'Receta eliminada de favoritos',
                error: false
              })

    } else 
 
    {
        set((state)=>({
            favorites: [...state.favorites,recipe]
        })
    
    
    )
    createNotificationSlice(set,get,api).showNotification({
        text: 'Receta añadida a favoritos',
        error: false
    })
    }
    createRecipesSlice(set,get,api).closeModal()
    localStorage.setItem('favorites',JSON.stringify(get().favorites))
},

    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const favorites = localStorage.getItem('favorites')
        if(favorites){
            set({
                favorites: JSON.parse(favorites)
            })
        }
    }
})