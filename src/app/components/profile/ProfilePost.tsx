import Link from "next/link";
import Image from "next/image";

interface ProfilePostProps {
  post_id: string;
  image: string;
}

const ProfilePost = ({ post_id, image }: ProfilePostProps) => {
  return (
    <Link
      href={`/post/${post_id}`}
      className="display: block w-[300px] h-[300px]"
    >
      <Image
        alt={post_id}
        src={image}
        width={300}
        height={300}
        className="w-full h-full object-cover "
      />
    </Link>
  );
};

export default ProfilePost;
