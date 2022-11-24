import dayjs from "dayjs";

export const useDateFormatter = () => {
  return {
    getYear: (date: Date) => {
      return dayjs(date).year();
    },
    isBeforeOrAfter: (a: Date, b: Date): number => {
      const aDayJS = dayjs(a);
      const bDayJS = dayjs(b);

      if (aDayJS.isBefore(bDayJS)) return 1;

      if (aDayJS.isAfter(bDayJS)) return -1;

      return 0;
    },
    formatDate: (date: Date, includeYear = false) => {
      const format = `DD MMM${includeYear ? " YYYY" : ""}`;
      return dayjs(date).format(format);
    },
    formatTime: (date: Date) => {
      const format = "HH:mm";
      return dayjs(date).format(format);
    },

    formatInputDate: (date: Date) => {
      const format = "YYYY-MM-DD";
      return dayjs(date).format(format);
    },
    getInputDate: (date: string) => {
      return dayjs(date).toDate();
    },

    formatInputTime: (date: Date) => {
      const format = "YYYY-MM-DDTHH:mm";
      return dayjs(date).format(format);
    },
    getInputTime: (date: string) => {
      return dayjs(date).toDate();
    },
  };
};
