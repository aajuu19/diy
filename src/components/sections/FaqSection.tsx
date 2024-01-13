"use client";

import { StrapiFaqSection } from "@/types/strapi-types";
import { Headline } from "../common";

type FaqSectionProps = {
  headline: StrapiFaqSection["headline"];
  faqItems: StrapiFaqSection["faqItems"];
  className?: string;
};

export const FaqSection: React.FC<FaqSectionProps> = ({
  headline,
  faqItems,
  className,
}) => {
  return (
    <section id="faq-section" className={className}>
      <Headline as={headline.as} variant={headline.variant} className="mb-4">
        {headline.content}
      </Headline>
      {faqItems.map(({ id, question, answer }, index) => (
        <div key={id} className="collapse collapse-plus rounded-none">
          <input
            type="radio"
            name="my-accordion-1"
            defaultChecked={index === 0}
          />
          <span className="collapse-title text-xl font-medium bg-secondary text-primary-content">
            {question}
          </span>
          <div className="collapse-content pt-4">
            <p>{answer}</p>
          </div>
        </div>
      ))}
    </section>
  );
};
