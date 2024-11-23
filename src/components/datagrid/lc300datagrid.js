import React from 'react';

import { topics } from '../../dataFields/filterTopics';
import { LC300 } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/commonDataGrid';

const LC300ProblemsGrid = () => (
  <CommonDataGrid
    title="LeetCode 150 DSA Problems"
    dataFetchUrl={LC300}
    uniqueTopics={topics}
  />
);


export default LC300ProblemsGrid;
