import React, { PropsWithChildren } from 'react';

const ResultsPageLayout = ({ children }: PropsWithChildren) => {
  return <div className='flex flex-col justify-center items-center w-full gap-14'>{children}</div>;
};

export default ResultsPageLayout;
