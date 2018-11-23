export const prettyUTC = utcStr => {
  const dateObj = new Date(utcStr);
  let ampm = 'am';
  let h = dateObj.getHours();
  let m = dateObj.getMinutes();
  let s = dateObj.getSeconds();
  if (h >= 12){
    if (h > 12) {
      h -= 12;
    }
    ampm = 'pm';
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }
  return `${dateObj.toLocaleDateString()} ${h}:${m} ${ampm}`;
}

export const sortNotes = notes => {
  if (!notes) {
    return [];
  }
  function compare(a,b) {
    if (a.created < b.created) {
      return -1;
    }
    if (a.created > b.created) {
      return 1;
    }
    return 0;
  }
  return notes.sort(compare).reverse();
}
