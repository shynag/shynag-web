import { fields, singleton } from "@keystatic/core";

export const identity = singleton({
  label: "Brand Identity",
  path: "src/content/identity",
  schema: {
    // --- Basic Information ---
    name: fields.text({
      label: "Website Name",
      validation: { length: { min: 1 } },
      description: "The main title used for SEO and browser tabs.",
    }),
    tagline: fields.text({
      label: "Tagline / Slogan",
      description: "Short phrase describing your brand (optional).",
    }),
    description: fields.text({
      label: "SEO Description",
      multiline: true,
      description: "Used for search engines and social sharing previews.",
    }),

    // --- Brand Assets ---
    logo: fields.image({
      label: "Main Logo",
      directory: "public/assets/identity",
      publicPath: "/assets/identity/",
    }),
    favicon: fields.image({
      label: "Favicon",
      description: "Small icon shown in browser tabs (PNG/ICO).",
      directory: "public/assets/identity",
      publicPath: "/assets/identity/",
    }),
    coverImage: fields.image({
      label: "Social Cover Image (OG Image)",
      description:
        "Default image shown when sharing website link on social media.",
      directory: "public/assets/identity",
      publicPath: "/assets/identity/",
    }),
  },
});
