import React, { PropsWithChildren } from 'react';

const MenuContentLayout = ({ children }: PropsWithChildren) => {
  return <div className='flex flex-col justify-center items-center gap-4 '>{children}</div>;
};

export default MenuContentLayout;
