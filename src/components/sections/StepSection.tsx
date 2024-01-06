import { StrapiHeadline, StrapiStepType } from "@/types/strapi-types";
import { Headline, Text } from "../common";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import clsx from "clsx";
import Image from "next/image";

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
      {steps?.map((step, index) => {
        return (
          <div key={step.id} className="grid grid-cols-12 gap-4 pt-4">
            <div className="col-span-1">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-content text-lg">
                {index + 1}
              </div>
            </div>
            <div
              className={clsx(
                "col-span-10 pl-2",
                index !== steps.length - 1 && "border-b border-border"
              )}
            >
              <Headline as="span" variant="h4">
                {step.title}
              </Headline>
              {step.media?.data && (
                <div className="w-full h-60 relative border border-border my-4">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${step?.media?.data?.attributes?.url}`}
                    fill
                    alt={step?.media?.data?.attributes?.alternativeText}
                    className="object-contain"
                  />
                </div>
              )}
              <Text content={step.description} />
            </div>
          </div>
        );
      })}
      <div className="mt-10">
        <Text content={outroText} />
      </div>
    </div>
  );
};
