import { createSlice } from '@reduxjs/toolkit'
// import { HYDRATE } from 'next-redux-wrapper'

const initState = {
    authToken: null,
    user: null,
    userReviewData: null,
    totalUserReviewCount: 0,
    userSearchResult: null,
}

const statusSlice = createSlice({
    name: 'status',
    initialState: initState,
    reducers: {
        setAuthToken: (state, { payload }) => {
            state.authToken = payload
        },
        setUser: (state, { payload }) => {
            state.user = payload
        },
        setUserReviewData: (state, { payload }) => {
            state.userReviewData = payload
        },
        setTotalUserReviewCount: (state, { payload }) => {
            state.totalUserReviewCount = payload
        },
        setUserSearchResult: (state, { payload }) => {
            state.userSearchResult = payload
        },
    }
})

export const { setAuthToken, setUser, setUserReviewData, setTotalUserReviewCount,setUserSearchResult } = statusSlice.actions;

export const statusReducer = statusSlice.reducer;