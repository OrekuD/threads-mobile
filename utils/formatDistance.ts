import { formatDistance as _formatDistance } from "date-fns";

const formatDistance = (date: string) => {
  return _formatDistance(new Date(date), new Date(), {
    addSuffix: false,
  })
    .replace("less than a minute", "now")
    .replace("minutes", "m")
    .replace("minute", "m")
    .replace("hours", "h")
    .replace("hour", "h")
    .replace("days", "d")
    .replace("day", "d")
    .replace("weeks", "w")
    .replace("week", "w")
    .replace("about", "");
};

export default formatDistance;
