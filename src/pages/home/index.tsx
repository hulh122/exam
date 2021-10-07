import styles from './index.module.css'
import { useState } from 'react';
import { Exam } from '../exam';
import { Mode, Status } from '../../data/interface';
import { Button } from 'antd';

export const Home = () => {
    const [status, setStatus] = useState<Status>(Status.Home);
    const [mode, setMode] = useState<Mode>();

    const start = (mode: Mode) => {
        setMode(mode);
        setStatus(Status.Exam);
    }

    const backHome = () => {
        setStatus(Status.Home);
    }

    return (
        <div className={ styles.home }>
            {
                status === Status.Home && (
                    <>
                        <h2>瑶瑶一定能过！</h2>

                        <div className={ styles['button-container'] }>
                            <Button type="primary"
                                    shape="round"
                                    onClick={ () => {
                                        start(Mode.Chapter)
                                    } }>章节练习
                            </Button>
                            <Button type="primary"
                                    shape="round"
                                    onClick={ () => {
                                        start(Mode.Sequence)
                                    } }>顺序练习
                            </Button>
                            <Button type="primary"
                                    shape="round"
                                    onClick={ () => {
                                        start(Mode.Random)
                                    } }>随机练习
                            </Button>
                        </div>
                    </>
                )
            }

            {
                status === Status.Exam && (
                    <Exam mode={ mode! } backHome={backHome}/>
                )
            }
        </div>
    )
}
