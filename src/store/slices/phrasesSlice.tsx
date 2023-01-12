import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DICTIONARY_API_URL, qtyOfPhrases } from '../../utils/constants';
import getNumber from '../../utils/getNumber';

export const getData = createAsyncThunk(
  'phrases/getData',
  async () => {
    const res = await fetch(DICTIONARY_API_URL, {
      method: 'GET',
    }).then(
      (data) => data.json(),
    );
    return res;
  },
);

export const phrasesSlice = createSlice({
  name: 'phrases',
  initialState: {
    start: true,
    loading: false,
    list: [],
    usersAnswer: null,
    answer: null,
    isAnswered: false,
    isAnsweredRight: null as null | boolean,
  },
  reducers: {
    sendAnswer: (state, action) => {
      state.usersAnswer = action.payload;
      state.isAnswered = action.payload && true;
      state.isAnsweredRight = state.usersAnswer === state.answer;
    },
    changePhrase: (state) => {
      state.usersAnswer = null;
      state.list = [];
      state.answer = null;
      state.isAnswered = false;
      state.isAnsweredRight = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.start = false;
        const phrasesToRender = payload.list.slice(0, qtyOfPhrases);
        state.list = phrasesToRender;
        state.answer = phrasesToRender[getNumber(qtyOfPhrases)];
      })
      .addCase(getData.rejected, (state: any) => {
        state.loading = false;
      });
  },
});

export const { sendAnswer, changePhrase } = phrasesSlice.actions;

export const phrases = (state: any) => state.phrases.phrases;

export default phrasesSlice.reducer;
