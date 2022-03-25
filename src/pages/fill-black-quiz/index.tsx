import { FC } from 'react';
import styles from './index.module.css';
import { Input } from 'antd';
import { BookDecorationQuiz } from '../../quiz/book-decoration-quizs';

interface FillBlackQuizProps {
    quiz: BookDecorationQuiz;
    index: number;
    answer: string;
    setAnswers: (answer: string) => void;
}

export const FillBlackQuiz: FC<FillBlackQuizProps> = ({ quiz, index, answer, setAnswers }) => {
    const { desc } = quiz;

    return (
        <div className={ styles['quiz-container'] }>
            <h3>填空题</h3>

            <h4 style={ { marginTop: '10vw' } }>{ index + 1 }. { desc }</h4>

            <h4 style={ { marginTop: '10vw' } }>
                答案：
                <Input value={ answer }
                       className={styles['answer-input']}
                       onChange={ (e) => {
                           setAnswers(e.target.value);
                       } }/>
            </h4>
        </div>
    )
}
