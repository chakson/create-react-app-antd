const add0 = (k) => k < 10 ? '0' + k : k;
export default function dateTypeChange(type, timestamp) {
  var time = timestamp ? new Date(timestamp) : new Date();
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  if (type === 1) {
    return y + '-' + add0(m) + '-' + add0(d);
  } else if (type === 2) {
    return y + '-' + add0(m);
  } else if (type === 3) {
    return y;
  }
  return y + '-' + add0(m) + '-' + add0(d);
}