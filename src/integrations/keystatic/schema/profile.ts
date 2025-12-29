import { fields, singleton } from "@keystatic/core";

export const profile = singleton({
  label: "Entity Profile", // General term for Company/Person
  path: "src/content/profile",
  schema: {
    // --- Identification ---
    displayName: fields.text({
      label: "Display Name",
      description: "Name of the Company, Shop, or Person.",
    }),

    // --- Communication ---
    email: fields.text({ label: "Public Email" }),
    phoneNumber: fields.text({
      label: "Phone / WhatsApp",
      description: "Include country code (e.g., 628...)",
    }),

    // --- Location ---
    fullAddress: fields.text({
      label: "Full Address",
      multiline: true,
    }),
    mapsLink: fields.url({ label: "Google Maps URL" }),

    // --- Social Presence ---
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
      }
    ),
  },
});
