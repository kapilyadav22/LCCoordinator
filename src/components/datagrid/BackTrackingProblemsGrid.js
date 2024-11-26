import React from 'react';

import { BACKTRACKING } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const BackTrackingProblemsGrid = () => (
  <CommonDataGrid
    title="BackTracking Problems"
    dataFetchUrl={BACKTRACKING}
  />
);


export default BackTrackingProblemsGrid;
