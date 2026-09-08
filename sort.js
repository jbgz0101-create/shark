/* ==========================================================================
   三种排序算法实现 —— 冒泡 / 快速 / 归并
   运行方式：node sort.js
   ========================================================================== */

// ---------- 1. 冒泡排序 ----------
// 相邻元素两两比较，把较大者往后「冒」，重复 n-1 轮。
// 时间复杂度 O(n^2)，空间 O(1)，稳定排序。
function bubbleSort(arr) {
  const a = arr.slice(); // 复制一份，不修改原数组
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // 本轮无交换，说明已有序，提前结束
  }
  return a;
}

// ---------- 2. 快速排序 ----------
// 选基准值分区，递归处理左右两半。
// 平均 O(n log n)，最坏 O(n^2)，不稳定排序。
function quickSort(arr) {
  const a = arr.slice();
  function sort(left, right) {
    if (left >= right) return;
    const pivot = a[(left + right) >> 1]; // 取中间值作基准
    let i = left;
    let j = right;
    while (i <= j) {
      while (a[i] < pivot) i++;
      while (a[j] > pivot) j--;
      if (i <= j) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
        j--;
      }
    }
    sort(left, j);
    sort(i, right);
  }
  sort(0, a.length - 1);
  return a;
}

// ---------- 3. 归并排序 ----------
// 分治：拆到只剩一个元素，再两两合并有序子数组。
// 始终 O(n log n)，空间 O(n)，稳定排序。
function mergeSort(arr) {
  const a = arr.slice();
  if (a.length <= 1) return a;
  const mid = a.length >> 1;
  const left = mergeSort(a.slice(0, mid));
  const right = mergeSort(a.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}

// ---------- 工具函数 ----------

/** 生成 n 个 [min, max] 区间的随机整数 */
function randomArray(n, min = 1, max = 999) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

/** 校验数组是否升序排列 */
function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

/** 精确计时（毫秒），返回 { result, ms } */
function timeIt(fn, arr) {
  const start = process.hrtime.bigint();
  const result = fn(arr);
  const end = process.hrtime.bigint();
  return { result, ms: Number(end - start) / 1e6 };
}

// ---------- 主流程 ----------

function main() {
  const algorithms = [
    { name: '冒泡排序', fn: bubbleSort },
    { name: '快速排序', fn: quickSort },
    { name: '归并排序', fn: mergeSort },
  ];

  // 1. 小数组演示排序结果
  const demo = randomArray(15, 1, 99);
  console.log('原始数组  :', demo.join(', '));
  console.log('');
  for (const { name, fn } of algorithms) {
    const sorted = fn(demo);
    console.log(`${name}: ${sorted.join(', ')}  ${isSorted(sorted) ? '✅ 正确' : '❌ 错误'}`);
  }

  // 2. 大数组性能对比
  console.log('');
  console.log('========== 性能对比（10000 个随机数） ==========');
  const big = randomArray(10000);
  const results = algorithms.map(({ name, fn }) => {
    const { result, ms } = timeIt(fn, big);
    return { name, ms, ok: isSorted(result) };
  });
  results.sort((x, y) => x.ms - y.ms);
  for (const r of results) {
    console.log(`${r.name}: ${r.ms.toFixed(2)} ms  ${r.ok ? '✅ 正确' : '❌ 错误'}`);
  }
}

main();
