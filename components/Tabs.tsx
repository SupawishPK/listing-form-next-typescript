'use client';

interface IProps {
  items: string[];
  selectedTab: number;
  onChange: (index: number) => void;
}

const Tabs = ({ items, selectedTab, onChange }: IProps) => {
  return (
    <div className='flex flex-col w-full max-w-md gap-y-2'>
      <div className='flex items-center justify-between p-1 gap-x-1 rounded-xl bg-gray-light text-gray-dark'>
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => onChange(index)}
            className={`w-full rounded-xl p-2 text-center outline-none hover:bg-white focus:bg-white ${
              selectedTab === index ? 'bg-white text-black' : ''
            }`}
            aria-selected={selectedTab === index}
            role='tab'
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
