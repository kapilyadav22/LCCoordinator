import React from 'react';

import { GRAPH } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const GraphProblemsGrid = () => (
  <CommonDataGrid
    title="Graph Problems"
    dataFetchUrl={GRAPH}
  />
);


export default GraphProblemsGrid;
