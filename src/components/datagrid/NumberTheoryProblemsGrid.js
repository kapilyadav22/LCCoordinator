import React from 'react';

import { NUMBERTHEORY } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const NumberTheoryProblemsGrid = () => (
  <CommonDataGrid
    title="NumberTheory Problems"
    dataFetchUrl={NUMBERTHEORY}
  />
);


export default NumberTheoryProblemsGrid;
