"use client";
import { useCallback } from "react";

import Card from "@/components/common/Card/Card";
import SkeletonCard from "@/components/common/SkeletonCard";
import { store } from "@/lib/store";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon
} from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Provider } from "react-redux";
import useSWR from "swr";
import { useDebounceValue } from "usehooks-ts";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Shop = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOptions, setSortOptions] = useState([
    { name: "Newest", current: true, value: "newest" },
    { name: "Price: Low to High", current: false, value: "low to high" },
    { name: "Price: High to Low", current: false, value: "high to low" },
  ]);
  const [filters, setFilters] = useState([
    {
      id: "color",
      name: "Color",
      options: [
        { value: "white", label: "White" },
        { value: "beige", label: "Beige" },
        { value: "blue", label: "Blue" },
        { value: "brown", label: "Brown" },
        { value: "green", label: "Green" },
        { value: "purple", label: "Purple" },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [],
    },
    {
      id: "size",
      name: "Size",
      options: [
        { value: "SM", label: "SM" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "XL" },
        { value: "2XL", label: "2XL" },
      ],
    },
  ]);

  const debouncedValue = useDebounceValue(search, 300);

  const handleFilterReset = () => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => ({
        ...filter,
        options: filter.options.map((option) => ({
          ...option,
          checked: false,
        })),
      }))
    );

    setMaxPrice(0);
  };

  const handleFilterChange = useCallback((filterId, optionValue) => {
    console.log("re-rendered");
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.id === filterId
          ? {
              ...filter,
              options: filter.options.map(
                (option) =>
                  option.value === optionValue
                    ? { ...option, checked: true } // Only check the selected option
                    : { ...option, checked: false } // Uncheck all others
              ),
            }
          : filter
      )
    );
  });

  const handleSortClick = useCallback(
    (optionName) => {
      console.log("clicked", optionName);
      setSortOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.name === optionName
            ? { ...option, current: true }
            : { ...option, current: false }
        )
      );
    },
    [setSortOptions]
  );

  const baseUrl = `/api/product/get-shop-products?page=${page}`;
  const filterUrl = () => {
    let url = baseUrl;
    if (debouncedValue[0]) url += `&search=${debouncedValue[0]}`;
    if (maxPrice) url += `&price=${maxPrice}`;
    if (sortOptions.find((option) => option.current))
      url += `&sort=${sortOptions.find((option) => option.current).value}`;
    filters.forEach((filter) => {
      const selectedOption = filter.options.find((option) => option.checked);
      if (selectedOption) {
        url += `&${filter.id}=${selectedOption.value}`;
      }
    });
    return url;
  };
  const {
    data: productsResponse,
    error,
    isLoading,
  } = useSWR(filterUrl(), fetcher);

  const pageCount = productsResponse?.totalPages || 1;
  console.log(productsResponse);

  const handlePageClick = (selectedPage) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPage(selectedPage.selected + 1);
    console.log(selectedPage.selected);
    console.log(selectedPage);
  };

  const { data: allCategoriesResponse, error: allCategoriesError } = useSWR(
    "/api/category/get-all-categories",
    fetcher
  );

  // console.log(allCategoriesResponse);
  useEffect(() => {
    if (allCategoriesResponse) {
      setFilters((prevFilters) =>
        prevFilters.map((filter) =>
          filter.id === "category"
            ? {
                ...filter,
                options: allCategoriesResponse?.categories?.map((c) => ({
                  value: c._id,
                  label: c.title,
                })),
              }
            : filter
        )
      );
    }
  }, [allCategoriesResponse]);

  return (
    <div className="">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-[999999] lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white dark:bg-gray-800 py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md  p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              <form className="w-full px-4 my-3 sm:hidden block">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    id="default-search"
                    className="block w-full  py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:border-rose-500   "
                    placeholder="Search..."
                    required
                  />
                  {isLoading && <Loader2 className="w-6 h-6 animate-spin" />}
                </div>
              </form>

              <div className="relative mt-4 mb-6 px-4">
                <label
                  htmlFor="labels-range-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Max Price: Rs {maxPrice || "0"}
                </label>
                <input
                  id="labels-range-input"
                  type="range"
                  min={500}
                  max={10000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-4 -bottom-6">
                  Min (Rs 500)
                </span>

                <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-4 -bottom-6">
                  Max (Rs 10000)
                </span>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 dark:bg-gray-800 hover:text-gray-500">
                        <span className="font-medium dark:text-gray-300 text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              checked={option?.checked || false}
                              onChange={() =>
                                handleFilterChange(section.id, option.value)
                              }
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex items-center gap-2 my-5 mx-4"
                  onClick={handleFilterReset}
                >
                  Clear
                  <Image
                    src={"/filter.png"}
                    alt="close"
                    width={20}
                    height={20}
                  />
                </button>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Deksktop */}
        <main className="mx-auto max-w-7xl px-4 sm:px-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-6 mt-8 md:pt-14">
            <div className="flex items-center space-x-10">
              <h1 className="text-2xl sm:text-4xl dark:text-white font-bold tracking-tight text-gray-900">
                New Arrivals
              </h1>
              <form className="max-w-xs sm:block hidden pl-4 md:pl-4">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only "
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    id="default-search"
                    className="block w-full  py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-rose-500"
                    placeholder="Search..."
                    required
                  />
                </div>
              </form>
            </div>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left ">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium dark:text-white text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in dark:bg-gray-900"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem
                        key={option.name}
                        onClick={() => handleSortClick(option.name)}
                      >
                        <h5
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900 dark:text-white"
                              : "text-gray-500 dark:text-gray-300",
                            "block px-4 py-2 text-sm dark:data-[focus]:bg-gray-700 data-[focus]:bg-gray-200  hover:cursor-pointer"
                          )}
                        >
                          {option.name}
                        </h5>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button> */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6 ">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="flex gap-x-8 gap-y-10 relative ">
              {/* Filters */}
              <form className="hidden w-[25%] sticky top-0  lg:block">
                <h3 className="sr-only">Categories</h3>

                <div className="relative mt-2 mb-4">
                  <label
                    htmlFor="labels-range-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Max Price: Rs {maxPrice || "0"}
                  </label>
                  <input
                    id="labels-range-input"
                    type="range"
                    min={500}
                    max={10000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b  border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between dark:text-white py-3 text-sm  hover:text-gray-500">
                        <span className="font-medium dark:text-gray-300 text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              checked={option?.checked || false}
                              onChange={() =>
                                handleFilterChange(section.id, option.value)
                              }
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}

                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 flex items-center gap-2 my-5"
                  onClick={handleFilterReset}
                >
                  Clear
                  <Image
                    src={"/filter.png"}
                    alt="close"
                    width={20}
                    height={20}
                  />
                </button>
              </form>

              {/* Product grid */}
              <div className="w-full py-8 md:pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
                {isLoading ? (
                  Array(8)
                    .fill(0)
                    .map((_, i) => <SkeletonCard key={i} />)
                ) : (
                  <Provider store={store}>
                    {productsResponse?.products?.map((product, i) => (
                      <Card key={i} item={product} />
                    ))}
                  </Provider>
                )}

                <div className="w-full absolute bottom-0">
                  <ReactPaginate
                    previousLabel={""}
                    nextLabel={""}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Number(pageCount)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    pageClassName={
                      "w-[40px] h-[40px] flex item-center justify-center rounded-full relative hover:text-[white] hover:bg-rose-700 duration-300 text-lg text-[#a749ff] page-links hover:cursor-pointer"
                    }
                    containerClassName={
                      "pagination flex item-end gap-3 justify-center w-full"
                    }
                    activeClassName={"active text-white bg-rose-500 10xl"}
                    pageLinkClassName={
                      "w-full h-full text-center flex-col flex item-center justify-center"
                    }
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Shop;
