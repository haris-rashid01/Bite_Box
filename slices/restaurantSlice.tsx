import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store';

interface Restaurant {
  id: number;
  name: string;
}

interface RestaurantState {
  restaurant: Restaurant | null; // The state can be a Restaurant object or null
}

const initialState: RestaurantState = {
  restaurant: null,
};
export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
   setRestaurant: (state, action) => {
      state.restaurant = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setRestaurant} = restaurantSlice.actions;

export const selectRestaurant = (state: RootState) => state.restaurant.restaurant;

export default restaurantSlice.reducer;