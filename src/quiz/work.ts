import * as fs from 'fs';
import * as path from 'path'

const text = fs.readFileSync(path.resolve('src/quiz/text.txt'), { encoding: 'utf-8' })

const group: any[] = [];
let index = -1

text.split('\n').forEach((line) => {
    if (/\d/.test(line[0])) {
        index++
        group.push({
            desc: line.replace(/\d+、/, ''),
            answers: []
        })
    } else if (!!line) {
        group[index].answers.push(line.trim().slice(1).replace(/[。；]$/, ''))
    }
})

console.log(group)

