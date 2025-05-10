
export function assetUrl(relativePath) {
  return new URL(relativePath, import.meta.url).href;
}
