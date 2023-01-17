import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  DICTIONARY_API_URL, hearts, qtyOfPhrases,
} from '../../utils/constants';
import { TPhrasesState } from '../../types/types';

export const getData = createAsyncThunk(
  'phrases/getData',
  async () => fetch(DICTIONARY_API_URL, {
    method: 'GET',
  }).then(
    (data) => data.json(),
  ).catch((e) => console.error('Error in fetching data:', e)),
);

const initialState: TPhrasesState = {
  loading: false,
  list: [],
  usersAnswer: null,
  phraseNumber: 0,
  phrase: null,
  isAnswered: false,
  isAnsweredRight: null as null | boolean,
  answer: null,
  counter: 0,
  lives: hearts,
  gameOver: false,
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
      state.counter = state.isAnsweredRight ? state.counter += 1 : state.counter;
      state.lives = (!state.isAnsweredRight && state.lives.pop()) ? state.lives : state.lives;
      state.gameOver = state.lives.length === 0;
    },
    changePhrase: (state) => {
      state.usersAnswer = initialState.usersAnswer;
      state.list = initialState.list;
      state.phrase = initialState.phrase;
      state.isAnswered = initialState.isAnswered;
      state.isAnsweredRight = initialState.isAnsweredRight;
      state.phraseNumber = initialState.phraseNumber;
    },
    startOver: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload.list.slice(0, qtyOfPhrases);
        state.phrase = state.list[state.phraseNumber];
      })
      .addCase(getData.rejected, (state: any) => {
        state.loading = false;
      });
  },
});

export const {
  startGame, sendAnswer, changePhrase, startOver,
} = phrasesSlice.actions;

export default phrasesSlice.reducer;
