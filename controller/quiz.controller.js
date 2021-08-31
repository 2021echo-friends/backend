import Quiz from "../models/quiz.js";
import mongoose from "mongoose";
import { ErrorFromObject } from "../lib/common.js";
import httpStatusCode from "http-status-codes";

export const getQuiz = async (len) => {
  const count = await Quiz.count();
  if (len > count) {
    throw new ErrorFromObject({
      data: {},
      error: "",
      errorDetails: "",
      message: "요청한 퀴즈 개수보다 저장된 퀴즈 개수가 부족합니다",
      httpCode: httpStatusCode.StatusCodes.BAD_REQUEST,
    });
  }
  const iter = new Array(Number(len)).fill(0);
  let idx = [];
  iter.map(() => {
    let is_there = true;
    let temp;
    while (is_there) {
      temp = Math.floor(Math.random() * count);
      if (idx.find((i) => i == temp) === undefined) {
        is_there = false;
      }
    }
    idx.push(temp);
  });
  let quizs = await Quiz.find({});
  return idx.map((i) => quizs[i]);
};
export const getQuizAdmin = async () => {
  return await Quiz.find({});
};
export const createQuiz = async ({
  picture_folder_id,
  question,
  answer,
  selections,
}) => {
  return await Quiz.create({
    /*picture_folder_id,*/
    question,
    answer,
    selections,
  });
};
