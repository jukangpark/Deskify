const PresentationMiniProfile = ({ hoursAgo }: { hoursAgo: string }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-[42px] h-[42px] bg-gray-600 rounded-full"></div>
          <span className="ml-2 text-[14px]">Profile</span>
        </div>
        <div className="pr-3 text-gray-500">{hoursAgo}</div>
      </div>
    </div>
  );
};

export default PresentationMiniProfile;
