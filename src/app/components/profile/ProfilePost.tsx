import Link from "next/link";
import Image from "next/image";

interface ProfilePostProps {
  post_id: string;
  image: string;
}

const ProfilePost = ({ post_id, image }: ProfilePostProps) => {
  return (
    <div
      key={post_id}
      className="relative w-full"
      style={{ aspectRatio: "1/1" }}
    >
      <Link href={`/post/${post_id}`}>
        <Image
          src={image}
          alt={image}
          layout="fill"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            objectPosition: "center",
          }}
          priority={true} // Add the priority prop
        />
      </Link>
    </div>
  );
};

export default ProfilePost;
