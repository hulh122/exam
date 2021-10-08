import { FC, useEffect, useRef, useState } from 'react';
import { FinishData, Mode } from '../../data/interface';
import {
    generateQuizs
} from '../../quiz/book-decoration';
import styles from '../fill-black-quiz/index.module.css';
import { Button, message, Popover } from 'antd';
import classNames from 'classnames';
import { HomeOutlined } from '@ant-design/icons';
import { FillBlackQuiz } from '../fill-black-quiz';
import { BookDecorationQuiz, BookDecorationQuizs, BookDecorationQuizType } from '../../quiz/book-decoration-quizs';

interface ExamProps {
    mode: Mode;
    backHome: () => void;
    finishExam: (finishData: FinishData) => void;
}

export const Exam: FC<ExamProps> = ({ mode, backHome, finishExam }) => {
    const [selectedChapter, setSelectedChapter] = useState<number>();
    const [index, setIndex] = useState<number>(0);
    const [inputAnswers, setInputAnswers] = useState<Record<number, string>>({});
    const [activeQuiz, setActiveQuiz] = useState<BookDecorationQuiz>();

    // 去重后的章节
    const chapterList = Array.from(new Set(BookDecorationQuizs.map(({ chapter }) => chapter)));

    let quizsRef = useRef<BookDecorationQuiz[]>([]);

    useEffect(() => {
        quizsRef.current = generateQuizs(mode, selectedChapter);
    }, [selectedChapter]);

    useEffect(() => {
        setActiveQuiz(quizsRef.current[index]);
    }, [quizsRef.current, index])

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
        if (quizsRef.current.every((_, index) => !!inputAnswers[index])) {
            // 全部题目都答完了, 总结题目
            const wrongQuizs = quizsRef.current.filter(({ answer }, index) => {
                if (typeof answer === 'string') {
                    return inputAnswers[index] !== answer;
                }
                return inputAnswers[index] !== answer.join(',');
            })
            const correctRate = Math.floor(100 * (quizsRef.current.length - wrongQuizs.length) / quizsRef.current.length);
            const correctRateHint = `${ quizsRef.current.length - wrongQuizs.length } / ${ quizsRef.current.length }`;
            finishExam({
                wrongQuizs,
                correctRate,
                correctRateHint
            });
        } else {
            message.error('还有题没答完呢~', 2).then();
        }
    }

    return mode === Mode.Chapter && selectedChapter === undefined ? (
        <div className={ styles['chapter-select-container'] }>
            {
                chapterList.map((chapter) => (
                    <Button className={ styles['chapter-select-btn'] }
                            onClick={ () => {
                                setSelectedChapter(chapter)
                            } }
                            type="primary"
                            key={ chapter }
                            shape="round">第 { chapter + 1 } 章节</Button>
                ))
            }
        </div>
    ) : (
        activeQuiz ? (
            <>
                <h4 className={ styles.nav }>
                    <Button className={ styles['nav-btn'] }
                            onClick={ () => {
                                setSelectedChapter(undefined);
                                backHome();
                            } }
                            type="primary"
                            shape="circle"
                            icon={ <HomeOutlined/> }/>

                    <Popover
                        content={ <QuizsSelector length={ quizsRef.current.length } answers={ inputAnswers }
                                                 setIndex={ setIndex }/> }
                        trigger="click">
                        <span>{ index + 1 } / { quizsRef.current.length }</span>
                    </Popover>
                </h4>
                {
                    activeQuiz.type === BookDecorationQuizType.FillBlack && (
                        <FillBlackQuiz quiz={ activeQuiz }
                                       index={ index }
                                       answer={ inputAnswers[index] || '' }
                                       setAnswers={ setAnswers }/>
                    )
                }
                {
                    <div className={ styles['button-container'] }>
                        {
                            index !== 0 && (
                                <>
                                    <Button className="mr-2" type="primary" shape="round"
                                            onClick={ toPreQuiz }>上一题</Button>
                                </>
                            )
                        }
                        {
                            index !== quizsRef.current.length - 1 && (
                                <>
                                    <Button type="primary" shape="round" onClick={ toNextQuiz }>下一题</Button>
                                </>
                            )
                        }
                        {
                            index === quizsRef.current.length - 1 && (
                                <>
                                    <Button type="primary" shape="round" onClick={ complete }>提交</Button>
                                </>
                            )
                        }
                    </div>
                }
            </>
        ) : null
    )
}

interface QuizsSelectorProps {
    length: number;
    answers: Record<number, string>;
    setIndex: (index: number) => void;
}

const QuizsSelector: FC<QuizsSelectorProps> = ({ length, answers, setIndex }) => {
    const list = Array(length).fill(null).map((_, index) => +index);

    return (
        <div className={ styles['selector-container'] }>
            { list.map((index) => (
                <div
                    className={ classNames(styles['selector-box'], !!answers[index] && styles['selector-box-finished']) }
                    onClick={ () => {
                        setIndex(index);
                    } }
                    key={ index }>{ index + 1 }</div>
            )) }
        </div>
    )
}
