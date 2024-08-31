import Image from "next/image";

const Presentation = ({
  image,
  user_id,
  content,
  username,
}: {
  image: string;
  user_id: string;
  content: string;
  username: string | undefined;
}) => {
  return (
    <div className="w-[100%] h-[585px] sm:w-[468px] border border-gray-600">
      <div className="relative w-full h-full">
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
      </div>
      <p className="p-2">
        <span className="font-black">{username}</span> : {""}
        <span className="font-extralight">{content}</span>
      </p>
    </div>
  );
};

export default Presentation;
