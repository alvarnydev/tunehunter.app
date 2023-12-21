const ProfileEdits = () => {
  // todo: make this a form? add region here, get initially from spotify api

  return (
    // <div>
    //   <div className='flex'>
    //     <label htmlFor=''>E-Mail</label>
    //     <input
    //       type='text'
    //       placeholder="You can't touch this"
    //       className='input input-bordered w-full max-w-xs'
    //       disabled
    //     />
    //   </div>
    // </div>
    <div className='overflow-x-auto w-full'>
      <table className='table w-full'>
        <tbody className=''>
          <tr>
            <td className='text-end'>Name</td>
            <td>Peter</td>
          </tr>
          <tr>
            <td className='text-end'>E-Mail</td>
            <td>
              <input type='text' placeholder='peterstolz@google.com' className='input input-bordered w-full max-w-xs rounded-full' disabled />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileEdits;
