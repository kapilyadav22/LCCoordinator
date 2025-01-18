import React from 'react';

import { GRAPH } from '../../constants/urlConstants';
import CommonDataGrid from '../../layout/CommonDataGrid';

const graphObject = {
  'Breadth-First Search' : '/BFS.html',
  'Depth-First Search' : '/DFS.html',
  'Connected Components' : '/ConnectedComponent.html',
  'Dijkstra Shortest Path': '/Dijkstra.html', 
  'Prim Minimum Cost Spanning Tree' : '/Prim.html',
  'Topological Sort (Indegree)' : '/TopoSortIndegree.html',
  'Topological Sort (DFS)' : '/TopoSortDFS.html',
  'Floyd-Warshall All-Pairs Shortest Path' : '/Floyd.html',
  'Kruskal Minimum Cost Spanning Tree' : '/Kruskal.html'
}

const GraphProblemsGrid = () => (
  <CommonDataGrid
    title="Graph Problems"
    dataFetchUrl={GRAPH}
    visualObject={graphObject}
  />
);


export default GraphProblemsGrid;
