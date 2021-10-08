import { Mode } from '../data/interface';
import { BookDecorationQuiz, BookDecorationQuizs, BookDecorationQuizType } from './book-decoration-quizs';
import { getMistakeQuizIds } from '../utils/storage';

export function generateQuizs(mode: Mode, selectedChapter: number | undefined): BookDecorationQuiz[] {
    let processedQuizs: BookDecorationQuiz[] = BookDecorationQuizs.map((quiz) => {
        quiz.desc = quiz.desc.replace(/\$/g, '_______');
        return quiz;
    })

    switch (mode) {
        case Mode.Chapter: {
            processedQuizs = processedQuizs.filter(({ chapter }) => chapter === selectedChapter);
            break;
        }
        case Mode.Random: {
            processedQuizs = shuffleQuizs(processedQuizs);
            break;
        }
        case Mode.Mistake: {
            processedQuizs = processedQuizs.filter(({ id }) => getMistakeQuizIds().includes(id));
        }
    }

    return processedQuizs;
}

function shuffleQuizs(processedQuizs: BookDecorationQuiz[]): BookDecorationQuiz[] {
    const quizs: BookDecorationQuiz[] = [];
    // 抽取 15 道填空题
    const fillBlackQuizs = processedQuizs.filter(({ type }) => type === BookDecorationQuizType.FillBlack).sort((a, b) => Math.random() > 0.5 ? a.id - b.id : b.id - a.id);
    quizs.push(...fillBlackQuizs.slice(0, 15));

    return quizs;
}
