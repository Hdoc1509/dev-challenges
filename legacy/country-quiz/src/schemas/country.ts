import * as z from "zod";

const NativeNameSchema = z.object({
  official: z.string(),
  common: z.string(),
});

const NameSchema = z.object({
  common: z.string(),
  official: z.string(),
  nativeName: z.record(z.string(), NativeNameSchema),
});

const FlagsSchema = z.object({
  png: z.string(),
  svg: z.string(),
  alt: z.string(),
});

const CountrySchema = z
  .object({
    flags: FlagsSchema,
    name: NameSchema,
    capital: z.array(z.string()),
    region: z.string(),
  })
  .transform(({ name, flags, capital, region }) => ({
    name: name.common,
    flagUrl: flags.svg,
    capital,
    region,
  }));

export const CountryResponseSchema = z.array(CountrySchema);
export type CountryResponse = z.infer<typeof CountryResponseSchema>;
