import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

export interface layoutInterface {
    pageLayout: string,
    filter: string,
}
// export interface actionInterface {
//     type: string,
// }
export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {pageLayout:"Kanban", filter: "All"},
  reducers: {
    changeLayout: (state:layoutInterface) => {
        state.pageLayout = state.pageLayout==="Kanban"?"List":"Kanban"
    },
    changeFilter: (state:layoutInterface, action:PayloadAction<string>) => {
        state.filter = action.payload
    },
  },
});

export const { changeLayout, changeFilter } = layoutSlice.actions;

export default layoutSlice.reducer;