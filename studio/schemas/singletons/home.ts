import { HomeIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'hero',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'ingress',
          type: 'string',
        }),
        defineField({
          name: 'cta',
          type: 'array',
          of: [
            defineField({
              name: 'ctaEveryone',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  type: 'string',
                }),
                defineField({
                  name: 'url',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      };
    },
  },
});
