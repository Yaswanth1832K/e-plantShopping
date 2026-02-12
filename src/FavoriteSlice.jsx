import { createSlice } from '@reduxjs/toolkit';

export const FavoriteSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [],
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const plant = action.payload;
            const index = state.items.findIndex(item => item.id === plant.id);
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push(plant);
            }
        },
    },
});

export const { toggleFavorite } = FavoriteSlice.actions;

export default FavoriteSlice.reducer;
