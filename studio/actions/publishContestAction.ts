import { format } from 'date-fns';
import { DocumentActionComponent, DocumentActionProps, useDocumentOperation } from 'sanity';

export function createPublishContestAction(originalAction: DocumentActionComponent): DocumentActionComponent {
  const PublishContestAction = (props: DocumentActionProps) => {
    const { patch } = useDocumentOperation(props.id, props.type);

    const originalResult = originalAction(props);
    if (!originalResult?.onHandle) {
      return null;
    }

    return {
      ...originalResult,
      onHandle: async () => {
        const contestTitle = props.published?.contestTitle ? undefined : props.draft?.title;
        const countryCode = 'no';

        contestTitle &&
          patch.execute([
            {
              set: {
                contestTitle: `dkt:medlem:${countryCode}:contest:${format(new Date(), 'yyyy-MM')}:${contestTitle}`,
              },
            },
          ]);
        originalResult.onHandle?.();
      },
    };
  };
  return PublishContestAction;
}
