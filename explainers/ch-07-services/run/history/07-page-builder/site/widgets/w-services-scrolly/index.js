/* w-services-scrolly · Ch 07 §04 "Thursday, 10:15, from storefront's side": one scrollytelling lane
   (S1–S4) over Fennel's cluster drawing, with the catalog Service's block in the record (its name and
   address, and the list of ready Pods the endpoints loop keeps), gated on k-03 in S2's step column.
   Glue only. The drawing (renderCluster, with pool-04's Service block) and the lane controller live in
   the course pool: pool/cluster/cluster.js and pool/cluster/lanes.js (format and options:
   explainers/_pool/README.md, "Cluster drawing" and "Cluster lanes"). This lane's steps, snapshots and
   strings, and Fig. 04's two snapshots (drawn by the page), are in ./data.js (window.ClusterData). */
(function () {
  'use strict';
  if (!window.ClusterCanvas || !window.ClusterCanvas.lanes) { console.error('w-services-scrolly: pool/cluster/lanes.js missing'); return; }
  window.ClusterCanvas.lanes('w-services-scrolly', window.ClusterData);
})();
