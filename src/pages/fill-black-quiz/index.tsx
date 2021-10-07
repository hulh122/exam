import { BookDecorationQuiz } from '../../quiz/book-decoration';
import { FC, useState } from 'react';
import styles from './index.module.css';
import { Input } from 'antd';

interface FillBlackQuizProps {
    quiz: BookDecorationQuiz;
    index: number;
    answer: string;
    setAnswers: (answer: string) => void;
}

export const FillBlackQuiz: FC<FillBlackQuizProps> = ({ quiz, index, answer, setAnswers }) => {
    const { desc, chapter } = quiz;

    return (
        <div className={ styles['quiz-container'] }>
            <h3>填空题</h3>

            <h4>{ index + 1 }. { desc }（来自第 { chapter + 1 } 章节）</h4>

            <h4 style={ { marginTop: '10vw' } }>
                答案：
                <Input value={ answer }
                       onChange={ (e) => {
                           setAnswers(e.target.value);
                       } }/>
            </h4>
        </div>
    )
}
