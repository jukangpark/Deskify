import Image from "next/image";
import LikeButton from "./common/LikeButton";
import CommentButton from "./common/CommentButton";
import Link from "next/link";

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
        <CommentButton />
      </div>
      <p className="pl-2">
        <Link href={`/profile/${user_id}`}>
          <span className="font-black">{username}</span> : {""}
        </Link>
        <span className="font-extralight">{content}</span>
      </p>
    </div>
  );
};

export default Presentation;
