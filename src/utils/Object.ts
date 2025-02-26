export const removeEmptyProp = (obj: any): any => {
  const newObj: any = {};

  for (let key in obj) {
    if (
      (typeof obj[key] == "string" && obj[key] == "") ||
      (typeof obj[key] == "number" && obj[key] == 0) ||
      obj[key] == null ||
      obj[key] == undefined
    )
      continue;
    newObj[key] = obj[key];
  }

  return newObj;
};
