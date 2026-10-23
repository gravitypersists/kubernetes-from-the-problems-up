/* w-cluster-scrolly · Ch 04 §04 "Moving day" and §05 "Saturday, 03:04": two scrollytelling lanes over
   one drawing of Fennel's four-node cluster, the cluster's record and the loops that work on it.
   Glue only. The drawing (renderCluster) and the lane controller live in the course pool:
   pool/cluster/cluster.js and pool/cluster/lanes.js (format and options: explainers/_pool/README.md,
   "Cluster drawing" and "Cluster lanes"). This chapter's lanes, steps and strings are in ./data.js
   (window.ClusterData); the mount contract is in index.html, above the first mount. */
(function () {
  'use strict';
  if (!window.ClusterCanvas || !window.ClusterCanvas.lanes) { console.error('w-cluster-scrolly: pool/cluster/lanes.js missing'); return; }
  window.ClusterCanvas.lanes('w-cluster-scrolly', window.ClusterData);
})();
