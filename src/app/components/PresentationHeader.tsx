import PresentationMiniProfile from "./PresentationMiniProfile";

const calculateTimeAgo = (createdAt: string) => {
  const createdDate = new Date(createdAt); // created_at을 Date 객체로 변환
  const currentDate = new Date(); // 현재 시간

  const timeDifference = Math.abs(
    currentDate.getTime() - createdDate.getTime()
  ); // 시간 차이(밀리초)
  const minutesAgo = Math.floor(timeDifference / (1000 * 60)); // 밀리초를 분으로 변환

  if (minutesAgo < 30) {
    return "just now"; // 30분 이내라면 "now" 표시
  } else if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`; // 60분 이내라면 분으로 표시
  } else {
    const hoursAgo = Math.floor(minutesAgo / 60);
    return `${hoursAgo} hours ago`; // 60분 이상이면 시간으로 표시
  }
};

const PresentationHeader = ({ created_at }: { created_at: string }) => {
  const hoursAgo = calculateTimeAgo(created_at);
  return (
    <div className="h-[46px] mb-[12px]">
      <PresentationMiniProfile hoursAgo={hoursAgo} />
    </div>
  );
};

export default PresentationHeader;
