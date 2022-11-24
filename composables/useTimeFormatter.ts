import dayjs from "dayjs";

export const useTimeFormatter = () => {
  return {
    secondsToTime(time: number): string {
      const format = "mm:ss.SSS";
      return dayjs(time * 1000)
        .format(format)
        .slice(0, -2);
    },
  };
};
