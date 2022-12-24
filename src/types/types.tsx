import React  from 'react';

export type TPhrasesList = {
  list: TPhrase[]
};

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
  split(s: string): any;
};

export type TAnswer = {
  word: string;
  definition: string;
  onClick: (e: React.MouseEvent)=> void;
};

export type TQuestion = {
  definition: string;
};

