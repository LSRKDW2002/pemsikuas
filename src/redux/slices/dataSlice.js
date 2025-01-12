import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDroughtData, addDroughtData, updateDroughtData, deleteDroughtData } from "../../services/api";

// Thunks untuk API
export const fetchDroughtData = createAsyncThunk("data/fetchDroughtData", async () => {
  const response = await getDroughtData();
  return response.data;
});

export const addDrought = createAsyncThunk("data/addDrought", async (newData) => {
  const response = await addDroughtData(newData);
  return response.data;
});

export const updateDrought = createAsyncThunk("data/updateDrought", async ({ id, updatedData }) => {
  const response = await updateDroughtData(id, updatedData);
  return response.data;
});

export const removeDrought = createAsyncThunk("data/removeDrought", async (id) => {
  await deleteDroughtData(id);
  return id;
});

// Slice Redux
const dataSlice = createSlice({
  name: "data",
  initialState: {
    droughtData: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDroughtData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDroughtData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.droughtData = action.payload;
      })
      .addCase(fetchDroughtData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addDrought.fulfilled, (state, action) => {
        state.droughtData.push(action.payload);
      })
      .addCase(updateDrought.fulfilled, (state, action) => {
        const index = state.droughtData.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.droughtData[index] = action.payload;
        }
      })
      .addCase(removeDrought.fulfilled, (state, action) => {
        state.droughtData = state.droughtData.filter((item) => item.id !== action.payload);
      });
  },
});

export default dataSlice.reducer;