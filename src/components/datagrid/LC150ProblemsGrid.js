import React from 'react';

import { LC150 } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';
import { PAGES_NAME } from '../../config';

const LC150ProblemsGrid = () => (
  <CommonDataGrid
    title="LeetCode 150 DSA Problems"
    dataFetchUrl={LC150}
    pageName = {PAGES_NAME.LC150}
    // uniqueTopics={topics}
  />
);


export default LC150ProblemsGrid;
