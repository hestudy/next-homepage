import { components } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import Parser from "rss-parser";
import urlMetadata from "url-metadata";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const utilRouter = createTRPCRouter({
  fetchRss: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const component = await ctx.db.query.components.findFirst({
        where: eq(components.id, input.id),
      });
      if (!component) {
        throw new Error("Component not found");
      }
      const res = await new Parser().parseURL((component.data as any).url);
      if (!res.title) {
        throw new Error("Invalid RSS feed");
      }
      await ctx.db
        .update(components)
        .set({
          data: {
            ...(component.data as any),
            ...res,
          },
        })
        .where(eq(components.id, input.id));
      return res;
    }),
  fetchMeta: protectedProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }) => {
      const res = await urlMetadata(input.url);
      return res;
    }),
  fetchUrlStatus: protectedProcedure
    .input(z.object({ url: z.string().url() }))
    .query(async ({ input }) => {
      const res = await fetch(input.url);
      return res.ok;
    }),
});
