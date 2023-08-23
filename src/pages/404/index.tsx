import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

const NotFound: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto flex w-full flex-col items-center justify-center gap-10 px-3 py-6 md:h-screen md:flex-row xl:px-3.5 xl:py-8 2xl:gap-12 2xl:px-4 2xl:py-10">
      <div className="grid gap-6 xl:gap-7 2xl:gap-8">
        <div className="grid gap-2">
          <p className="flex w-fit gap-0.5 rounded-md  px-2 py-1 text-xs font-normal text-neutral-700 2xl:gap-1 2xl:text-sm ">
            ERROR
            <span className="font-semibold text-primary-red">404</span>
          </p>
          <div className="grid gap-2 xl:gap-3 2xl:gap-4">
            <h5 className="text-[20px] font-semibold leading-[28px] text-neutral-700 xl:text-[24px] xl:leading-[32px] 2xl:text-[28px]  2xl:leading-[36px]">
              Ooops! Page Not Found
            </h5>
            <p className="text-sm font-normal text-neutral-500 2xl:text-base 2xl:leading-[32px] ">
              The page you’re looking for doesn’t exist or has been moved.
            </p>
          </div>
        </div>
        <button
          onClick={handleBackHome}
          className="w-full gap-2 rounded-lg border border-primary-blue bg-white px-3.5 py-1.5 text-sm font-semibold text-primary-blue duration-300 ease-in-out "
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
