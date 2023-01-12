import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DICTIONARY_API_URL, qtyOfPhrases } from '../../utils/constants';
import getNumber from '../../utils/getNumber';
import { TPhrase } from '../../types/types';

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

type TState = {
  start: boolean,
  loading: boolean,
  list: [],
  usersAnswer: null | number,
  phrase: null | TPhrase,
  isAnswered: boolean,
  isAnsweredRight: null | boolean,
  answer: any,
  counter: number,
};

const initialState: TState = {
  start: true,
  loading: false,
  list: [],
  usersAnswer: null,
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
    sendAnswer: (state, action) => {
      state.usersAnswer = action.payload;
      state.isAnswered = action.payload && true;
      state.isAnsweredRight = state.usersAnswer === state.phrase!.defid;
      console.log(state.isAnsweredRight);
      state.counter = state.isAnsweredRight ? state.counter += 1 : state.counter -= 1;
    },
    changePhrase: (state) => {
      state.usersAnswer = null;
      state.list = [];
      state.phrase = null;
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
        state.phrase = phrasesToRender[getNumber(qtyOfPhrases)];
      })
      .addCase(getData.rejected, (state: any) => {
        state.loading = false;
      });
  },
});

export const { sendAnswer, changePhrase } = phrasesSlice.actions;

export default phrasesSlice.reducer;
