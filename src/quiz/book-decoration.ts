import { Mode } from '../data/interface';

export interface BookDecorationQuiz {
    chapter: number;
    desc: string;
    answer: string | string[];
    type: BookDecorationQuizType;
}

export enum BookDecorationQuizType {
    FillBlack
}

export const BookDecorationQuizs: BookDecorationQuiz[] = [
    ...[
        {
            desc: '格式塔心理学认为在日常生活中，人们的头脑不断地组成$。',
            answer: '整体的形'
        },
        {
            desc: '书籍的价值最后才能得以实现是需要通过$。',
            answer: '市场行为'
        },
        {
            desc: '卷轴装的书中，轴是用以$。',
            answer: '旋转书卷的'
        },
        {
            desc: '用皮绳编的简策装叫$。',
            answer: '韦编'
        },
        {
            desc: '人眼的视觉范围水平视角，单眼为$。',
            answer: '128～148°'
        },
        {
            desc: '竹片做成的书称作$。',
            answer: '简策'
        },
        {
            desc: '书籍设计中一般是把书名作为$。',
            answer: '近景'
        },
        {
            desc: '帛书收藏时按$从左到右$。',
            answer: ['中心棒', '卷成一束']
        },
        {
            desc: '对儿童来说，他们的构图方式是$。',
            answer: '平列式的'
        },
        {
            desc: '概念书籍可以脱离书籍模式的约束，甚至彻底脱离$。',
            answer: '纸张'
        },
        {
            desc: '期刊每期封面上都必须固定下来的有$、设计风格$。',
            answer: ['字体', '色彩']
        },
        {
            desc: '既是书籍的立体部分，也是读者视觉接触时间最长的是$。',
            answer: '正文'
        },
        {
            desc: '春秋战国时期，石鼓文字继承了西周$。',
            answer: '金文的特点'
        },
        {
            desc: '杂志的志指记载的文字或文字$。',
            answer: '记事'
        },
    ].map((item) => ({ ...item, chapter: 0, type: BookDecorationQuizType.FillBlack }))
]

export function generateQuizs(mode: Mode): BookDecorationQuiz[] {
    const processedQuizs: BookDecorationQuiz[] = BookDecorationQuizs.map((quiz) => {
        quiz.desc = quiz.desc.replace(/\$/g, '_______');
        return quiz;
    })

    return processedQuizs;
}
