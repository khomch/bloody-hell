import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DICTIONARY_API_URL, qtyOfPhrases } from '../../utils/constants';
import { TPhrasesState } from '../../types/types';

export const getData = createAsyncThunk(
  'phrases/getData',
  async () => fetch(DICTIONARY_API_URL, {
    method: 'GET',
  }).then(
    (data) => data.json(),
  ),
);

const initialState: TPhrasesState = {
  start: true,
  loading: false,
  list: [],
  usersAnswer: null,
  phraseNumber: 0,
  phrase: null,
  isAnswered: false,
  isAnsweredRight: null as null | boolean,
  answer: null,
  counter: 0,
};

export const phrasesSlice = createSlice({
  name: 'phrases',
  initialState,
  reducers: {
    startGame: (state, action) => {
      state.phraseNumber = action.payload;
    },
    sendAnswer: (state, action) => {
      state.usersAnswer = action.payload;
      state.isAnswered = action.payload && true;
      state.isAnsweredRight = state.usersAnswer === state.phrase!.defid;
      state.counter = state.isAnsweredRight ? state.counter += 1 : state.counter -= 1;
    },
    changePhrase: (state) => {
      state.usersAnswer = null;
      state.list = [];
      state.phrase = null;
      state.isAnswered = false;
      state.isAnsweredRight = null;
      state.phraseNumber = 0;
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
        state.list = payload.list.slice(0, qtyOfPhrases);
        state.phrase = state.list[state.phraseNumber];
      })
      .addCase(getData.rejected, (state: any) => {
        state.loading = false;
      });
  },
});

export const { startGame, sendAnswer, changePhrase } = phrasesSlice.actions;

export default phrasesSlice.reducer;
