"use client";

import Image from "next/image";
import LikeButton from "./common/LikeButton";
import CommentButton from "./common/CommentButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import getCommentsByPostId from "@/utils/supabase/api/getCommentsByPostId";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ICommentWithUsername from "@/app/types/ICommentWithUsername";
import ShareButton from "./common/ShareButton";
import CommentInput from "./comment/CommentInput";
import getCommentCountByPostId from "@/utils/supabase/api/getCommentCountByPostId";

dayjs.extend(relativeTime);

const Presentation = ({
  image,
  post_id,
  user_id,
  loggedInUserId,
  content,
  username,
  isDetailPostPage,
}: {
  image: string;
  post_id: string;
  user_id: string;
  loggedInUserId: string | undefined;
  content: string;
  username: string | undefined;
  isDetailPostPage: boolean;
}) => {
  const [commentCount, setCommentCount] = useState<number>(0);
  const [comments, setComments] = useState<ICommentWithUsername[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const commentData = await getCommentsByPostId(post_id);
        if (isDetailPostPage) {
          setComments(commentData);
        } else {
          setComments(commentData.slice(0, 1)); // 현재는 이렇게 데이터 모두 불러와서 잘랐지만,나중에는 페이징 처리해야함.
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [post_id, isDetailPostPage]);

  useEffect(() => {
    (async () => {
      try {
        const commentCountData = await getCommentCountByPostId(post_id);
        setCommentCount(Number(commentCountData));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="w-[100%] h-[585px] sm:w-[468px] border border-gray-600">
      <div className="relative w-full h-full">
        <Link href={`/post/${post_id}`}>
          <Image
            src={image}
            alt="post"
            width={466}
            height={583}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            priority={true} // Add the priority prop
          />
        </Link>
      </div>
      <div className="flex p-2 gap-x-4">
        <LikeButton />
        <CommentButton post_id={post_id} isDetailPostPage={isDetailPostPage} />
        <ShareButton post_id={post_id} />
      </div>
      <div className="pl-2">
        <Link href={`/profile/${user_id}`}>
          <span className="font-black">{username}</span> : {""}
        </Link>
        <span className="font-extralight">{content}</span>
      </div>
      {!isDetailPostPage && (
        <div className="pl-3">
          <Link href={`/post/${post_id}`} className="text-xs text-gray-400">
            View all {commentCount} comments
          </Link>
        </div>
      )}
      {isDetailPostPage && loggedInUserId && (
        <div className="pl-2 pt-2 pb-2">
          <CommentInput
            loggedInUserId={loggedInUserId}
            post_id={post_id}
            setComments={setComments}
          />
        </div>
      )}
      <div
        className={`pl-2 overflow-y-auto ${
          !isDetailPostPage ? "max-h-20" : "h-auto"
        }`}
      >
        {comments.map(
          ({
            content,
            id: comment_id,
            updated_at,
            profiles,
            user_id,
            like_count,
          }) => {
            const date = dayjs(updated_at);
            return (
              <div key={comment_id} className="p-1 font-extralight">
                <Link href={`/profile/${user_id}`}>{profiles.username}</Link> :{" "}
                <span className="text-gray-400">{content}</span>
                <div>
                  <span className="text-sm text-gray-400">
                    {date.fromNow()}
                  </span>
                  <span className="text-sm text-gray-400 cursor-pointer">
                    {" "}
                    {like_count} like
                  </span>
                  {isDetailPostPage && (
                    <span className="text-sm text-gray-400 cursor-pointer">
                      {" "}
                      reply
                    </span>
                  )}
                </div>
                {/* <div className="text-sm text-gray-400">-View replies (1)</div> */}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Presentation;
