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
          layout="fill" // 부모 컨테이너의 크기에 맞춰 이미지를 채웁니다.
          objectFit="cover" // 이미지를 비율을 유지하면서 부모 크기에 맞게 채웁니다.
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
