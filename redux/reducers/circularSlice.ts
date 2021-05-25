import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {CircularCardProps} from '../../types'

interface CircularState{
    circulars:CircularCardProps[]
}
//initial state
const initialState:CircularState={
    circulars:[]
}
//create slice
export const circularSlice = createSlice({
    name:'circular',
    initialState,
    reducers:{
        getCirculars:(state,action:PayloadAction<CircularCardProps[]>)=>{
            state.circulars = action.payload;
            return state
        }
    }
})

export const {getCirculars} = circularSlice.actions

export default circularSlice.reducer