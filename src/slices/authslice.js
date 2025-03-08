import { createSlice } from '@reduxjs/toolkit';

const authslice = createSlice({
  name: 'authslice',
  initialState: { status:false,userdata:null },
  reducers: {
    login:(state,actions)=>{
        state.status=true
        state.userdata=actions.payload
    },
    logout:(state,actions)=>{
        state.status=false
        state.userdata=null
    }
  },
});

export const { login,logout} = authslice.actions;
export default authslice.reducer;
