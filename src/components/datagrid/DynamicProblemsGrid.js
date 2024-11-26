import React from 'react';

import { DYNAMICPROGRAMMING } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const DynamicProgrammingProblemsGrid = () => (
  <CommonDataGrid
    title="DynamicProgramming Problems"
    dataFetchUrl={DYNAMICPROGRAMMING}
  />
);


export default DynamicProgrammingProblemsGrid;
