import moment from "moment";
import "moment/dist/locale/id";

export const formatTime = (
  time: any,
  format: string,
  {
    fb = "",
    locale = "id",
  }: {
    fb?: string;
    locale?: string;
  } = {}
) => {
  if (!time) return fb;
  return moment.parseZone(time).locale(locale).format(format);
};

export const getAge = (dob?: string) => {
  return dob ? moment().diff(moment(dob), "years") + " tahun" : "- tahun";
};
