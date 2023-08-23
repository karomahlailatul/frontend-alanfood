import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";

import useStore from "@/store";

interface Data {
  name: string;
  price: string;
  description: string;
  image: File | null;
}

import { useSWRConfig } from "swr";

const Edit = () => {
  const { mutate } = useSWRConfig();

  const { id } = useParams();

  const navigate = useNavigate();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: Values,
    error,
    isLoading,
  } = useSWR(`${import.meta.env.VITE_APP_URL_API}/food/${id}`, fetcher);

  const [data, setData] = useState<Data>({
    name: Values?.data?.name || "",
    price: Values?.data?.price || "",
    description: Values?.data?.description || "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(
    Values?.data?.image,
  );

  useEffect(() => {
    if (Values?.data?.image) {
      setPreviewImage(Values?.data?.image);
    }
  }, [Values?.data?.image]);

  const { setIsLoading } = useStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    if (input.name === "image" && input.files) {
      const imageFile = input.files[0];
      setData({ ...data, [input.name]: imageFile });
      setPreviewImage(URL.createObjectURL(imageFile));
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);

    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    if (data.image) {
      formData.append("image", data.image);
    }

    await fetch(`${import.meta.env.VITE_APP_URL_API}/food/${id}`, {
      method: "PUT",
      body: formData,
    });

    setIsLoading(false);
    navigate("/food");
    mutate(`${import.meta.env.VITE_APP_URL_API}/food/${id}`);
    mutate(`${import.meta.env.VITE_APP_URL_API}/food/`);

    setData({
      name: "",
      price: "",
      description: "",
      image: null,
    });
    setPreviewImage(null);
  };

  const handleDelete = async () => {
    setIsLoading(true);

    await fetch(`${import.meta.env.VITE_APP_URL_API}/food/${id}`, {
      method: "DELETE",
    });
    setIsLoading(false);
    navigate("/food");
    mutate(`${import.meta.env.VITE_APP_URL_API}/food`);
  };

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <div className="flex w-full justify-center">
      <div className="container grid max-w-screen-lg gap-4 py-6 2xl:max-w-screen-xl">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 bg-white p-6">
            <div className="flex justify-between">
              <span className="font-semibold text-primary-blue">Ubah Menu</span>
              <button
                onClick={() => handleDelete()}
                type="button"
                className="rounded-md bg-primary-red px-20 py-2 text-white"
              >
                Hapus Menu
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <label>Nama Menu</label>
              <input
                className="rounded-md border border-neutral-300 px-4 py-2 focus:ring-0"
                type="text"
                name="name"
                onChange={handleChange}
                defaultValue={Values?.data?.name}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Description</label>
              <input
                className="rounded-md border border-neutral-300 px-4 py-2  focus:ring-0"
                type="text"
                name="description"
                onChange={handleChange}
                defaultValue={Values?.data?.description}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label>Gambar</label>

              <label className="flex min-h-[80px] w-full cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400 focus:outline-none">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full object-cover"
                  />
                ) : (
                  <span className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-neutral-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="font-medium text-gray-600">
                      Drop files to Attach, or{" "}
                      <span className="text-blue-600 underline">browse</span>
                    </span>
                  </span>
                )}
                <input
                  className="hidden"
                  type="file"
                  name="image"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="flex flex-col gap-1">
              <label>Harga</label>
              <div className="flex overflow-hidden rounded-md border-neutral-300 text-center">
                <div className="flex h-full items-center bg-primary-blue px-3 font-medium text-white ">
                  Rp
                </div>
                <input
                  className="w-full border-none outline-none ring-0 focus:ring-0 "
                  type="number"
                  name="price"
                  onChange={handleChange}
                  defaultValue={Values?.data?.price}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-primary-green px-20 py-2 text-white"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
