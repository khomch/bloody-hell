export type TPhrase = {
  author: string;
  current_vote: string;
  defid: number;
  definition: string;
  example: string;
  permalink: string;
  thumbs_down: number;
  thumbs_up: number;
  word: string;
  written_on: string
};

export type TAnswer = {
  word: string;
  id: number;
};

export type TQuestion = {
  definition: string;
};

export type TPhrasesState = {
  start: boolean,
  loading: boolean,
  list: [],
  phraseNumber: number,
  usersAnswer: null | number,
  phrase: null | TPhrase,
  isAnswered: boolean,
  isAnsweredRight: null | boolean,
  answer: any,
  counter: number,
  lives: string[],
  gameOver: boolean,
};
