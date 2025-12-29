import { config } from "@keystatic/core";
import { identity } from "./schema/identity";
import { profile } from "./schema/profile";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: { name: "Vectris Studio" },
  },
  singletons: {
    identity, // Digital Face
    profile, // Real Entity
  },
  collections: {
    // Menu or other collections later
  },
});
