import { BookDecorationQuiz } from '../quiz/book-decoration-quizs';

export enum Status {
    Home,
    Exam,
    Summary
}

export enum Mode {
    Chapter,
    Random,
    Mistake
}

export interface FinishData {
    wrongQuizs: BookDecorationQuiz[];
    correctRate: number;
    correctRateHint: string;
}
