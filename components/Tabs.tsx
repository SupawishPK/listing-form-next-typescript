'use client';

import { useEffect, useRef } from 'react';

interface IProps {
  items: string[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}

const Tabs = ({ items, selectedTab, setSelectedTab }: IProps) => {
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, []);

  return (
    <div className='flex flex-col w-full max-w-md gap-y-2'>
      <div className='flex items-center justify-between p-1 text-gray-dark bg-gray-light gap-x-1 rounded-xl'>
        {items.map((item, index) => (
          <button
            ref={index === 0 ? firstBtnRef : null}
            key={index}
            onClick={() => setSelectedTab(index)}
            className={`w-full rounded-xl p-2 text-center outline-none hover:bg-white focus:bg-white ${
              selectedTab === index ? 'bg-white text-black' : ''
            }`}
            aria-selected={selectedTab === index}
            role='tab'
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
