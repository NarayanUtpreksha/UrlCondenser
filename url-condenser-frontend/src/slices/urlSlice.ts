import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShortenedUrl extends UrlWithoutId {
  id: number;
  longUrl: string;
  shortUrl: string;
}

interface UrlWithoutId {
    longUrl: string;
    shortUrl: string;
}

interface UrlState {
  urls: ShortenedUrl[];
}

const initialState: UrlState = {
  urls: [],
};

const urlSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {
    setUrls(state, action: PayloadAction<UrlWithoutId[]>) {
      state.urls = action.payload.map((url, index) => ({
        ...url,
        id: index + 1, // Assign a unique ID (e.g., based on index)
      }));
    },
    addUrl(state, action: PayloadAction<UrlWithoutId>) {
      state.urls.unshift({
        ...action.payload,
        id: state.urls.length > 0 ? state.urls[0].id + 1 : 1, // Assign a unique ID
      }); // Add the new URL to the top of the list
    },
  },
});

export const { setUrls, addUrl } = urlSlice.actions;
export default urlSlice.reducer;