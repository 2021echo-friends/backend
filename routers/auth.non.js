// 회원 가입 (일반, 관리자)
// 로그인 - 토큰 발급
// 홈페이지에 들어갈 통계
// 홈페이지의 행사 안내
import { Router } from "express";
import httpStatusCode, { StatusCodes } from "http-status-codes";
import { createUser, getToken } from "../controller/user.contoller.js";
import {
  ErrorFromObject,
  errorHandler,
  inputHandler,
  responseHandler,
} from "../lib/common.js";
import multer from "multer";
import {
  createFile,
  createFolder,
  getFile,
} from "../controller/file.controller.js";
import mongoose from "mongoose";
import fs from "fs";
import { getEcoEffect } from "../controller/statistics.controller.js";
import { getPost } from "../controller/post.controller.js";
import { getUser } from "../controller/user.contoller.js";
import axios from "axios";
import { USER_TYPE } from "../lib/enums.js";

const router = Router();
router.post(
  "/login",
  inputHandler({}),
  responseHandler(async (req) => {
    const { email, password } = req.body;
    console.log(req.body);
    const token = await getToken(email, password);
    if (token) {
    } else {
      throw new ErrorFromObject({
        httpCode: httpStatusCode.StatusCodes.BAD_REQUEST,
        error: "failed get token",
      });
    }
    return { token };
  })
);
router.post(
  "/join",
  inputHandler({}),
  responseHandler(async (req) => {
    const { email, password, user_type, thumbnail_image_url, nickname } =
      req.body;
    console.log("body ", req.body);
    const user = await createUser(
      email,
      password,
      user_type,
      thumbnail_image_url,
      nickname
    );

    return user;
  })
);

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "files/");
    },
    filename: async function (req, file, cb) {
      const my_file = (
        await createFile({
          folder_id: req.folder_id,
          name: file.originalname,
          idx: req.idx,
          session: req.session,
        })
      )[0];

      console.log(file.originalname);
      cb(null, my_file._id + my_file.extension);
      req.idx++;
    },
  }),
});
router.get(
  "/file",
  inputHandler({}),
  errorHandler(async (req, res) => {
    const { folder_id, idx } = req.query;
    const file = await getFile({ folder_id, idx });
    // res.setHeader("content-type",)
    const stream = fs.createReadStream("files/" + file._id + file.extension);
    stream.on("open", () => stream.pipe(res));
    stream.on("error", (err) => {
      throw new ErrorFromObject({
        httpCode: httpStatusCode.StatusCodes.BAD_REQUEST,
        error: err.toString(),
      });
    });
  })
);
router.post(
  "/file",
  inputHandler({}),
  async (req, res, next) => {
    req.session = await mongoose.startSession();
    req.idx = 0;

    const { counts, description } = req.query;
    req.folder_id = (
      await createFolder({ counts, description, session: req.session })
    )[0]._id;
    next();
  },
  inputHandler({}),
  upload.array("files"),
  responseHandler(async (req) => {
    console.log(req.files);
    return { folder_id: req.folder_id, counts: req.query.counts };
  })
);
router.get(
  "/statistics",
  inputHandler({}),
  responseHandler(async (req) => {
    const eco_effects = await getEcoEffect();
    let co2 = 0,
      o3 = 0,
      ch4 = 0;
    console.log(eco_effects);
    eco_effects.map((e) => {
      co2 += e.sum_effect_co2;
      o3 += e.sum_effect_o3;
      ch4 += e.sum_effect_ch4;
    });
    return { co2, o3, ch4 };
  })
);
router.get(
  "/post",
  inputHandler({}),
  responseHandler(async (req) => {
    const { cursor, per_page } = req.query;
    return getPost({ cursor, per_page });
  })
);
router.get(
  "/test",
  inputHandler({}),
  responseHandler(async (req) => {
    const { access_token } = req.query;

    const result = await axios({
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(result.data);
    return result.data;
  })
);
router.post(
  "/kakao_login",
  inputHandler({}),
  responseHandler(async (req) => {
    const { access_token } = req.query;

    const result = await axios({
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (result.data.id == false) {
      throw new ErrorFromObject({
        httpCode: StatusCodes.BAD_REQUEST,
        message:
          "kakao로 부터 유저 정보를 받아올수없습니다. 잘못된 kakao access token 인 것 같습니다.",
      });
    }
    console.log("dd ", result.data);
    const email = result.data.kakao_account.email;
    const thumbnail_image_url =
      result.data.kakao_account.profile.thumbnail_image_url;
    const nickname = result.data.kakao_account.profile.nickname;
    const kakao_user = await getUser(email);
    if ((kakao_user == null) | !kakao_user) {
      await createUser(
        email,
        "1234",
        USER_TYPE.CLIENT,
        thumbnail_image_url,
        nickname
      );
    }

    const token = await getToken(email, "1234");
    if (token) {
    } else {
      throw new ErrorFromObject({
        httpCode: httpStatusCode.StatusCodes.BAD_REQUEST,
        error: "failed get token",
      });
    }
    return { token };
  })
);
export default router;
