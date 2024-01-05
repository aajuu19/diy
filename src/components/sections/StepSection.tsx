import { StrapiHeadline, StrapiStepType } from "@/types/strapi-types";
import { Headline } from "../common";
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

type StepSectionProps = {
  headline: StrapiHeadline;
  steps: StrapiStepType[];
  outroText: BlocksContent;
  className?: string;
};

export const StepSection: React.FC<StepSectionProps> = ({
  headline,
  steps,
  outroText,
  className,
}) => {
  return (
    <div className={className}>
      <Headline as={headline.as} variant={headline.variant} className="mb-6">
        {headline.content}
      </Headline>
      {steps.map((step, index) => (
        <div key={step.id} className="grid grid-cols-12 gap-4 pt-4">
          <div className="col-span-1">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-content text-lg">
              {index + 1}
            </div>
          </div>
          <div className="col-span-10 pl-2">
            <Headline as="span" variant="h4">
              {step.title}
            </Headline>
            <BlocksRenderer content={step.description} />
            <hr />
          </div>
        </div>
      ))}
      <BlocksRenderer content={outroText} />
    </div>
  );
};
