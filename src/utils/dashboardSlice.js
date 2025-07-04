import { createSlice } from "@reduxjs/toolkit";


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        count: 0,
        target_count: 0,
        status: "In Progress",
    },
    reducers: {
        setDashboardData: (state,action) => {
            state.name = action.payload.name;
            state.count = action.payload.user_count;
            state.target_count = action.payload.count_target;
            state.status = action.payload.status;
            state.pinnum = action.payload.pinnum;
            state.updatedat = action.payload.updatedat;
            state.tarpanam_count = action.payload.tarpanam_count;
        },
        updateCount: (state,action) => {
            state.count = action.payload.user_count;
            state.status = action.payload.status;
            state.updatedat = action.payload.updatedat;
            state.tarpanam_count = action.payload.tarpanam_count;
        }, 
    },
})

export const {setDashboardData, updateCount} = dashboardSlice.actions;

export default dashboardSlice.reducer;