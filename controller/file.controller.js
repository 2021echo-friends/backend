import Folder from "../models/folder.js";
import File from "../models/file.js";
import mongoose from "mongoose";
import { ErrorFromObject } from "../lib/common.js";
import httpStatusCode from "http-status-codes";

export const createFile = async ({ folder_id, idx, name, session }) => {
  const name_str = String(name);
  const index = name_str.indexOf(".");
  if (index == -1) {
    throw new ErrorFromObject({
      data: {},
      error: "",
      errorDetails: "",
      message: "파일 확장자가 없습니다",
      httpCode: httpStatusCode.StatusCodes.BAD_REQUEST,
    });
  }
  const extension = name_str.substring(index);
  return await File.create([{ folder_id, idx, extension }], { session });
};
export const createFolder = async ({ counts, description, session }) => {
  return await Folder.create([{ counts, description }], { session });
};
export const getFile = async ({ folder_id, idx }) => {
  return await File.findOne({ folder_id, idx });
};
