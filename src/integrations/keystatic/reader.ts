import { createReader } from "@keystatic/core/reader";
import config from "./config";

const reader = createReader(process.cwd(), config);

// --- Fetcher: Identity (Digital) ---
export async function getIdentity() {
  const data = await reader.singletons.identity.read();

  return {
    name: data?.name || "Vectris Client",
    tagline: data?.tagline || "",
    description: data?.description || "",
    logo: data?.logo || null,
    favicon: data?.favicon || null,
    coverImage: data?.coverImage || null,
  };
}

// --- Fetcher: Profile (Physical/Entity) ---
export async function getProfile() {
  const data = await reader.singletons.profile.read();

  return {
    displayName: data?.displayName || "",
    email: data?.email || "",
    phoneNumber: data?.phoneNumber || "",
    fullAddress: data?.fullAddress || "",
    mapsLink: data?.mapsLink || "",
    socialLinks: data?.socialLinks || [],
  };
}
