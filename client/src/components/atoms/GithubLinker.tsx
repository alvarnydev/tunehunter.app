import { BsGithub } from 'react-icons/bs';

const GithubLinker = () => (
  <div className='flex justify-center items-center'>
    <a href='https://github.com/alvarnydev/rekordstore.com' target='_blank' className='btn' aria-label='Link to the GitHub page of the project'>
      <BsGithub size={28} />
    </a>
  </div>
);

export default GithubLinker;
