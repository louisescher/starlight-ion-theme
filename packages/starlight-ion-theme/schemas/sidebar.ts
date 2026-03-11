import type { AstroBuiltinAttributes } from "astro";
import type { HTMLAttributes } from "astro/types";
import { z } from "astro/zod";

// HTML attributes that can be added to an anchor element, validated as
// `Record<string, string | number | boolean | undefined>` but typed as `HTMLAttributes<'a'>`
// for user convenience.
const linkHTMLAttributesSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.boolean(), z.undefined()])
) as z.Schema<
  Omit<HTMLAttributes<"a">, keyof AstroBuiltinAttributes | "children">
>;
export type LinkHTMLAttributes = z.infer<typeof linkHTMLAttributesSchema>;
