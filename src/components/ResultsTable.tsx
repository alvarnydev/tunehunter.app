interface ResultsTableProps {
  priceData:
    | [
        {
          artist: string;
          song: string;
          prices: { amazon: number; itunes: number; beatport: number; bandcamp: number };
        }
      ]
    | null;
}

const ResultsTable = ({ priceData }: ResultsTableProps) => {
  return (
    <div className='overflow-x-auto w-full'>
      <table className='table w-full'>
        {/* head */}
        <thead>
          <tr>
            <th className='text-base normal-case'>Store</th>
            <th className='text-base normal-case'>Price</th>
            <th className='text-base normal-case'>Artist's Cut</th>
            <th className='text-base normal-case'>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className='flex items-center space-x-5'>
                <div className='avatar'>
                  <div className='mask mask-squircle w-12 h-12'>
                    <img src='/logo_amazonmusic.png' alt='Avatar Tailwind CSS Component' />
                  </div>
                </div>
                <div>
                  <div className='font-bold'>Amazon Music</div>
                  <div className='text-sm opacity-50'>United States</div>
                </div>
              </div>
            </td>
            <td>0.99€</td>
            <td>60% - 0.59€</td>
            <th>
              <button className='btn btn-secondary text-base normal-case'>Buy</button>
            </th>
          </tr>
          <tr>
            <td>
              <div className='flex items-center space-x-5'>
                <div className='avatar'>
                  <div className='mask mask-squircle w-12 h-12'>
                    <img src='/logo_bandcamp.svg' alt='Avatar Tailwind CSS Component' />
                  </div>
                </div>
                <div>
                  <div className='font-bold'>Bandcamp</div>
                </div>
              </div>
            </td>
            <td>1.29€</td>
            <td>80% - 0.99€</td>
            <th>
              <button className='btn btn-secondary text-base normal-case'>Buy</button>
            </th>
          </tr>
          <tr>
            <td>
              <div className='flex items-center space-x-5'>
                <div className='avatar'>
                  <div className='mask mask-squircle w-12 h-12'>
                    <img src='/logo_beatport.svg' alt='Avatar Tailwind CSS Component' />
                  </div>
                </div>
                <div>
                  <div className='font-bold'>Beatport</div>
                </div>
              </div>
            </td>
            <td>-</td>
            <td>-</td>
            <th></th>
          </tr>
          <tr>
            <td>
              <div className='flex items-center space-x-5'>
                <div className='avatar'>
                  <div className='mask mask-squircle w-12 h-12'>
                    <img src='/logo_applemusic.svg' alt='Avatar Tailwind CSS Component' />
                  </div>
                </div>
                <div>
                  <div className='font-bold'>iTunes Store</div>
                </div>
              </div>
            </td>
            <td>1.29€</td>
            <td>30% - 0.42€</td>
            <th>
              <button className='btn btn-secondary text-base normal-case'>Buy</button>
            </th>
          </tr>
        </tbody>

        {/* foot */}
        {/* <tfoot>
          <tr>
            <th />
            <th />
            <th />
            <th />
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
};

export default ResultsTable;
