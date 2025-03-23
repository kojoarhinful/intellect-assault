export async function GET() {
  const questions = [
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
  ]

  return new Response(JSON.stringify(questions), {
    headers: { "Content-Type": "application/json" },
  })
}

