import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const Pages: FC = () => {
  const navigate = useNavigate();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_APP_URL_API}/food`,
    fetcher,
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <div className="flex w-full justify-center">
      <div className="container grid max-w-screen-lg gap-6 py-6 2xl:max-w-screen-xl">
        <span className="text-neutral-500">
          Tambahkan Menu makanan yang yang ada di resto
        </span>
        <div className="grid w-full gap-6 rounded-lg bg-white p-4 shadow-md">
          <div>
            <button
              onClick={() => navigate("/food/create")}
              className="rounded-md bg-primary-blue px-4 py-2 text-white"
            >
              Tambah Menu
            </button>
          </div>
          <table className="w-full table-auto rounded-md  ">
            <thead className="">
              <tr className="bg-table-head font-semibold">
                <th className="py-3">#</th>
                <th className="py-3">Nama</th>
                <th className="py-3">Foto</th>
                <th className="py-3">Harga</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item: any, index: number) => (
                <tr
                  onClick={() => navigate(`/food/${item?.id}/edit`)}
                  key={index}
                  className={`cursor-pointer text-center ${
                    index % 2 === 1
                      ? "bg-table-body-secondary"
                      : "bg-table-body-primary"
                  }`}
                >
                  <td className="">{index + 1}</td>
                  <td>{item?.name}</td>
                  <td className="flex justify-center py-2">
                    <img
                      src={item?.image}
                      alt=""
                      className="h-20 w-20 rounded-md"
                    />
                  </td>
                  <td>{`Rp ${item?.price.toLocaleString("en-US")}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pages;
