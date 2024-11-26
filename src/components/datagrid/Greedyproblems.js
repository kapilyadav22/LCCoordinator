import React from 'react';

import { GREEDY } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const GreedyProblemsGrid = () => (
  <CommonDataGrid
    title="Greedy Problems"
    dataFetchUrl={GREEDY}
  />
);


export default GreedyProblemsGrid;
