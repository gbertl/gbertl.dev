import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '..';
import * as api from '../../api';

export interface Projects {
  id: number;
  technologies: string[];
  categories: string[];
  screenshots: string[];
  title: string;
  description: string;
  live_preview: string;
  source_code: string;
  priority_order: number;
}

interface Categories {
  id: number;
  title: string;
  name: string;
  priority_order: number;
}

interface PortfolioSliceState {
  projects: Projects[];
  categories: Categories[];
}

const hydrate = createAction<AppState>(HYDRATE);

export const fetchProjects = createAsyncThunk(
  'portfolio/fetchProjects',
  async () => {
    const { data } = await api.getProjects();
    return data;
  }
);

export const fetchCategories = createAsyncThunk(
  'portfolio/fetchCategories',
  async () => {
    const { data } = await api.getCategories();
    return data;
  }
);

const initialState: PortfolioSliceState = {
  projects: [],
  categories: [],
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    replaceProjects: (state, action) => {
      state.projects = action.payload;
    },
    replaceCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        const nextState = {
          ...state,
          ...action.payload[portfolioSlice.name],
        };

        if (!action.payload[portfolioSlice.name].projects.length)
          nextState.projects = state.projects;

        if (!action.payload[portfolioSlice.name].categories.length)
          nextState.categories = state.categories;

        return nextState;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (_, action) => {
        console.log(action.error);
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (_, action) => {
        console.log(action.error);
      });
  },
});

export const selectProjects = (state: AppState) => state.portfolio.projects;
export const selectCategories = (state: AppState) => state.portfolio.categories;

export const { replaceProjects, replaceCategories } = portfolioSlice.actions;

export default portfolioSlice.reducer;