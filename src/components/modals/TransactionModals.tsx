import { forwardRef, Fragment, memo, useState } from "react";
import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";

export interface TransactionModalsPropsType {
  isOpen: boolean;
  handleModal: () => void;
  content: any;
}

const TransactionModals = forwardRef<
  HTMLDivElement,
  TransactionModalsPropsType
>(({ isOpen, handleModal, content }, ref) => {
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  const handleSubmit = async () => {
    if (paymentAmount - calculateTotal(content) < 0)
      return toast.error("Uang yang dibayarkan kurang");

    const totalPay = paymentAmount;
    const changePay = totalPay - calculateTotal(content);
    const isPay = true;
    const foodId = content.map((item: any) => item.id);
    const foodCount = content.map((item: any) => item.qty);

    const requestData = {
      totalPay,
      changePay,
      isPay,
      foodId,
      foodCount,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL_API}/checkout/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );

      if (response.ok) {
        handleModal();
        toast.success("Pembayaran berhasil");
      } else {
        toast.error("Terjadi kesalahan");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };

  const calculateTotal = (items: any[]) => {
    return items.reduce(
      (total: number, item: any) => total + item.price * item.qty,
      0,
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[999] overflow-y-auto bg-[rgba(18,_24,_38,_0.60)]"
        onClose={handleModal}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              ref={ref}
              className="inline-block w-10/12 max-w-5xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all "
            >
              <div className="flex h-full w-full flex-col gap-6 p-6 ">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold text-neutral-700 xl:text-xl 2xl:text-2xl"
                >
                  Detail Pesanan
                </Dialog.Title>
                <Dialog.Panel>
                  <div className="flex w-full gap-6">
                    <div className="flex w-8/12 text-center ">
                      <table className="w-full table-auto rounded-md shadow-md ">
                        <thead className="">
                          <tr className="bg-table-head font-semibold">
                            <th className="py-2">#</th>
                            <th className="py-2">Nama</th>
                            <th className="py-2">Foto</th>
                            <th className="py-2">Harga</th>
                          </tr>
                        </thead>
                        <tbody>
                          {content?.map((item: any, index: number) => (
                            <tr
                              //   onClick={() => navigate(`/food/${item?.id}/edit`)}
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
                              <td>{`Rp ${item?.price.toLocaleString(
                                "en-US",
                              )}`}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <span className="border-l"></span>
                    <div className="flex w-4/12 flex-col gap-4">
                      <div className="grid gap-3">
                        <span className="text-center font-medium">
                          Uang Pembeli (RP)
                        </span>
                        <input
                          onChange={(e) =>
                            setPaymentAmount(parseInt(e.target.value))
                          }
                          type="number"
                          className="w-full rounded-md border border-neutral-300 p-2"
                        />
                      </div>
                      <div className="flex justify-between gap-4">
                        <button
                          onClick={handleModal}
                          className="w-full rounded-md border border-neutral-400 bg-white py-2 font-medium text-neutral-400"
                        >
                          Close
                        </button>
                        <button
                          onClick={handleSubmit}
                          className="w-full rounded-md bg-primary-blue py-2 font-medium text-white"
                        >
                          Pay!
                        </button>
                      </div>
                      <span>
                        Kembalian:{" "}
                        <span className="font-medium">{`Rp. ${
                          paymentAmount - calculateTotal(content) > 0
                            ? paymentAmount - calculateTotal(content)
                            : 0
                        }`}</span>
                      </span>
                    </div>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
});

TransactionModals.displayName = "TransactionModals";
export default memo(TransactionModals);
