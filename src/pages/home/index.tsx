import styles from './index.module.css'
import { useState } from 'react';
import { Exam } from '../exam';
import { FinishData, Mode, Status } from '../../data/interface';
import { Button, message } from 'antd';
import { Summary } from '../summary';
import { getMistakeQuizIds, setMistakeQuizs } from '../../utils/storage';
import { NounsExplain } from '../nouns-explain';
import { ShortAnswerQuiz } from '../short-answer-quiz';

export const Home = () => {
    const [status, setStatus] = useState<Status>(Status.Home);
    const [mode, setMode] = useState<Mode>();
    const [finishData, setFinishData] = useState<FinishData>();

    const start = (mode: Mode) => {
        setMode(mode);
        setStatus(Status.Exam);
    }

    const backHome = () => {
        setStatus(Status.Home);
    }

    const finishExam = (finishData: FinishData) => {
        setMistakeQuizs(finishData.wrongQuizs.map(({ id }) => id));
        setFinishData(finishData);
        setStatus(Status.Summary);
    }

    const handleMistakeBtn = () => {
        if (getMistakeQuizIds().length) {
            start(Mode.Mistake);
        } else {
            message.warn('没有错题哦', 2);
        }
    }

    return (
        <div className={ styles.home }>
            {
                status === Status.Home && (
                    <>
                        <h2>马上升本了！</h2>

                        <h3>考试时间：4/*</h3>

                        <div className={ styles['button-container'] }>
                            <Button type="primary"
                                    shape="round"
                                    onClick={ () => {
                                        start(Mode.Random)
                                    } }>随机练习
                            </Button>
                            <Button type="primary"
                                    shape="round"
                                    onClick={ handleMistakeBtn }>错题巩固
                            </Button>
                            <Button type="primary"
                                    shape="round"
                                    onClick={ () => {
                                        setStatus(Status.NounsExplain)
                                    } }>名词解释
                            </Button>
                            <Button type="primary"
                                    shape="round"
                                    onClick={ () => {
                                        setStatus(Status.ShortAnswer)
                                    } }>简答题
                            </Button>
                        </div>
                    </>
                )
            }

            {
                status === Status.Exam && (
                    <Exam mode={ mode! } backHome={ backHome } finishExam={ finishExam }/>
                )
            }

            {
                status === Status.NounsExplain && (
                    <NounsExplain backHome={ backHome }/>
                )
            }

            {
                status === Status.ShortAnswer && (
                    <ShortAnswerQuiz backHome={ backHome }/>
                )
            }

            {
                status === Status.Summary && (
                    <Summary finishData={ finishData! } backHome={ backHome } mode={ mode! }/>
                )
            }
        </div>
    )
}
