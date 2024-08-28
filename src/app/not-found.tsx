import NavigationLogo from "@/app/components/common/NavigationLogo";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <NavigationLogo />
      <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
    </div>
  );
};

export default NotFound;
