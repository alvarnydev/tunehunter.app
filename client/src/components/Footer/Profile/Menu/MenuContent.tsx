import { useAuth } from '@/contexts/auth';
import ProfileYou from './MenuContent/ProfileYou';
import ProfileSettings from './MenuContent/ProfileSettings';
import ProfileAbout from './MenuContent/ProfileAbout';
import { PropsWithChildren } from 'react';

const MenuContent = ({ menuPage }: { menuPage: string }) => {
  const { userData } = useAuth();

  const MenuContentLayout = ({ children }: PropsWithChildren) => {
    return <div className='flex flex-col justify-center items-center gap-4 '>{children}</div>;
  };

  return (
    <MenuContentLayout>
      {menuPage === 'you' && <ProfileYou />}
      {menuPage === 'settings' && <ProfileSettings />}
      {menuPage === 'about' && <ProfileAbout />}
    </MenuContentLayout>
  );
};

// py-6 px-6 bg-base-200 rounded-2xl

export default MenuContent;
