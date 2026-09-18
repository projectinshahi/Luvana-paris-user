import type { SyntheticEvent } from "react";

// Ask Cloudinary for a copy sized for where the image is shown, in the best format the
// browser accepts (WebP/AVIF), instead of the full-resolution original. Product photos
// shrink by ~70%. Used for plain <img> tags; next/image already optimises its own.
// Any other URL is returned unchanged.
export const cldImage = <T extends string | null | undefined>(
  url: T,
  width: number,
): T => {
  if (
    !url ||
    !url.includes("res.cloudinary.com/") ||
    !url.includes("/image/upload/")
  )
    return url;
  return url.replace(
    "/image/upload/",
    `/image/upload/f_auto,q_auto,c_limit,w_${width}/`,
  ) as T;
};

export const PLACEHOLDER_IMAGE = "/placeholder.png";

// The src to render for an image URL saved in the admin: a resized copy for
// Cloudinary images, and the placeholder when nothing usable was saved (an empty
// value, or text that is not a URL — next/image throws on those).
export const imageSrc = (url: string | null | undefined, width?: number): string => {
  const value = url?.trim();
  if (!value || !/^(https?:\/\/|\/)/i.test(value)) return PLACEHOLDER_IMAGE;
  return width ? cldImage(value, width) : value;
};

// onError for <img> and next/image: show the placeholder instead of a broken image.
// Only once, so a failing placeholder cannot loop.
export const showPlaceholder = (e: SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  if (img.src.endsWith(PLACEHOLDER_IMAGE)) return;
  img.srcset = "";
  img.src = PLACEHOLDER_IMAGE;
};

// onError for small decorative images (flags): hide them rather than show a broken icon.
export const hideOnError = (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.visibility = "hidden";
};
