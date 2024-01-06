import { StrapiHeadline } from "@/types/strapi-types";
import { Headline } from "../common";

type YoutubeSectionProps = {
  headline: StrapiHeadline;
  embedId: string;
  source: string;
  className?: string;
};

export const YoutubeSection: React.FC<YoutubeSectionProps> = ({
  embedId,
  headline,
  source,
  className,
}) => {
  return (
    <section id="video-section" className={className}>
      <Headline as={headline.as} variant={headline.variant} className="mb-4">
        {headline.content}
      </Headline>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${embedId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full"
      />
      <span className="block text-end text-sm text-gray-500 mt-2">
        Quelle: Youtube - {source}
      </span>
    </section>
  );
};
