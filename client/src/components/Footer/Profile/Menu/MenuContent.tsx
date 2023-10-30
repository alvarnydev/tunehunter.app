import AboutContribute from './MenuContent/AboutContribute';
import AboutFeedback from './MenuContent/AboutFeedback';
import AboutInfo from './MenuContent/AboutInfo';
import ProfileEdits from './MenuContent/ProfileEdits';
import ProfileStats from './MenuContent/ProfileStats';
import SettingsEdits from './MenuContent/SettingsEdits';
import SettingsLogout from './MenuContent/SettingsLogout';

const MenuContent = ({ menuPage }: { menuPage: string }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 '>
      {menuPage === 'you' && (
        <>
          <ProfileEdits />
          <ProfileStats />
        </>
      )}
      {menuPage === 'settings' && (
        <>
          <SettingsEdits />
          <SettingsLogout />
        </>
      )}
      {menuPage === 'about' && (
        <>
          <AboutInfo />
          <AboutFeedback />
          <AboutContribute />
        </>
      )}
    </div>
  );
};

// py-6 px-6 bg-base-200 rounded-2xl

export default MenuContent;
