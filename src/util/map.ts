import * as R from "ramda";

export const mergeElProps = (k, l, r) => {
  switch (k) {
    case "className":
      return ((r || "") + " " + (l || "")).trim();
    case "style":
      return R.mergeDeepLeft(l || {}, r || {});
    default:
      return l;
  }
};

export const checkDataNull = (data) => {
  return !data ? "-" : data;
};

export const isJSON = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};

export const stringToJSON = (str: string) => JSON.parse(str);

export function padWithLeadingZeros(num: number, totalLength: number) {
  if (num > 0 || num < 9) return String(num).padStart(totalLength, "0");
  return num;
}

export const mappingFlatMenuUrl = (menu) => {
  const newArrayMenu = [];
  for (const headMenu of menu) {
    for (const subPage of headMenu?.subPage) {
      newArrayMenu.push({ permission: subPage?.permission, url: subPage.url });
    }
  }

  return newArrayMenu;
};

export const mappingDataEdit = (data: any) => {
  const id = data?.id;
  delete data?.id;
  if (data?.no) delete data?.no;
  return { id: id, data: data };
};
