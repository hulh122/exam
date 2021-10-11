import { FC, useEffect, useRef, useState } from 'react';
import styles from '../nouns-explain/index.module.css';
import { Button, Collapse, Popover } from 'antd';
import { HomeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';
import TextArea from 'antd/es/input/TextArea';
import { getShuffleShortAnswers, ShortAnswer } from '../../quiz/short-answer';

interface ShortAnswerProps {
    backHome: () => void;
}

export const ShortAnswerQuiz: FC<ShortAnswerProps> = ({ backHome }) => {
    const [index, setIndex] = useState<number>(0);
    const [activeShortAnswer, setActiveShortAnswer] = useState<ShortAnswer>();
    const [index2Answer, setIndex2Answer] = useState<Record<number, string>>({});
    const [activeKey, setActiveKey] = useState<string>();
    const shortAnswersRef = useRef<ShortAnswer[]>([]);

    useEffect(() => {
        shortAnswersRef.current = getShuffleShortAnswers();
    }, []);

    useEffect(() => {
        setActiveShortAnswer(shortAnswersRef.current[index]);
    }, [shortAnswersRef.current, index])

    const toPreNoun = () => {
        setActiveKey(undefined);
        setIndex((oldIndex) => oldIndex - 1);
    }

    const toNextNoun = () => {
        setActiveKey(undefined);
        setIndex((oldIndex) => oldIndex + 1);
    }

    const getAnswerDisplay = (answers: string[]): string => {
        return answers.map((answer, index) => `${ index + 1 }. ${ answer }`).join('<br>')
    }

    return (
        <div>
            <div className={ styles.header }>
                {
                    index !== 0 ? (
                        <Button onClick={ toPreNoun }
                                type="primary"
                                shape="circle"
                                icon={ <LeftOutlined/> }/>
                    ) : (<div className={ styles.block }/>)
                }
                <h2 className={ styles['header-word'] }>
                    <Popover content={ <ShortAnswerSelector shortAnswers={ shortAnswersRef.current } index={ index }
                                                            setIndex={ setIndex }/> }
                             trigger="click">
                        <span>简答题</span>
                    </Popover>

                    <Button className="ml-2"
                            onClick={ backHome }
                            type="primary"
                            shape="circle"
                            icon={ <HomeOutlined/> }/>
                </h2>
                {
                    index !== shortAnswersRef.current.length - 1 ? (
                        <Button onClick={ toNextNoun }
                                type="primary"
                                shape="circle"
                                icon={ <RightOutlined/> }/>
                    ) : (<div className={ styles.block }/>)
                }
            </div>

            {
                activeShortAnswer && (
                    <div className={ styles.content }>
                        <h3>题目：</h3>
                        <Collapse activeKey={ activeKey } onChange={ (key) => {
                            setActiveKey(key as string);
                        } }>
                            <CollapsePanel key={ 1 } header={ activeShortAnswer.desc }>
                                <div
                                    dangerouslySetInnerHTML={ { __html: getAnswerDisplay(activeShortAnswer.answers) } }></div>
                            </CollapsePanel>
                        </Collapse>

                        <h3 className="mt-5">答案：</h3>
                        <TextArea value={ index2Answer[index] || '' }
                                  onChange={ (e) => {
                                      setIndex2Answer((oldIndex2Answer) => ({
                                          ...oldIndex2Answer,
                                          [index]: e.target.value
                                      }))
                                  } }
                                  rows={ 8 }/>
                    </div>
                )
            }
        </div>
    )
}

interface ShortAnswerSelectorProps {
    shortAnswers: ShortAnswer[];
    index: number;
    setIndex: (index: number) => void;
}

const ShortAnswerSelector: FC<ShortAnswerSelectorProps> = ({ shortAnswers, index, setIndex }) => {
    return (
        <div className={ styles['short-answer-selector-container'] }>
            {
                shortAnswers.map(({ desc }, idx) => (
                    <Button className={ styles['short-answer-btn'] }
                            type={ idx === index ? 'primary' : 'default' }
                            shape="round"
                            onClick={ () => {
                                setIndex(idx)
                            } }
                            key={ desc }>{ desc }</Button>
                ))
            }
        </div>
    )
}
