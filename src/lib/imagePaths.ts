type ImageFields = {
  image?: string;
  imageUrl?: string;
};

const IMAGE_PATH_REPLACEMENTS: Record<string, string> = {
  '/images/Logo.webp': '/images/logo.webp',
  '/images/desserts/Tiramisu-Cheesecak.png': '/images/desserts/Tiramisu-Cheesecak.webp',
  '/images/desserts/Chocolate-Cheesecake.png': '/images/desserts/Chocolate-Cheesecake.webp',
  '/images/desserts/Speculoos-Cheesecake.png': '/images/desserts/Speculoos-Cheesecake.webp',
  '/images/desserts/Strawberry-Cheesecake.png': '/images/desserts/Strawberry-Cheesecake.webp',
  '/images/desserts/tart.png': '/images/desserts/tart.webp',
  '/images/desserts/chocolate-mixing.jpg': '/images/desserts/chocolate-mixing.webp',
  '/images/desserts/culinary-artistry.jpg': '/images/desserts/chocolate-mixing.webp',
  '/images/desserts/seasonal-pie.jpg': '/images/desserts/tart.webp',
  '/images/desserts/fruit-tart.jpg': '/images/desserts/tart.webp',
};

export function normalizeImagePath(path: string): string {
  return IMAGE_PATH_REPLACEMENTS[path] ?? path;
}

export function normalizeImageFields<T extends ImageFields>(item: T): T {
  let changed = false;
  const updates: ImageFields = {};

  if (item.image) {
    const image = normalizeImagePath(item.image);
    if (image !== item.image) {
      updates.image = image;
      changed = true;
    }
  }

  if (item.imageUrl) {
    const imageUrl = normalizeImagePath(item.imageUrl);
    if (imageUrl !== item.imageUrl) {
      updates.imageUrl = imageUrl;
      changed = true;
    }
  }

  return changed ? { ...item, ...updates } : item;
}
