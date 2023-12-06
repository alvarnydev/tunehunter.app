import { PropsWithChildren } from 'react';

const SpotifyTableLayout = ({ children }: PropsWithChildren<{ loading: boolean }>) => {
  return <div className={`w-3/4 rounded-xl shadow-md shadow-neutral pt-2 px-2  `}>{children}</div>;
};

export default SpotifyTableLayout;
