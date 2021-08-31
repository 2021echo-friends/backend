import Post from "../models/post.js";

export const createPost = async ({
  title,
  attachment_folder_id,
  body_folder_id,
  body_file_counts,
  attachment_file_counts,
  body,
}) => {
  let post = {};
  // 애초에 프런트 쪽에서 html <img> 로 하고 붙여 넣을 때 event로 file 업로드하면 되는데
  if (title) {
    post.title = title;
  }
  if (body) {
    post.body = body;
  }
  if (attachment_folder_id) {
    post.attachment_folder_id = attachment_folder_id;
  }
  if (body_folder_id) {
    post.body_folder_id = body_folder_id;
  }
  if (body_file_counts) {
    post.body_file_counts = body_file_counts;
  }
  if (attachment_file_counts) {
    post.attachment_file_counts = attachment_file_counts;
  }
  return await Post.create(post);
};
export const getPost = async ({ cursor, per_page }) => {
  let filter = {};
  if (cursor) {
    filter = { ...FileReader, date_create: { $gte: Date(cursor) } };
  }
  return await Post.find(filter).limit(per_page ? Number(per_page) : 5);
};
