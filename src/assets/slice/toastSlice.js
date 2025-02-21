import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const toastSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    pushMessage(state, { payload }) {
      const { text, success } = payload;
      const id = Date.now();

      state.messages.push({
        id,
        text,
        success,
      });
    },
    removeMessage(state, { payload }) {
      const index = state.messages.findIndex((item) => item.id === payload);
      if (index !== -1) {
        state.messages.splice(index, 1);
      }
    },
  },
});

export const { pushMessage, removeMessage } = toastSlice.actions;
export default toastSlice.reducer;
