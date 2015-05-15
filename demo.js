#!/usr/bin/env node

A = {
    'LT': 1,
    'ST': 0,
    'SS': 25,
    'LLC': 0,
    'LS': 1,
    'Comp': {
        'C': 2,
        'D': 1,
    },
    'OH': 20,
    'AL': 0,
    'OO': [0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    'GR': [0, 80, 50, 100, 60, 100, 70, 100, 60, 100, 50, 100, 50],
    'SR': [0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    'POR': [0, 35, 100, 60, 100, 70, 100, 60, 100, 50, 100, 50, 0]
};

var max = function(a, b) {
  return a > b ? a : b;
}

var dump_array = function(arr) {
  for(var i = 0; i < arr.length; i++) {
    process.stdout.write(arr[i] + '\t');
  }
  process.stdout.write('\n');
}

var pretty_print = function(p) {
  dump_array(p.POH);
  dump_array(p.PAB);
  dump_array(p.NR);
  dump_array(p.PORcpt);
  dump_array(p.POR);
}

var do_mrp = function(p) {
  p.PAB = [0];
  p.POH = [0];
  p.PORcpt = [0];
  p.NR = [0];
  
  p.PAB[0] = p.OH + max(A.SR[0], 0) - p.AL;
  
  for (var t = 1; t < 13; t++) {
      
      if (t == 1) {
        p.POH[t] = p.PAB[t - 1] + p.SR[t] - p.GR[t] - max(p.GR[t-1], 0);
      } else {
        p.POH[t] = p.PAB[t - 1] + p.SR[t] - p.GR[t]
      }
      
      if (p.POH[t] < p.SS) {
        p.NR[t] = p.SS - p.POH[t];
        p.PORcpt[t] = p.POR[t - 1];
      } else {
        p.NR[t] = 0;
        p.PORcpt[t] = 0;
      }
      p.PAB[t] = p.POH[t] + p.PORcpt[t];
      p.POR[t - p.LT] = p.PORcpt[t];
  }
  pretty_print(p);
}

do_mrp(A);