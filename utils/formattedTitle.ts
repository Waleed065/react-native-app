export default function formattedTitle(title: string | undefined): string {
  if (!title) return '';
  return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
}
