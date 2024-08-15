"use client";

import { useEffect, useRef, useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import uploadPostWithImage from "@/utils/supabase/api/uploadPostwithImage";

const UploadPostForm = ({ userId }: { userId: string }) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력 필드를 참조하기 위한 ref

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

    if (!file || !content || !userId) {
      return alert("파일과 내용을 모두 입력해주세요.");
    }

    // uploadPostWithImage 함수를 호출하여 파일 업로드와 게시글 삽입을 처리합니다.

    try {
      await uploadPostWithImage(file, content, userId);

      // 폼 초기화
      setContent("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return alert("게시글이 성공적으로 작성되었습니다.");
    } catch (error) {
      console.error("게시글 작성 중 에러 발생:", error);
      return alert("게시글 작성 중 에러가 발생했습니다.");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">게시글 작성 페이지</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="file"
            className="block text-lg font-medium text-white-700"
          >
            이미지 파일
          </label>
          <input
            ref={fileInputRef} // ref로 파일 입력 필드를 참조
            id="file"
            name="file"
            type="file"
            onChange={handleFileChange}
            required={true}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-white-700"
          >
            내용
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
            placeholder="게시글 내용을 입력하세요"
          />
        </div>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500"
        >
          게시글 작성
        </button>
      </form>
    </>
  );
};

export default UploadPostForm;
