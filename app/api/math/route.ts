export async function GET() {
  const questions = [
    {
      id: 1,
      question: "What is 7 x 8?",
      wrong_answer_1: "54",
      wrong_answer_2: "57",
      wrong_answer_3: "58",
      correct_answer: "56",
    },
    {
      id: 2,
      question: "What is the square root of 144?",
      wrong_answer_1: "10",
      wrong_answer_2: "11",
      wrong_answer_3: "14",
      correct_answer: "12",
    },
    {
      id: 3,
      question: "What is 15% of 200?",
      wrong_answer_1: "25",
      wrong_answer_2: "35",
      wrong_answer_3: "40",
      correct_answer: "30",
    },
    {
      id: 4,
      question: "What is 13 + 28?",
      wrong_answer_1: "39",
      wrong_answer_2: "40",
      wrong_answer_3: "42",
      correct_answer: "41",
    },
    {
      id: 5,
      question: "What is 72 ÷ 9?",
      wrong_answer_1: "6",
      wrong_answer_2: "7",
      wrong_answer_3: "9",
      correct_answer: "8",
    },
    {
      id: 6,
      question: "What is 17 x 4?",
      wrong_answer_1: "66",
      wrong_answer_2: "69",
      wrong_answer_3: "71",
      correct_answer: "68",
    },
    {
      id: 7,
      question: "What is 125 ÷ 5?",
      wrong_answer_1: "23",
      wrong_answer_2: "24",
      wrong_answer_3: "26",
      correct_answer: "25",
    },
  ]

  return new Response(JSON.stringify(questions), {
    headers: { "Content-Type": "application/json" },
  })
}

