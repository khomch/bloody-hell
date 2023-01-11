import React, { useEffect, useRef, useState } from 'react';
import Answer from '../../components/Answer';
import { TPhrase, TPhrasesList } from '../../types/types';
import styles from '../../components/Answer/Answer.module.sass';
import phrasesAPI from '../../api/phrasesAPI';
import getRandomNumber from '../../utils/getRandomNumber';
import Question from '../../components/Question';

export default function MainPage() {
  const renderAfterCalled = useRef(false);
  const phrasesQty = 4;

  const [phrases, setPhrases] = useState<TPhrasesList>({ list: [] });
  const [randomPhrase, setRandomPhrase] = useState<number>(0);
  const phrasesToRender: TPhrase[] = phrases.list.slice(0, phrasesQty);

  const handleAnswerClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const clickedPhrase = (phrasesToRender.find((el) => el.word === target.innerText));

    console.log(clickedPhrase && clickedPhrase.defid === phrasesToRender[randomPhrase].defid);
  };

  useEffect(() => {
    if (!renderAfterCalled.current) {
      phrasesAPI.then((res) => setPhrases(res));
    }
    setRandomPhrase(getRandomNumber(phrasesQty));

    renderAfterCalled.current = true;
  }, [phrasesToRender, phrases.list, renderAfterCalled]);

  return (
    <div>
      {
        phrasesToRender.length > 0
          ? (
            <div className={styles.phrase}>

              <Question definition={phrasesToRender[randomPhrase].definition} />

              <br />
              {phrasesToRender.map((phrase: TPhrase) => (
                <Answer
                  onClick={handleAnswerClick}
                  word={phrase.word}
                  definition={phrase.definition}
                  key={phrase.defid}
                  id={phrase.defid}
                  rightAnswer={phrasesToRender[randomPhrase].defid}
                />
              ))}
            </div>
          )
          : '...loading...'
      }
    </div>
  );
}
