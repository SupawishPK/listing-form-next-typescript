import React from 'react';
import { text } from 'stream/consumers';

interface IProps {
  text: string;
}

const Chip = ({ text }: IProps) => {
  return (
    <div className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-light'>
      {text}
    </div>
  );
};

export default Chip;
