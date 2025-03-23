import { getPool } from "./db";

export type QuizQuestion = {
  question: string;
  wrong_answer_1: string;
  wrong_answer_2: string;
  wrong_answer_3: string;
  correct_answer: string;
};

export async function saveQuiz(questions: QuizQuestion[]): Promise<number> {
  const pool = await getPool();
  const { rows } = await pool.query("SELECT COUNT(*) FROM quiz");
  const groupId = Number.parseInt(rows[0].count);

  for (const question of questions) {
    await pool.query(
      "INSERT INTO quiz (group_id, question, wrong_answer_1, wrong_answer_2, wrong_answer_3, correct_answer) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        groupId,
        question.question,
        question.wrong_answer_1,
        question.wrong_answer_2,
        question.wrong_answer_3,
        question.correct_answer,
      ]
    );
  }
  return groupId;
}

export async function getQuizByGroupId(groupId: number) {
  const pool = await getPool();
  const { rows } = await pool.query("SELECT * FROM quiz WHERE group_id = $1 ORDER BY id ASC", [groupId]);
  return rows;
}

export async function getQuizzes() {
  const pool = await getPool();
  const result = await pool.query("SELECT * FROM quiz ORDER BY group_id DESC, id ASC LIMIT 1");

  if (result.rows.length === 0) {
    return [];
  }

  const latestGroupId = result.rows[0].group_id;
  const { rows } = await pool.query("SELECT * FROM quiz WHERE group_id = $1 ORDER BY id ASC", [latestGroupId]);
  return rows;
}
