/**
 * Helper utility to convert ISO date string / timestamp to human readable relative time (Time Ago)
 * e.g., "12m ago", "2h ago", "3d ago"
 */
export function formatTimeAgo(dateString) {
  if (!dateString) return 'Just now';

  const date = new Date(dateString);
  const now = new Date();
  const secondsPast = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (secondsPast < 60) {
    return `${Math.max(1, secondsPast)}s ago`;
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)}m ago`;
  }
  if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)}h ago`;
  }
  if (secondsPast < 2592000) {
    return `${Math.floor(secondsPast / 86400)}d ago`;
  }
  if (secondsPast < 31536000) {
    return `${Math.floor(secondsPast / 2592000)}mo ago`;
  }
  return `${Math.floor(secondsPast / 31536000)}y ago`;
}
