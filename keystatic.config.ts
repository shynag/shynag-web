import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: { name: "Vectris Studio" },
  },
  singletons: {
    identity: singleton({
      label: "Identity (Digital)",
      path: "src/content/identity",
      schema: {
        name: fields.text({
          label: "Website Name",
          validation: { length: { min: 1 } },
        }),
        tagline: fields.text({ label: "Tagline / Slogan" }),
        description: fields.text({
          label: "SEO Description",
          multiline: true,
        }),
        logo: fields.image({
          label: "Main Logo",
          directory: "public/assets/identity",
          publicPath: "/assets/identity/",
        }),
        favicon: fields.image({
          label: "Favicon",
          directory: "public/assets/identity",
          publicPath: "/assets/identity/",
        }),
        coverImage: fields.image({
          label: "Social Cover Image (OG Image)",
          directory: "public/assets/identity",
          publicPath: "/assets/identity/",
        }),
      },
    }),
    profile: singleton({
      label: "Profile (Entity)",
      path: "src/content/profile",
      schema: {
        displayName: fields.text({ label: "Display Name" }),
        email: fields.text({ label: "Public Email" }),
        phoneNumber: fields.text({ label: "Phone / WhatsApp" }),
        fullAddress: fields.text({ label: "Full Address", multiline: true }),
        mapsLink: fields.url({ label: "Google Maps URL" }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.select({
              label: "Platform",
              options: [
                { label: "Instagram", value: "instagram" },
                { label: "TikTok", value: "tiktok" },
                { label: "Facebook", value: "facebook" },
                { label: "Twitter / X", value: "twitter" },
                { label: "YouTube", value: "youtube" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "GitHub", value: "github" },
              ],
              defaultValue: "instagram",
            }),
            url: fields.url({ label: "Profile URL" }),
          }),
          {
            label: "Social Media Accounts",
            itemLabel: (props) => props.fields.platform.value || "Social Link",
          },
        ),
      },
    }),
  },
  collections: {
    works: collection({
      label: "Works",
      path: "src/content/works/*",
      slugField: "title",
      schema: {
        title: fields.slug({ name: { label: "Project Name" } }),
        year: fields.text({ label: "Year" }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        stack: fields.array(fields.text({ label: "Tech Name" }), {
          label: "Tech Stack",
          itemLabel: (props) => props.value,
        }),
        href: fields.url({ label: "Link URL" }),
      },
    }),

    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" }, // Menggunakan format MDX/Markdoc
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        publishedDate: fields.date({
          label: "Published Date",
          validation: { isRequired: true },
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/assets/blog",
            publicPath: "/assets/blog/",
          },
          tables: true,
        }),
      },
    }),
  },
});
