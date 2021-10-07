import { FC, useState } from 'react';
import { Mode } from '../../data/interface';
import { BookDecorationQuizType, generateQuizs } from '../../quiz/book-decoration';
import { FillBlackQuiz } from '../fill-black-quiz';
import styles from '../fill-black-quiz/index.module.css';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

interface ExamProps {
    mode: Mode;
    backHome: () => void;
}

export const Exam: FC<ExamProps> = ({ mode, backHome }) => {
    const quizs = generateQuizs(mode);
    const [score, setScore] = useState<number>(0);
    const [index, setIndex] = useState<number>(0);
    const [inputAnswers, setInputAnswers] = useState<Record<number, string>>({});

    const activeQuiz = quizs[index];

    const addScore = () => {
        // NODE: 待补充不同题目计算方式
        setScore((oldScore) => oldScore + 10);
    }

    const setAnswers = (inputAnswer: string) => {
        setInputAnswers((oldAnswer) => ({
            ...oldAnswer,
            [index]: inputAnswer
        }))
    }

    const toPreQuiz = () => {
        setIndex((index) => index - 1);
    }

    const toNextQuiz = () => {
        setIndex((index) => index + 1);
    }

    const complete = () => {
        console.log(inputAnswers);
    }

    return (
        <>
            <h4 className={ styles.nav }>
                <Button className={ styles['nav-btn'] }
                        onClick={ backHome }
                        type="primary"
                        shape="circle"
                        icon={ <HomeOutlined/> }/>
                <span>{ index + 1 } / { quizs.length }</span>
            </h4>
            {
                activeQuiz.type === BookDecorationQuizType.FillBlack && (
                    <FillBlackQuiz quiz={ activeQuiz } index={ index } answer={ inputAnswers[index] || '' }
                                   setAnswers={ setAnswers }/>
                )
            }
            {
                <div className={ styles['button-container'] }>
                    {
                        index !== 0 && (
                            <>
                                <Button className="mr-1" type="primary" shape="round" onClick={ toPreQuiz }>上一题</Button>
                            </>
                        )
                    }
                    {
                        index !== quizs.length - 1 && (
                            <>
                                <Button type="primary" shape="round" onClick={ toNextQuiz }>下一题</Button>
                            </>
                        )
                    }
                    {
                        index === quizs.length - 1 && (
                            <>
                                <Button type="primary" shape="round" onClick={ complete }>提交</Button>
                            </>
                        )
                    }
                </div>
            }
        </>
    )
}
