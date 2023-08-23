import { FunctionComponent, ReactElement } from "react";
// import useStore from "@/store";
import { Link, useLocation } from "react-router-dom";

interface NavLinkNavbarType {
  title: string;
  path: string;
}

const NavBar: FunctionComponent = (): ReactElement => {
  const { pathname } = useLocation();

  // const { setIsLoading } = useStore();

  const navLink: NavLinkNavbarType[] = [
    {
      title: "Food",
      path: "/food",
    },
    {
      title: "Transaksi",
      path: "/transaction",
    },
  ];

  return (
    <>
      <nav className="grid w-full border-b">
        <div className="flex w-full justify-center bg-primary-blue">
          <div className="container flex max-w-screen-lg items-center py-3 2xl:max-w-screen-xl">
            <span className="text-xl font-semibold text-white">Alan Resto</span>
          </div>
        </div>
        <div className="flex w-full justify-center bg-white">
          <div className="container flex w-full max-w-screen-lg 2xl:max-w-screen-xl">
            {navLink.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className={`px-8 py-3 text-lg font-medium ${
                  pathname.includes(item.path)
                    ? "border-b-2 border-primary-blue text-primary-blue"
                    : "border-b-2 border-white text-black"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
