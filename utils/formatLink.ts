export default function formatLink(link: string) {
  if (link.startsWith("http://")) {
    return link.slice(7);
  }

  if (link.startsWith("https://")) {
    return link.slice(8);
  }

  if (link.startsWith("www.")) {
    return link.slice(4);
  }

  return link;
}
