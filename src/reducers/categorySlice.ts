import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUid } from './authSlice';
import { fireAuth, fireDatabase } from "../firebase"

export interface ICategoryDTO {
  title: string,
  limit: number;
  id?: string;
}

export interface ICategory { id: string, title: string, limit: number }

export interface ICategories {
  categories: Array<ICategory>
}
const initialState: ICategories = {
  categories: []
}
export const createCategory = createAsyncThunk("category/createCategory", async ({ title, limit }: ICategoryDTO, { dispatch }) => {
  const uid = getUid()
  const category = await fireDatabase.ref(`/users/${uid}/categories`).push({ title, limit })
  return { title, limit, id: category.key }
})

export const editCategory = createAsyncThunk("category/editCategory", async ({ title, limit, id }: ICategoryDTO, { dispatch }) => {
  const uid = getUid()
  const category = await fireDatabase.ref(`/users/${uid}/categories${id}`).push({ title, limit })
  return { title, limit, id: category.key }
})

export const loadCategories = createAsyncThunk("category/loadCategory", async () => {
  const uid = getUid()
  const category = (await fireDatabase.ref(`/users/${uid}/categories`).once("value")).val()
  const addaptive = Object.keys(category).map((key) => {
    return { id: key, title: category[key].title, limit: category[key].limit }
  })
  return addaptive
})

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    [createCategory.fulfilled.type]: (state, action) => {
      state.categories.push(action.payload)
    },
    [loadCategories.fulfilled.type]: (state, action) => {
      state.categories = action.payload
    }
  }
})

export default categorySlice.reducer