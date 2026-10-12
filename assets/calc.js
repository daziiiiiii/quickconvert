(function () {
  var out = document.getElementById('out');
  var valEl = document.getElementById('val');
  var fromEl = document.getElementById('from');
  var toEl = document.getElementById('to');
  if (!out || !valEl || !window.UNITS) return;

  // UNITS[key] = [a, b]，满足 base = a*value + b（温度用 b 表达偏移）
  function fmt(n) {
    if (!isFinite(n)) return '';
    if (n === 0) return '0';
    if (Math.abs(n) >= 1e7 || Math.abs(n) < 1e-4) return n.toExponential(4);
    return parseFloat(n.toFixed(6)).toString();
  }

  function calc() {
    var v = parseFloat(valEl.value);
    if (isNaN(v)) { out.textContent = ''; return; }
    var f = window.UNITS[fromEl.value];
    var t = window.UNITS[toEl.value];
    if (!f || !t) return;
    var base = f[0] * v + f[1];
    out.textContent = fmt((base - t[1]) / t[0]);
  }

  [valEl, fromEl, toEl].forEach(function (el) {
    if (!el) return;
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
  });
  calc();
})();
