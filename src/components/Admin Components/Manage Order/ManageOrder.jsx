import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const ManageOrder = ({ isOrderOpen, onOrderClose }) => {
  const order = {
    _id: 1,
    orderItems: [
      {
        _id: 1,
        title: "Product 1",
        price: 10,
        description: "Description 1",
        image: {
          url: "http://res.cloudinary.com/dlrzuxgpm/image/upload/v1722251904/npb1bxzjetl3am2vh2r4.png",
          public_id: 1,
        },
        category: { title: "Category 1" },
        quantity: 10,
      },
    ],
    address: "Swabi, Pakistan",
    amount: 7,
    customer: {
      name: "John Doe",
      email: "lQw6J@example.com",
    },
    status: "Pending",
    phone: "1234567890",
    createdAt: "2022-01-01T00:00:00.000Z",
    updatedAt: "2022-01-01T00:00:00.000Z",
  };

  const orderStatusHandler = () => {};

  const cancelOrder = () => {};
  return (
    <Dialog open={isOrderOpen}  onOpenChange={onOrderClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order: {order?._id}</DialogTitle>
        </DialogHeader>

        <div className="py-3 px-2 ">
          <h1 className="text-center font-semibold my-2 text-xl">
            Order Items
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {order?.orderItems?.map((product, i) => (
                  <tr
                    key={product._id}
                    className="border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src={product.image.url}
                        alt="iMac Front Image"
                        className="w-auto h-10 mr-3"
                      />
                      {product.title}
                    </th>

                    <td className="px-4 py-3">{product.quantity}</td>

                    <td className="px-4 py-3">Rs {product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5">
            <h1 className="text-center font-semibold my-2  text-xl">
              Order Details
            </h1>
            <h1 className="font-semibold text-base">
              Customer Name :
              <span className="ml-2 capitalize">{order?.customer?.name}</span>
            </h1>
            <h1 className="font-semibold text-base my-2">
              Address :<span className="ml-2 capitalize">{order?.address}</span>
            </h1>
            <h1 className="font-semibold text-base my-2">
              Phone :<span className="ml-2 capitalize">{order?.phone}</span>
            </h1>
            <div>
              <h1 className="font-semibold text-base my-2">
                Status:
                <span
                  className="ml-2 capitalize text-yellow-400 font-medium"
                  style={{
                    color:
                      order?.status.toUpperCase() === "PENDING"
                        ? "#FF9800"
                        : order?.status.toUpperCase() === "DELIEVERED"
                        ? "#59CD89"
                        : order?.status.toUpperCase() === "CANCELLED"
                        ? "red"
                        : "#474747",
                  }}
                >
                  {order?.status}
                </span>
              </h1>
            </div>
            <h1 className="font-semibold text-base my-2">
              Total:
              <span className="ml-2 capitalize">
                Rs {order?.amount?.toFixed(2)}
              </span>
            </h1>
            <div>
              <button
                onClick={orderStatusHandler}
                className="mt-2 bg-blue-600 mr-5 text-white px-4 whitespace-nowrap py-2 rounded-md hover:bg-blue-800 duration-300"
              >
                Update Status
              </button>
              <button
                onClick={cancelOrder}
                className="mt-2 bg-[#f73838] text-white px-4 whitespace-nowrap py-2 rounded-md hover:bg-[#d31818] duration-300"
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageOrder;
