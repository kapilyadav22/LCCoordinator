import React from 'react';

import { TREES } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const TreesProblemsGrid = () => (
  <CommonDataGrid
    title="Trees Problems"
    dataFetchUrl={TREES}
  />
);


export default TreesProblemsGrid;
