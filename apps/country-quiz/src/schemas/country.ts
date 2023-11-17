import * as z from "zod";

const NativeNameSchema = z.object({
  official: z.string(),
  common: z.string(),
});
export type NativeName = z.infer<typeof NativeNameSchema>;

const NameSchema = z
  .object({
    common: z.string(),
    official: z.string(),
    nativeName: z.record(z.string(), NativeNameSchema),
  })
  .transform(({ common }) => common);
export type Name = z.infer<typeof NameSchema>;

const FlagsSchema = z.object({
  png: z.string(),
  svg: z.string(),
  alt: z.string(),
});
export type Flags = z.infer<typeof FlagsSchema>;

const CountrySchema = z
  .object({
    flags: FlagsSchema,
    name: NameSchema,
    capital: z.array(z.string()),
    region: z.string(),
  })
  .transform(({ flags, ...rest }) => ({ ...rest, flagUrl: flags.svg }));
export type Country = z.infer<typeof CountrySchema>;

export const CountryResponseSchema = z.array(CountrySchema);
