
import React, { useState, useEffect } from 'react';
import { Dialog, Transition, DialogBackdrop, DialogPanel, TransitionChild, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';


export default function SearchDrawer({ isOpen = false, onClose, onSearch = () => {} }) {
  const [locationFilter, setLocationFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  /*useEffect(() => {
    console.log("SearchDrawer Props:", { isOpen, onClose, onSearch });
  }, [isOpen, onClose, onSearch]);*/

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting search with:", { locationFilter, minPrice, maxPrice });

    // Check if onSearch is actually a function before calling it
    if (typeof onSearch === "function") {
      console.log("Worked")
      onSearch({
        locationFilter,
        minPrice,
        maxPrice,
      });
      console.log("Again Worked")


    } else {
      console.error("onSearch is not a function!", onSearch);
    }

    onClose(); // Close the drawer after search
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700 bg-white shadow-xl">
              {/* Close Button */}
              <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
                >
                  <span className="absolute -inset-2.5" />
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex h-full flex-col overflow-y-scroll py-6">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-base font-semibold text-gray-900">Search</DialogTitle>
                </div>
                <div>
                  <form onSubmit={handleSubmit} className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className="mb-4">
                      <label htmlFor="locationFilter" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        name="locationFilter"
                        id="locationFilter"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                        Min Price
                      </label>
                      <input
                        type="number"
                        name="minPrice"
                        id="minPrice"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setMinPrice(e.target.value)}
                        value={minPrice}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                        Max Price
                      </label>
                      <input
                        type="number"
                        name="maxPrice"
                        id="maxPrice"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => setMaxPrice(e.target.value)}
                        value={maxPrice}
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
