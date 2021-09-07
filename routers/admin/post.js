// 공지 만들기 + fcm 보내기
// 공지 수정
// 공지 삭제
import { Router } from "express";
import { inputHandler, responseHandler } from "../../lib/common.js";
import { createPost, deletePost } from "../../controller/post.controller.js";
const router = Router();

router.post(
  "/",
  inputHandler({}),
  responseHandler(async (req) => {
    const {
      title,
      attachment_folder_id,
      body_folder_id,
      body_file_counts,
      attachment_file_counts,
      body,
    } = req.body;

    return createPost({
      title,
      attachment_folder_id,
      body_folder_id,
      body_file_counts,
      attachment_file_counts,
      body,
    });
  })
);
router.delete(
  "/",
  inputHandler({}),
  responseHandler(async (req) => {
    const { post_id } = req.body;
    return deletePost(post_id);
  })
);
export default router;
