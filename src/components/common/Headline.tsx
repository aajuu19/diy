import clsx from "clsx";

type HeadlineProps = {
  variant: HeadlineTypes;
  as: HeadlineTypes | "span";
  children: React.ReactNode;
  className?: string;
};

const getVariantClasses = (variant: HeadlineProps["variant"]) => {
  switch (variant) {
    case "h1":
      return "text-4xl lg:text-5xl";
    case "h2":
      return "text-3xl lg:text-4xl";
    case "h3":
      return "text-3xl lg:text-3xl";
    case "h4":
      return "text-2xl lg:text-2xl";
    case "h5":
      return "text-xl lg:text-xl";
    case "h6":
      return "text-xl";
  }
};

export function Headline(props: HeadlineProps) {
  const { className, children, variant, as: CustomComponent } = props;

  const headlineClass = getVariantClasses(variant);

  return (
    <CustomComponent
      className={clsx("font-bold block mb-4", headlineClass, className)}
    >
      {children}
    </CustomComponent>
  );
}
