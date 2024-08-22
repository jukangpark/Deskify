import Feed from "./components/layout/Feed";
import NavigationLogo from "@/app/components/common/NavigationLogo";

const NotFound = () => {
  return (
    <Feed>
      <div className="flex flex-col items-center">
        <NavigationLogo />
        <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
      </div>
    </Feed>
  );
};

export default NotFound;
