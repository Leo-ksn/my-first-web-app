import express from "express";
import path from "path";
import { readFile, writeFile } from "fs/promises";

export const app = express();

const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// /api/flashcards に GETリクエストが来たら "flashcards.json" の内容を返す
app.get("/api/flashcards", async (req, res) => {
  const data = await readFile(
    path.join(__dirname, "data", "flashcards.json"),
    "utf-8"
  );
  res.json(JSON.parse(data));
});

// /api/flashcards に POSTリクエストが来たら "flashcards.json" に追加し、追加したデータを返す
app.post("/api/flashcards", async (req, res) => {
  const filePath = path.join(__dirname, "data", "flashcards.json");
  const raw = await readFile(filePath, "utf-8");
  const list = JSON.parse(raw);

  // リクエストボディ
  const newWord = req.body || {};
  if (!newWord.id) newWord.id = Date.now();

  // 追加
  const toSave = {
    id: newWord.id,
    word: newWord.word,
    meaning: newWord.meaning,
  };
  list.push(toSave);

  // 書き込み
  await writeFile(filePath, JSON.stringify(list, null, 2), "utf-8");

  // 成功レスポンス
  return res.status(201).json(toSave);
});
