import { t } from 'i18next';
import { BsFillRewindCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const BackButton = () => {
  return (
    <Link className='flex' to='/'>
      <button
        type='submit'
        className='btn font-normal rounded-full w-auto gap-2 flex normal-case px-4 text-base tracking-wide'
      >
        <BsFillRewindCircleFill size={24} />
        {t('resultstable.backtostart')}
      </button>
    </Link>
  );
};

export default BackButton;
