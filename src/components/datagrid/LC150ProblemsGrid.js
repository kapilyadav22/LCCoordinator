import React from 'react';

import { topics } from '../../dataFields/filterTopics';
import { LC150 } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const LC150ProblemsGrid = () => (
  <CommonDataGrid
    title="LeetCode 150 DSA Problems"
    dataFetchUrl={LC150}
    uniqueTopics={topics}
  />
);


export default LC150ProblemsGrid;
