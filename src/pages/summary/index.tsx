import { FinishData, Mode } from '../../data/interface';
import { FC } from 'react';
import { Button, message, Progress } from 'antd';
import styles from './index.module.css';
import { deleteMistakeQuizs } from '../../utils/storage';

interface SummaryProps {
    finishData: FinishData;
    backHome: () => void;
    mode: Mode;
}

export const Summary: FC<SummaryProps> = ({ finishData, backHome, mode }) => {
    const { wrongQuizs, correctRate, correctRateHint } = finishData;

    return (
        <>
            <h3>{ wrongQuizs.length ? '还有一些错，需要继续加油呀 ~！' : '全对啦，我们家瑶真棒！' }</h3>
            <Progress className="mt-2" percent={ correctRate } format={ () => correctRateHint } type="circle"/>

            {
                !!wrongQuizs.length && (
                    <h3 className="mt-2" style={ { textAlign: 'left' } }>错误题目：</h3>
                )
            }
            <div className={ styles['card-container'] }>
                {
                    wrongQuizs.map(({ desc, answer }) => (
                        <WrongQuizCard key={ desc } desc={ desc } answer={ answer }/>
                    ))
                }
            </div>
            <div className="mt-2">
                {
                    mode === Mode.Mistake && (
                        <Button className="mr-2"
                                onClick={ () => {
                                    deleteMistakeQuizs();
                                    message.info('错题已清空', 2);
                                } }
                                type="primary"
                                shape="round">清空错题</Button>
                    )
                }
                <Button onClick={ backHome } type="primary" shape="round">返回主页</Button>
            </div>
        </>
    )
}


interface WrongQuizCardProps {
    desc: string;
    answer: string | string[];
}

const WrongQuizCard: FC<WrongQuizCardProps> = ({ desc, answer }) => {
    let count = 0;
    const highLightHtml = desc.replace(/_______/g, () => {
        if (typeof answer === 'string') {
            return `<span style="color: red; text-decoration: underline">${ answer }</span>`;
        } else {
            count++;
            return `<span style="color: red; text-decoration: underline">${ answer[count - 1] }</span>`;
        }
    })

    return (
        <div className={ styles.card } dangerouslySetInnerHTML={ { __html: highLightHtml } }></div>
    )
}
