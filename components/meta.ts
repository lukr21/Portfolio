import type { Metadata } from "next";

export const SITE_URL = "https://lucaskrippendorff.com";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image: string
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "Lucas Krippendorff",
      type: "website",
      images: [{ url: image }],
    },
  };
}
