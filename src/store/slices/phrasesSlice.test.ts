import {
  changePhrase, initialState, phrasesSlice, sendAnswer, startGame, startOver,
} from './phrasesSlice';
import { TPhrasesState } from '../../types/types';
import { hearts } from '../../utils/constants';

const stateWithData: TPhrasesState = {
  loading: false,
  list: [],
  usersAnswer: null,
  phraseNumber: 0,
  phrase: {
    author: 'user',
    current_vote: '1',
    defid: 12345,
    definition: 'here is definition',
    example: 'some example of usage',
    permalink: 'link to phrase',
    thumbs_down: 1,
    thumbs_up: 10,
    word: 'word',
    written_on: 'text',
  },
  isAnswered: true,
  isAnsweredRight: null as null | boolean,
  answer: null,
  counter: 0,
  lives: hearts,
  gameOver: false,
};

it('should handle startGame and set phraseNumber to 2', () => {
  expect(
    phrasesSlice.reducer(initialState, {
      type: 'phrases/startGame',
      startGame,
      payload: 2,
    }),
  ).toEqual(
    {
      ...initialState,
      phraseNumber: 2,
    },
  );
});

it('should handle sendAnswer', () => {
  expect(
    phrasesSlice.reducer(stateWithData, {
      type: 'phrases/sendAnswer',
      sendAnswer,
      payload: 12345,
    }),
  ).toEqual(
    {
      ...stateWithData,
      usersAnswer: 12345,
      isAnswered: true,
      isAnsweredRight: true,
      counter: 1,
      lives: hearts,
      gameOver: false,
    },
  );
});

it('should handle changePhrase', () => {
  expect(
    phrasesSlice.reducer(initialState, {
      type: 'phrases/changePhrase',
      changePhrase,
    }),
  ).toEqual(
    {
      ...initialState,
      usersAnswer: initialState.usersAnswer,
      list: initialState.list,
      phrase: initialState.phrase,
      isAnswered: initialState.isAnswered,
      isAnsweredRight: initialState.isAnsweredRight,
      phraseNumber: initialState.phraseNumber,
    },
  );
});

it('should handle startOver', () => {
  expect(
    phrasesSlice.reducer(stateWithData, {
      type: 'phrases/startOver',
      startOver,
    }),
  ).toEqual(initialState);
});
