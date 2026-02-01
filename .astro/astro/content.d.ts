declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"treatments": {
"dentistry/childrens-dentistry.md": {
	id: "dentistry/childrens-dentistry.md";
  slug: "dentistry/childrens-dentistry";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"dentistry/cosmetic-dentistry.md": {
	id: "dentistry/cosmetic-dentistry.md";
  slug: "dentistry/cosmetic-dentistry";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"dentistry/dental-checkup.md": {
	id: "dentistry/dental-checkup.md";
  slug: "dentistry/dental-checkup";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"dentistry/dental-implants.md": {
	id: "dentistry/dental-implants.md";
  slug: "dentistry/dental-implants";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"dentistry/emergency-dental.md": {
	id: "dentistry/emergency-dental.md";
  slug: "dentistry/emergency-dental";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"dentistry/tooth-fillings.md": {
	id: "dentistry/tooth-fillings.md";
  slug: "dentistry/tooth-fillings";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"maxillofacial/advanced-implants.md": {
	id: "maxillofacial/advanced-implants.md";
  slug: "maxillofacial/advanced-implants";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"maxillofacial/facial-cosmetic.md": {
	id: "maxillofacial/facial-cosmetic.md";
  slug: "maxillofacial/facial-cosmetic";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"maxillofacial/oral-cancer.md": {
	id: "maxillofacial/oral-cancer.md";
  slug: "maxillofacial/oral-cancer";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"maxillofacial/swellings.md": {
	id: "maxillofacial/swellings.md";
  slug: "maxillofacial/swellings";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"maxillofacial/tmj-disorders.md": {
	id: "maxillofacial/tmj-disorders.md";
  slug: "maxillofacial/tmj-disorders";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
"maxillofacial/trauma.md": {
	id: "maxillofacial/trauma.md";
  slug: "maxillofacial/trauma";
  body: string;
  collection: "treatments";
  data: InferEntrySchema<"treatments">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"team": {
"dr-zuben": {
	id: "dr-zuben";
  collection: "team";
  data: InferEntrySchema<"team">
};
};
"testimonials": {
"aditya-narayan": {
	id: "aditya-narayan";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
"ajit-kumar": {
	id: "ajit-kumar";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
"nikita-agarwal": {
	id: "nikita-agarwal";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
"suruchi-behera": {
	id: "suruchi-behera";
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
