#!/usr/bin/env node

var A = {
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

var B = {
  'LT': 1,
  'ST': 0,
  'SS': 20, 
  'LLC': 0, 
  'LS': 1,
  'Comp': {
    'C': 1,
    'E': 1,
  },
  'OH': 40, 
  'AL': 0, 
  'OO': [0, 50, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'GR': [0, 70, 100, 50, 90, 60, 110, 60, 100, 50, 100, 50, 100],
  'SR': [0, 50, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'POR': [0, 0, 50, 90, 60, 110, 60, 100, 50, 100, 50, 100, 0],
};

var C = {
  'LT': 1, 
  'ST': 0,
  'SS': 5,
  'LLC': 2,
  'LS': 500,
  'Comp': {
    'E': 1,
    'F': 1,
  },
  'OH': 60, 
  'AL': 0,
  'OO': [0, 200, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'SR': [0, 200, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

var D = {
  'LT': 1,
  'ST': 0, 
  'SS': 5, 
  'LLC': 1,
  'LS': 200,
  'Comp': {
    'C': 1, 
    'E': 2,
  },
  'OH': 60, 
  'AL': 20,
  'OO': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'SR': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

var E = {
  'LT': 2,
  'ST': 0,
  'SS': 50,
  'LLC': 3,
  'LS': 3,
  'Comp': { 
  },
  'OH': 100, 
  'AL': 0, 
  'OO': [0, 1500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'SR': [0, 1500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

var F = {
  'LT': 2,
  'ST': 1,
  'SS': 100, 
  'LLC': 3,
  'LS': 2,
  'Comp': {
    
  },
  'OH': 100, 
  'AL': 0,
  'OO': [0, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'SR': [0, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

function max(a, b) {
  return a > b ? a : b;
};

function dump_array(title, arr) {
  process.stdout.write(title + ':\t');
  for(var i = 0; i < arr.length; i++) {
    process.stdout.write(arr[i] + '\t');
  }
  process.stdout.write('\n');
}

function pretty_print(p) {
  dump_array('GR', p.GR);
  dump_array('SR', p.SR);
  dump_array('POH', p.POH);
  dump_array('PAB', p.PAB);
  dump_array('NR', p.NR);
  dump_array('PORcpt', p.PORcpt);
  dump_array('POR', p.POR);
}

function do_mrp(p) {
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

console.log('A MRP');
do_mrp(A);
console.log('\n');
console.log('B MRP');
do_mrp(B);
