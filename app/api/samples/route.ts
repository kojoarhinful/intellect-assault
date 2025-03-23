export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type") || "bio"

  const samples = {
    bio: [
      {
        id: 1,
        question: "What is the powerhouse of the cell?",
        wrong_answer_1: "Nucleus",
        wrong_answer_2: "Endoplasmic reticulum",
        wrong_answer_3: "Golgi apparatus",
        correct_answer: "Mitochondria",
      },
      {
        id: 2,
        question: "Which of these is NOT a nucleotide base found in DNA?",
        wrong_answer_1: "Adenine",
        wrong_answer_2: "Guanine",
        wrong_answer_3: "Cytosine",
        correct_answer: "Uracil",
      },
      {
        id: 3,
        question: "What is the process by which plants convert light energy into chemical energy?",
        wrong_answer_1: "Cellular respiration",
        wrong_answer_2: "Fermentation",
        wrong_answer_3: "Glycolysis",
        correct_answer: "Photosynthesis",
      },
      {
        id: 4,
        question: "Which organelle is responsible for protein synthesis?",
        wrong_answer_1: "Lysosome",
        wrong_answer_2: "Vacuole",
        wrong_answer_3: "Peroxisome",
        correct_answer: "Ribosome",
      },
      {
        id: 5,
        question: "What type of cell division results in genetically identical daughter cells?",
        wrong_answer_1: "Meiosis",
        wrong_answer_2: "Binary fission",
        wrong_answer_3: "Budding",
        correct_answer: "Mitosis",
      },
      {
        id: 6,
        question: "Which of these is responsible for breaking down cellular waste?",
        wrong_answer_1: "Golgi apparatus",
        wrong_answer_2: "Mitochondria",
        wrong_answer_3: "Endoplasmic reticulum",
        correct_answer: "Lysosome",
      },
      {
        id: 7,
        question: "What is the primary function of the cell membrane?",
        wrong_answer_1: "Energy production",
        wrong_answer_2: "Protein synthesis",
        wrong_answer_3: "DNA storage",
        correct_answer: "Selective permeability",
      },
    ],
    math: [
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
    ],
  }

  return new Response(JSON.stringify(samples[type as keyof typeof samples] || samples.bio), {
    headers: { "Content-Type": "application/json" },
  })
}

