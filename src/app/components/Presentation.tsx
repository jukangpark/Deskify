import Image from "next/image";

const Presentation = ({
  image,
  user_id,
  content,
}: {
  image: string;
  user_id: string;
  content: string;
}) => {
  return (
    <div className="w-[468px] h-[585px] border border-gray-600">
      <Image
        width={468}
        height={585}
        src={image}
        alt="post"
        className="w-full h-full object-cover "
      />
      <p className="p-2">
        <span className="font-black">username</span> : {""}
        <span className="font-extralight">{content}</span>
      </p>
    </div>
  );
};

export default Presentation;
