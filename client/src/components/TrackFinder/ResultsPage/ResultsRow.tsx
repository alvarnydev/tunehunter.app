import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { ResultsRowType } from '../../../utils/types';

const ResultsRow = ({ rowData }: { rowData: ResultsRowType }) => {
  return (
    <tr>
      <td>
        <div className='flex items-center space-x-5'>
          <div className='avatar '>
            <div className='mask mask-squircle w-12 h-12'>
              <img src='/logo_amazonmusic.png' alt='Avatar Tailwind CSS Component' />
            </div>
          </div>
          <div className='md:block hidden'>
            <div className='font-bold'>{rowData.company.name}</div>
            <div className='text-sm font-normal opacity-50'>{rowData.company.country}</div>
          </div>
        </div>
      </td>
      <td>
        <div>{rowData.song.qualityFormat}</div>
        <div className='text-sm opacity-50'>{rowData.song.qualityFormat}</div>
      </td>
      <td className=''>
        {rowData.song.price / rowData.company.artistsShare}€
        <span
          className='tooltip ml-1 inline-block text-sm opacity-50'
          data-tip={`Artist's share is ${rowData.company.artistsShare}% on ${rowData.company.name}.`}
        >
          <AiOutlineInfoCircle size={16} />
        </span>
      </td>
      <td>
        <div className='flex items-center gap-4'>
          <div className='inline-block'>{rowData.song.price}€</div>
          <div className='flex justify-center flex-1'>
            <button className='btn btn-ghost text-base normal-case'>
              <FaExternalLinkSquareAlt size={32} className='text-primary' />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ResultsRow;
