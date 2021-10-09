import { Button, Collapse, Popover } from 'antd';
import { HomeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import CollapsePanel from 'antd/es/collapse/CollapsePanel';
import TextArea from 'antd/es/input/TextArea';
import { FC, useEffect, useRef, useState } from 'react';
import { getShuffleNouns, Noun } from '../../quiz/nouns';

interface NounsExplainProps {
    backHome: () => void;
}

export const NounsExplain: FC<NounsExplainProps> = ({ backHome }) => {
    const [index, setIndex] = useState<number>(0);
    const [activeNoun, setActiveNoun] = useState<Noun>();
    const [index2Answer, setIndex2Answer] = useState<Record<number, string>>({});
    const [activeKey, setActiveKey] = useState<string>();
    const nounsRef = useRef<Noun[]>(getShuffleNouns());

    useEffect(() => {
        setActiveNoun(nounsRef.current[index]);
    }, [nounsRef.current, index])

    const toPreNoun = () => {
        setActiveKey(undefined);
        setIndex((oldIndex) => oldIndex - 1);
    }

    const toNextNoun = () => {
        setActiveKey(undefined);
        setIndex((oldIndex) => oldIndex + 1);
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
                    ) : (<div/>)
                }
                <h2 className={ styles['header-word'] }>
                    <Popover content={ <NounsSelector nouns={ nounsRef.current }
                                                      index={ index }
                                                      setIndex={ setIndex }/> }
                             trigger="click">
                        <span>名词解释</span>
                    </Popover>

                    <Button className="ml-2"
                            onClick={ backHome }
                            type="primary"
                            shape="circle"
                            icon={ <HomeOutlined/> }/>
                </h2>
                {
                    index !== nounsRef.current.length - 1 ? (
                        <Button onClick={ toNextNoun }
                                type="primary"
                                shape="circle"
                                icon={ <RightOutlined/> }/>
                    ) : (<div/>)
                }
            </div>

            {
                activeNoun && (
                    <div className={ styles.content }>
                        <h3>名词：</h3>
                        <Collapse activeKey={ activeKey } onChange={ (key) => {
                            setActiveKey(key as string);
                        } }>
                            <CollapsePanel key={ 1 } header={ activeNoun.title }>
                                { activeNoun.explanation }
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

interface NounsSelectorProps {
    setIndex: (index: number) => void;
    nouns: Noun[];
    index: number;
}

const NounsSelector: FC<NounsSelectorProps> = ({ nouns, setIndex, index }) => {
    return (
        <div className={ styles['nouns-selector-container'] }>
            {
                nouns.map(({ title }, idx) => (
                    <Button type={ idx === index ? 'primary' : 'default' }
                            shape="round"
                            onClick={ () => {
                                setIndex(idx);
                            } }
                            key={ title }>{ title }</Button>
                ))
            }
        </div>
    )
}
