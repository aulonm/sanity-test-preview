import { scheduledPublishing } from '@sanity/scheduled-publishing';
import { buildLegacyTheme, defineConfig, isDev } from 'sanity';
import { StructureBuilder, deskTool } from 'sanity/desk';
import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary';
import { schemaTypes } from './schemas';
import { visionTool } from '@sanity/vision';
import { pageStructure } from './plugins/settings';
import home from './schemas/singletons/home';
import settings from './schemas/singletons/settings';
import Iframe from 'sanity-plugin-iframe-pane';
import { resolveProductionUrl } from './plugins/resolveProductionUrl';
import project from './schemas/documents/project';

const devOnlyPlugins = [visionTool()];

export const PREVIEWABLE_DOCUMENT_TYPES = [home.name, project.name] satisfies string[];

const theme = buildLegacyTheme({
  '--black': '#333',
  '--white': '#fff',
  '--brand-primary': '#0047ba',

  /* Main Navigation */
  '--main-navigation-color': '#0047ba',
  '--main-navigation-color--inverted': '#FFFFFF',

  /* Forms */
  '--focus-color': '#002169',

  /* State colors */
  '--state-info-color': '#0047ba',
  '--state-warning-color': '#e8a74a',
  '--state-danger-color': '#cd465e',
  '--state-success-color': '#008761',
});

const projectId = 'yw21ya6w';
const dataset = 'production';

const plugins = [scheduledPublishing(), cloudinarySchemaPlugin(), ...(isDev ? devOnlyPlugins : [])];

const schema = {
  types: schemaTypes,
};

const defaultDocumentNode = (S: StructureBuilder, { schemaType }: { schemaType: string }) => {
  if (schemaType === home.name) {
    return S.document().views([
      S.view.form(),
      S.view.component(Iframe).options({ url: resolveProductionUrl }).title('Preview'),
    ]);
  }

  return S.document();
};

export default defineConfig([
  {
    basePath: '/norge',
    name: 'norge',
    title: 'Medlem Norge',
    projectId,
    dataset,
    plugins: [
      deskTool({
        structure: pageStructure([home]),
        defaultDocumentNode: (S, context) => defaultDocumentNode(S, context),
      }),
      ...plugins,
    ],
    schema,
    theme,
  },
]);
