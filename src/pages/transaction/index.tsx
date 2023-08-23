import { FC, useState } from "react";
import useSWR from "swr";

import { TransactionModals } from "@/components/modals";

const Pages: FC = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_APP_URL_API}/food`,
    fetcher,
  );

  const localStorageData = localStorage.getItem("bills");
  const initialData = localStorageData ? JSON.parse(localStorageData) : [];
  const [dataTransaction, setDataTransaction] = useState<any[]>(initialData);

  const addToTransaction = (item: any) => {
    const existingItem = dataTransaction.find(
      (transactionItem: any) => transactionItem.id === item.id,
    );

    if (existingItem) {
      setDataTransaction((prevData: any) =>
        prevData.map((transactionItem: any) =>
          transactionItem.id === item.id
            ? {
                ...transactionItem,
                qty: transactionItem.qty + 1,
              }
            : transactionItem,
        ),
      );
    } else {
      setDataTransaction((prevData: any) => [
        ...prevData,
        {
          ...item,
          qty: 1,
        },
      ]);
    }
  };

  // const deleteToTransaction = (item: any) => {
  //   const existingItem = dataTransaction.find(
  //     (transactionItem: any) => transactionItem.id === item.id
  //   );

  //   if (existingItem) {
  //     // Update the quantity or delete the transaction
  //     const updatedData = dataTransaction.map((transactionItem: any) =>
  //       transactionItem.id === item.id
  //         ? transactionItem.qty === 1
  //           ? null // Delete the transaction
  //           : { ...transactionItem, qty: transactionItem.qty - 1 } // Reduce quantity by 1
  //         : transactionItem
  //     );
  //     setDataTransaction(updatedData.filter(Boolean));
  //   } else {
  //     setDataTransaction((prevData: any) => [
  //       ...prevData,
  //       {
  //         ...item,
  //         qty: 1,
  //       },
  //     ]);
  //   }
  // };

  const saveBillToLocalStorage = () => {
    localStorage.setItem("bills", JSON.stringify(dataTransaction));
  };

  const printBill = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Print Bill</title>
        </head>
        <body>
          <div id="print-content">
            <h1>Bill</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${dataTransaction
                  .map(
                    (item: any) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.price}</td>
                      <td>${item.qty}</td>
                      <td>${item.price * item.qty}</td>
                    </tr>
                  `,
                  )
                  .join("")}
              </tbody>
            </table>
            <div class="total">
              Total: ${dataTransaction.reduce(
                (acc: number, item: any) => acc + item.price * item.qty,
                0,
              )}
            </div>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const [isOpenModalTransaction, setIsOpenModalTransaction] =
    useState<boolean>(false);

  const handleOpenModalTransaction = () => {
    setIsOpenModalTransaction((prev) => !prev);
  };

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <div className="flex w-full justify-center">
      <div className="container flex max-w-screen-lg gap-6 py-6 2xl:max-w-screen-xl">
        <div className="grid h-fit w-7/12 grid-cols-3 gap-4">
          {data.data.map((item: any, index: number) => (
            <div
              onClick={() => addToTransaction(item)}
              key={index}
              className={`grid cursor-pointer overflow-hidden rounded-md text-center shadow-md `}
            >
              <div>
                <img src={item?.image} alt="" className="h-40 object-cover " />
              </div>
              <div className="flex flex-col py-2 text-center">
                <span className=" font-medium">{item.name}</span>
                <span className="font-medium text-primary-blue">{`Rp ${item?.price.toLocaleString(
                  "en-US",
                )}`}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid w-5/12 gap-4 rounded-md bg-white p-6 shadow-md">
          <div className="text-center text-2xl font-medium">Pesanan</div>
          {dataTransaction?.map((item: any, index: number) => (
            <div
              className="flex w-full items-center justify-between gap-2 font-medium"
              key={index}
            >
              <div className="flex items-center gap-4">
                <img
                  className="h-20 w-20 rounded-sm object-cover"
                  src={item.image}
                  alt=""
                />
                <span>{item.name}</span>
              </div>

              <div className="flex w-fit justify-end gap-2">
                <span>{item.qty}x</span>
                <span className="font-medium text-primary-blue">{`Rp ${item?.price.toLocaleString(
                  "en-US",
                )}`}</span>
                {/* <span
                  onClick={() => deleteToTransaction(item)}
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      className="fill-primary-red"
                      d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-504-72h304v72H360v-72zm371.3 656H292.7l-24.2-512h487l-24.2 512z"
                    />
                  </svg>
                </span> */}
              </div>
            </div>
          ))}
          <button
            className="rounded-md border-2 border-primary-red py-2 text-primary-red"
            onClick={() => setDataTransaction([])}
          >
            Clear Cart
          </button>
          <div className="flex w-full gap-2">
            <button
              onClick={saveBillToLocalStorage}
              className="w-full rounded-md border-2 bg-primary-green py-2 text-white"
            >
              Save Bill
            </button>
            <button
              onClick={printBill}
              className="w-full rounded-md border-2 bg-primary-green py-2 text-white"
            >
              Print Bill
            </button>
          </div>
          <button
            onClick={handleOpenModalTransaction}
            className="rounded-md bg-primary-blue py-2 text-white"
          >
            Charge Rp{" "}
            {dataTransaction
              .reduce((acc: any, item: any) => acc + item.price * item.qty, 0)
              .toLocaleString("en-US")}
          </button>
        </div>
      </div>
      <TransactionModals
        isOpen={isOpenModalTransaction}
        handleModal={handleOpenModalTransaction}
        content={dataTransaction}
      />
    </div>
  );
};

export default Pages;
