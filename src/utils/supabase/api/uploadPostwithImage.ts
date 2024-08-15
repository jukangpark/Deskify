import { createClient } from "@/utils/supabase/client";

const sanitizeFileName = (fileName: string) => {
  // 파일 이름에서 공백을 밑줄로 대체하고, 특수 문자를 제거합니다.
  return fileName
    .replace(/\s+/g, "_") // 공백을 밑줄로 변환
    .replace(/[^a-zA-Z0-9_\-\.]/g, ""); // 알파벳, 숫자, 밑줄, 하이픈, 점(.) 이외의 문자를 제거
};

/**
 * @param {File} file - 업로드할 파일
 * @param {string} content - 게시글 내용
 * @param {string} userId - 사용자 ID
 * @returns {Promise<any>} - 업로드에 성공한 게시글 데이터
 * @description 파일을 업로드하고 게시글을 생성합니다.
 */
const uploadPostWithImage = async (
  file: File,
  content: string,
  userId: string,
) => {
  try {
    // 파일 이름을 안전하게 변환
    const safeFileName = sanitizeFileName(`${Date.now()}-${file.name}`);

    const supabase = await createClient();

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(safeFileName, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError.message);
      return null;
    }

    // 업로드된 파일의 Public URL 가져오기
    const { data: publicUrlData } = await supabase
      .storage
      .from("post-images")
      .getPublicUrl(safeFileName);

    if (!publicUrlData.publicUrl) {
      console.error("Error getting public URL:");
      return null;
    }

    const imageUrl = publicUrlData.publicUrl;

    // posts 테이블에 데이터 삽입
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .insert({
        content,
        user_id: userId,
        image: imageUrl,
      })
      .single();

    if (postError) {
      console.error("Error inserting post:", postError.message);
      return null;
    }

    return postData;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export default uploadPostWithImage;
