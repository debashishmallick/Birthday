export type QuizQuestion = {
  id: string
  prompt: string
  photoIndex: number
  options: string[]
  correctIndex: number
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'Which memory was this?',
    photoIndex: 0,
    options: ['Our first proper outing', 'A random coffee run', 'A festival night'],
    correctIndex: 1,
  },
  {
    id: 'q2',
    prompt: 'Which place was this picture taken?',
    photoIndex: 1,
    options: ['By the water', 'At home', 'On a long drive'],
    correctIndex: 2,
  },
  {
    id: 'q3',
    prompt: 'Which moment came first?',
    photoIndex: 2,
    options: ['This photo', 'The trip we still talk about', 'The lazy Sunday'],
    correctIndex: 2,
  },
  {
    id: 'q4',
    prompt: 'What was the vibe this day?',
    photoIndex: 0,
    options: ['Chaotic fun', 'Soft and calm', 'Fully formal'],
    correctIndex: 0,
  },
]

export const quizCompleteMessage = 'You know these memories pretty well :)'
