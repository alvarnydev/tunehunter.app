import { PropsWithChildren } from 'react';

const SongsTableLayout = ({ children, loading }: PropsWithChildren<{ loading: boolean }>) => {
  return <div className={`w-3/4 rounded-xl shadow shadow-neutral pt-2 px-2 ${loading ? 'flex justify-center items-center' : ''} `}>{children}</div>;
};

export default SongsTableLayout;
