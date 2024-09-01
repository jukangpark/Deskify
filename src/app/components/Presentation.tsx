import Image from "next/image";
import LikeButton from "./common/LikeButton";
import CommentButton from "./common/CommentButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import getCommentsByPostId from "@/utils/supabase/api/getCommentsByPostId";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ICommentWithUsername from "@/app/types/ICommentWithUsername";
import { useRouter } from "next/navigation";
import createComment from "@/utils/supabase/api/createComment";
import { IoIosSend } from "react-icons/io";
import ShareButton from "./common/ShareButton";

dayjs.extend(relativeTime);

const Presentation = ({
  image,
  post_id,
  user_id,
  content,
  username,
}: {
  image: string;
  post_id: string;
  user_id: string;
  content: string;
  username: string | undefined;
}) => {
  const router = useRouter();
  const [comments, setComments] = useState<ICommentWithUsername[]>([]);

  useEffect(() => {
    (async () => {
      const commentData = await getCommentsByPostId(post_id);
      setComments(commentData);
    })();
  }, [post_id]);

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
        <CommentButton
          post_id={post_id}
          setComments={setComments}
          user_id={user_id}
        />
        <ShareButton post_id={post_id} />
      </div>
      <div className="pl-2">
        <Link href={`/profile/${user_id}`}>
          <span className="font-black">{username}</span> : {""}
        </Link>
        <span className="font-extralight">{content}</span>
      </div>
      <div className="pl-2 overflow-y-auto max-h-20">
        {comments.map(
          ({
            content,
            id: comment_id,
            updated_at,
            profiles: { username },
            user_id,
            like_count,
          }) => {
            const date = dayjs(updated_at);
            return (
              <div key={comment_id} className="p-1 font-extralight">
                <Link href={`profile/${user_id}`}>{username}</Link> :{" "}
                <span className="text-gray-400">{content}</span>
                <div>
                  <span className="text-sm text-gray-400">
                    {date.fromNow()}
                  </span>
                  <span className="text-sm text-gray-400 cursor-pointer">
                    {" "}
                    {like_count} like
                  </span>
                  <span
                    className="text-sm text-gray-400 cursor-pointer"
                    onClick={async () => {
                      const isLoggedIn = localStorage.getItem("isLoggedIn");
                      if (!isLoggedIn) {
                        alert("please sign in"); // 다국어 처리하기
                        return router.push("/login");
                      } else {
                        const comment = prompt("Enter your comment here:");

                        if (!comment) {
                          return;
                        } else {
                          await createComment(
                            comment,
                            post_id,
                            comment_id,
                            user_id
                          );
                          await getCommentsByPostId(post_id).then((data) =>
                            setComments(data)
                          );
                        }
                      }
                    }}
                  >
                    {" "}
                    reply
                  </span>
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
