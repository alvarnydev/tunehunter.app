import { PropsWithChildren } from 'react';

const SearchPageLayout = ({ children }: PropsWithChildren) => {
  return <div className='w-full flex flex-col justify-center items-center gap-10'>{children}</div>;
};

export default SearchPageLayout;
