import ProfileEdits from './MenuContent/ProfileEdits';
import ProfileStats from './MenuContent/ProfileStats';
import SettingsEdits from './MenuContent/SettingsEdits';

const MenuContent = ({ menuPage }: { menuPage: number }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 '>
      {menuPage === 0 && (
        <>
          <ProfileEdits />
          <ProfileStats />
        </>
      )}
      {menuPage === 1 && (
        <>
          <ProfileStats />
          <SettingsEdits />
          {/* <LogOut /> */}
          {/* <FeedbackForm />  */}
        </>
      )}
    </div>
  );
};

// py-6 px-6 bg-base-200 rounded-2xl

export default MenuContent;
