import React from 'react';

import { SLIDINGWINDOW } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const SlidingWindowProblemsGrid = () => (
  <CommonDataGrid
    title="SlidingWindow Problems"
    dataFetchUrl={SLIDINGWINDOW}
  />
);


export default SlidingWindowProblemsGrid;
