"use client";

import { useRef, useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import uploadPostWithImage from "@/utils/supabase/api/uploadPostwithImage";

const UploadPostForm = ({ userId }: { userId: string | undefined }) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      alert("파일을 선택해주세요.");
      return;
    }

    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isUploading) {
      return; // 이미 업로드 중이면 즉시 반환
    }

    if (!file || !content || !userId) {
      return alert("파일과 내용을 모두 입력해주세요.");
    }

    try {
      setIsUploading(true);
      await uploadPostWithImage(file, content, userId);

      setContent("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      alert("게시글이 성공적으로 작성되었습니다.");
    } catch (error) {
      console.error("게시글 작성 중 에러 발생:", error);
      alert("게시글 작성 중 에러가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold text-gray-200">
        게시글 작성
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-6 rounded-lg shadow-lg"
      >
        <div>
          <label
            htmlFor="file"
            className="block text-lg font-semibold text-gray-300"
          >
            이미지 파일
          </label>
          <input
            ref={fileInputRef}
            id="file"
            name="file"
            type="file"
            onChange={handleFileChange}
            required={true}
            className="block w-full p-3 mt-2 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-lg font-semibold text-gray-300"
          >
            내용
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
            rows={4}
            className="block w-full p-3 mt-2 text-gray-200 bg-transparent border border-gray-600 rounded-md shadow-sm focus:ring-white-500 focus:border-white-500 sm:text-sm"
            placeholder="게시글 내용을 입력하세요"
          />
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className={`inline-flex justify-center px-3 py-1 text-sm font-semibold text-white transition duration-300 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-blue-700"
            }`}
        >
          {isUploading ? "업로드 중..." : "게시글 작성"}
        </button>
      </form>
    </div>
  );
};

export default UploadPostForm;
