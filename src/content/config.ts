import { defineCollection, z } from 'astro:content';

const treatmentsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    category: z.enum(['dentistry', 'maxillofacial']),
    categoryLabel: z.string(),
    icon: z.string().optional(),
    image: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    relatedTreatments: z.array(z.string()).optional(),
    order: z.number().default(0),
  }),
});

const testimonialsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    location: z.string(),
    text: z.string(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const teamCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    qualifications: z.string(),
    bio: z.string(),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  treatments: treatmentsCollection,
  testimonials: testimonialsCollection,
  team: teamCollection,
};
