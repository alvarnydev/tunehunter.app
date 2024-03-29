import { AiOutlineInfoCircle } from 'react-icons/ai';

const InfoAnnotation = ({ infoText }: { infoText: string }) => {
  return (
    <span className='tooltip ml-1 inline-block text-sm opacity-80 rounded-full' data-tip={infoText}>
      <AiOutlineInfoCircle size={16} />
    </span>
  );
};

export default InfoAnnotation;
