import ProfileEdits from './MenuContent/ProfileEdits';
import ProfileStats from './MenuContent/ProfileStats';
import SettingsEdits from './MenuContent/SettingsEdits';

const MenuContent = ({ menuPage }: { menuPage: number }) => {
  return (
    <div className='flex flex-col gap-4'>
      {menuPage === 0 && (
        <>
          <ProfileStats />
          <ProfileStats />
          <ProfileEdits />
        </>
      )}
      {menuPage === 1 && (
        <>
          <SettingsEdits />
        </>
      )}
    </div>
  );
};

export default MenuContent;
