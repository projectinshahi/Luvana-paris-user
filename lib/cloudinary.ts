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
