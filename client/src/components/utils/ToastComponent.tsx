import toast, { Toast } from 'react-hot-toast';

export const ToastComponent = ({ t, text }: { t: Toast; text: string }) => {
  return (
    <span>
      <div className='flex justify-center items-center gap-4 mx-4'>
        <span>{text}</span>
        <button className='bg-white/50 border-2 border-black rounded-lg py-1 px-2 m-0' onClick={() => toast.dismiss(t.id)}>
          Dismiss
        </button>
      </div>
    </span>
  );
};
