/* w-rollout-scrolly · Ch 06 §03 "Thursday, 10:15: catalog v63": one scrollytelling lane (R1–R5) over
   Fennel's cluster drawing, its record (a Deployment row over two ReplicaSet rows) and the loops that
   work on it, gated on k-02 in R2's step column.
   Glue only. The drawing (renderCluster) and the lane controller live in the course pool:
   pool/cluster/cluster.js and pool/cluster/lanes.js (format and options: explainers/_pool/README.md,
   "Cluster drawing" and "Cluster lanes"). This lane's steps, snapshots and strings, and Fig. 03's two
   snapshots (drawn by the page, assets/page.js), are in ./data.js (window.ClusterData); the mount
   contract is in index.html §03, above the mount. */
(function () {
  'use strict';
  if (!window.ClusterCanvas || !window.ClusterCanvas.lanes) { console.error('w-rollout-scrolly: pool/cluster/lanes.js missing'); return; }
  window.ClusterCanvas.lanes('w-rollout-scrolly', window.ClusterData);
})();
