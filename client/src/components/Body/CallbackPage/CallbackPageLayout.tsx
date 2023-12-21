import React, { PropsWithChildren } from 'react';

const CallbackPageLayout = ({ children }: PropsWithChildren) => {
  return <div className='flex flex-col gap-4 items-center'>{children}</div>;
};

export default CallbackPageLayout;
