export function setMistakeQuizs(ids: number[]): void {
    const mistakeQuizIds = JSON.parse(localStorage.getItem('mistakeQuizIds') || '[]');
    localStorage.setItem('mistakeQuizIds', JSON.stringify(Array.from(new Set(mistakeQuizIds.concat(ids)))));
}

export function getMistakeQuizIds(): number[] {
    const mistakeQuizIds = JSON.parse(localStorage.getItem('mistakeQuizIds') || '[]');
    return mistakeQuizIds;
}

export function deleteMistakeQuizs(): void {
    localStorage.setItem('mistakeQuizIds', '[]');
}
