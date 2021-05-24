set NUTRIENTE;
set ALIMENTO;

param cost {ALIMENTO} > 0;
param f_min {ALIMENTO} >= 0;
param f_max {j in ALIMENTO} >= f_min[j];

param n_min {NUTRIENTE} >= 0;
param n_max {i in NUTRIENTE} >= n_min[i];

param amt {NUTRIENTE,ALIMENTO} >= 0;

var ListaCompra {j in ALIMENTO} >= f_min[j], <= f_max[j];

minimize CustoTotal:  sum {j in ALIMENTO} cost[j] * ListaCompra[j];

subject to Diet {i in NUTRIENTE}:
n_min[i] <= sum {j in ALIMENTO} amt[i,j] * ListaCompra[j] <= n_max[i];
