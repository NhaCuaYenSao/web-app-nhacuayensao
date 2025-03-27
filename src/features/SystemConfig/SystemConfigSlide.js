import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  logo: "",
  name: "",
  maintenanceMode: false,
  version: "",
  emailSupport: "",
  linkWebsite: "",
  linkSupport: 0,
  minWithdraw: 0,
  maxWithdraw: 0,
  customFields: "",
  withdrawFee: 0,
};

const systemConfigSlide = createSlice({
  name: "config-system",
  initialState,
  reducers: {
    setConfigSystem: (state, action) => {
      state.logo = action.payload.logo;
      state.name = action.payload.name;
      state.maintenanceMode = action.payload.maintenanceMode;
      state.version = action.payload.version;
      state.emailSupport = action.payload.emailSupport;
      state.linkWebsite = action.payload.linkWebsite;
      state.linkSupport = action.payload.linkSupport;
      state.minWithdraw = action.payload.minWithdraw;
      state.maxWithdraw = action.payload.maxWithdraw;
      state.customFields = action.payload.customFields;
      state.withdrawFee = action.payload.withdrawFee;
    },
  },
});

export const { setConfigSystem } = systemConfigSlide.actions;
export default systemConfigSlide.reducer;
