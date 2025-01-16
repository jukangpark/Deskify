const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
