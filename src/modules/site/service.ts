import { getIdentity, getProfile } from "@integrations/keystatic/reader";

export async function getGlobalSiteData() {
  const [identity, profile] = await Promise.all([getIdentity(), getProfile()]);

  return {
    identity,
    profile,
  };
}
