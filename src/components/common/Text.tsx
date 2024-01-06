import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Headline } from ".";

type TextProps = {
  content: BlocksContent;
  isSpan?: boolean;
};

export const Text: React.FC<TextProps> = ({ content, isSpan }) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        heading: ({ children, level }) => {
          return (
            <Headline
              as={isSpan ? "span" : `h${level}`}
              variant={`h${level}`}
              className="mb-4"
            >
              {children}
            </Headline>
          );
        },
      }}
    />
  );
};
