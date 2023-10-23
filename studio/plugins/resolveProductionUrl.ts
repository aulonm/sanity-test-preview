import { SanityDocument } from '@sanity/client';

const previewSecret = import.meta.env.SANITY_STUDIO_PREVIEW_SECRET;

const localUrl = 'http://localhost:3000';

export interface DocumentProps extends SanityDocument {
  slug?: {
    current: string;
  };
}

export const resolveProductionUrl = (doc?: DocumentProps) => {
  const baseUrl = localUrl;
  const previewUrl = new URL(baseUrl);
  previewUrl.pathname = '/api/draft';

  const _id = doc?._id?.replace('drafts.', '');

  !!previewSecret && previewUrl.searchParams.append('secret', previewSecret);
  !!doc?._type && previewUrl.searchParams.append('type', doc?._type);
  !!_id && previewUrl.searchParams.append('documentId', _id);
  !!doc?.site && previewUrl.searchParams.append('site', doc?.site);
  !!doc?.slug && previewUrl.searchParams.append('slug', doc.slug.current);

  return previewUrl.toString();
};
