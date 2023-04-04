import { addOrder, getProducts } from "@/services/api";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect, useState } from "react";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [carts, setCarts] = useState([]);
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState({
    customerName: "",
    customerEmail: "",
    customerDetails: "",
    orderDetails: "",
  });


  // จัดการ modal
  const handleOpenCart = () => {
    if (isOpenCart) {
      setIsOpenCart(false);
    } else {
      setIsOpenCart(true);
    }
  };

  // ฟังก์ชันเพิ่มสินค้าในตะกร้า
  const handleAddToCart = (selectedProduct) => {
    if (!selectedProduct) return;

    const productInCartIndex = carts.findIndex(
      (item) => item.id === selectedProduct.id
    );

    if (productInCartIndex !== -1) {
      // Product is already in cart.
      // กรณีที่ต้องการอับเดตจำนวนสินค้าในตะกร้า
      const updatedCarts = [...carts];
      updatedCarts[productInCartIndex].quantity += 1;
      setCarts(updatedCarts);
    } else {
      // Add a new product to cart.
      // กรณีที่ต้องการเพิ่มสินค้าชิ้นใหม่ลงในตะกร้า
      const product = { ...selectedProduct, quantity: 1 };
      setCarts([...carts, product]);
    }
  };

  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  const handleRemoveFromCart = (selectedProduct) => {
    if (!selectedProduct) return;
    if (selectedProduct.quantity === 0) return;

    // ค้นหาไอดีในตะกร้าว่ามีหรือไม่?
    const productInCartIndex = carts.findIndex(
      (item) => item.id === selectedProduct.id
    );

    // กรณีที่มีสินค้าในตะกร้า
    if (productInCartIndex > -1) {
      // Product is already in cart.
      const updatedCarts = [...carts];

      // Confirm If quantity of product is zero.
      if (selectedProduct.quantity === 1) {
        const isConfirm = confirm("คุณต้องการลบสินค้าออกจากตะกร้าหรือไม่?");

        // ลบสินค้าออกจากตะกร้า
        if (isConfirm) {
          setCarts(updatedCarts.filter((item) => item.id !== selectedProduct.id));
        }
      } else {

        // ลดจำนวนสินค้าในตะกร้า
        updatedCarts[productInCartIndex].quantity -= 1;
        // อับเดต state carts
        setCarts(updatedCarts);
      }
    }
  };

  // ฟังก์ชันสำหรับเก็บค่า sub total 
  const getSubTotal = () => {
    let sum = 0
    sum = carts.reduce((prev, curr) => {
      const productSubtotal = parseFloat(curr.price) * curr.quantity;
      return prev + productSubtotal;
    }, 0);

    return sum.toFixed(2);
  };

  // ฟังก์ชัน submit ข้อมูลไปยัง db
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!carts) return;

      setIsLoading(true);

      const data = {
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerDetails: order.customerDetails,
        orderDetails: JSON.stringify(carts),
      };

      const result = await addOrder(data);
      if (result.success) {
        setCarts([]);
        setOrder({
          customerName: "",
          customerEmail: "",
          customerDetails: "",
          orderDetails: "",
        });
        setStep(3);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // get ข้อมูลจาก db
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getProducts();
      const data = result.data || [];

      if (result.success) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ถูกเรียกเมื่อหน้าเว็บโหลดเสร็จ
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      {/*  This is an example component */}
      <nav id='store' className='w-full top-0 px-6 py-1'>
        <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3'>
          <p className='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl'
          >
            Store
          </p>
          <div className='flex items-center' id='store-nav-content'>
            {/* Card Icon */}
            <div className="relative py-2 cursor-pointer" onClick={handleOpenCart}>
              <div className="t-0 absolute left-4">
                <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{carts.length}</p>
              </div>
              <ShoppingCartIcon className="text-indigo-500 w-[30px] h-[30px]" />
            </div>
          </div>
        </div>
      </nav>

      <Transition appear show={isOpenCart}>
        <Dialog className="relative z-10" onClose={handleOpenCart}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="w-full max-w-[500px] mx-auto flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                style={{ width: '100%' }}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-4"
                    >
                      {step === 1 ? "Your Cart" : "Checkout"}
                    </Dialog.Title>
                    <div className="w-full overflow-auto">
                      {step === 1 && (
                        <>
                          <div className="mt-2">
                            <div className="grid grid-cols-3 gap-10 mb-4">
                              <p className="font-bold text-center">PRODUCT</p>
                              <p className="font-bold text-center">QUANTITY</p>
                              <p className="font-bold text-center">PRICE</p>
                            </div>
                            {/* Carts */}
                            <div className="mb-6">
                              {carts.map((item, index) => (
                                <div
                                  key={index}
                                  className="grid grid-cols-3 gap-10 mt-1 mb-5"
                                >
                                  <div className="flex flex-col justify-center border border-solid border-slate-100 hover:grow hover:shadow-lg">
                                    <img
                                      className="h-[70px] object-contain"
                                      src={`${import.meta.env.VITE_API_URL
                                        }/uploads/${item.image}`}
                                    />
                                    <p className="text-center mt-2 truncate">
                                      {item.name}
                                    </p>
                                  </div>
                                  <div className="">
                                    <div className="flex justify-center">
                                      <div className="flex items-center border-gray-100">
                                        <span
                                          onClick={() => handleRemoveFromCart(item)}
                                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                        >
                                          -
                                        </span>
                                        <span className="h-8 w-[60px] border bg-white text-center leading-[32px] outline-none">
                                          {item.quantity}
                                        </span>
                                        <span
                                          onClick={() => handleAddToCart(item)}
                                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                        >
                                          +
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="">
                                    <p className="text-center">฿{item.price}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {/* Sub Total */}
                            <div className="flex justify-end gap-2">
                              <p className="font-bold">SUBTOTAL</p>
                              <p className="font-bold">฿{getSubTotal()}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button
                              type="button"
                              className="inline-flex"
                              disabled={carts.length === 0}
                              onClick={() => setStep(2)}
                            >
                              ดำเนินการต่อ
                            </button>
                          </div>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          {/* Checkout */}
                          <div className="mb-6">
                            <form onSubmit={handleSubmit}>
                              <div className="mb-2">
                                {/* checkout */}
                                <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  ชื่อลูกค้า
                                </label>
                                <input
                                  type="text"
                                  value={order.customerName}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder=""
                                  required
                                  onChange={(e) => {
                                    setOrder({
                                      ...order,
                                      customerName: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                              <div className="mb-2">
                                {/* checkout */}
                                <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  อีเมล์
                                </label>
                                <input
                                  type="email"
                                  value={order.customerEmail}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder=""
                                  required
                                  onChange={(e) => {
                                    setOrder({
                                      ...order,
                                      customerEmail: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                              <div className="mb-2">
                                {/* checkout */}
                                <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  ที่อยู่
                                </label>
                                <textarea
                                  value={order.customerDetails}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder=""
                                  required
                                  onChange={(e) => {
                                    setOrder({
                                      ...order,
                                      customerDetails: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                              <div className="mt-4 flex justify-end gap-2">
                                <button
                                  type="button"
                                  className="inline-flex"
                                  onClick={() => setStep(1)}
                                >
                                  ย้อนกลับ
                                </button>
                                <button
                                  type="submit"
                                  className="inline-flex"
                                  disabled={isLoading}
                                >
                                  สั่งสินค้า
                                </button>
                              </div>
                            </form>
                          </div>
                        </>
                      )}

                      {step === 3 && (
                        <>
                          <div className="flex flex-col items-center justify-center">
                            <CheckCircleIcon className='w-[100px] h-[100px] cursor-pointer text-green-500' />
                            <p className="text-xl font-semibold">Thank you.</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {products.map((item, index) => (
        <div
          onClick={() => {
            handleAddToCart(item);
          }}
          key={index}
          className="cursor-pointer w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
        >
          <div onClick={() => { }}>
            <div className="flex flex-col justify-center border border-solid border-slate-100">
              <img
                className="!h-[200px] object-cover hover:grow hover:shadow-lg"
                src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
              />
            </div>
            <div className="pt-3 flex items-center justify-between">
              <p className="">{item.name}</p>
              <ShoppingCartIcon className="w-[24px] h-[24px]" />
            </div>
            <p>{`Desc: ${item.description}`}</p>
            <p>{`Stock: ${item.stock}`}</p>
            <p className="pt-1 text-gray-900">{`฿${item.price}`}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Cart;
