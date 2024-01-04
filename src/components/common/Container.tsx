import { clsx } from "clsx";
import { HTMLAttributes, forwardRef } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children }: ContainerProps, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("relative max-w-6xl mx-auto px-6 xl:px-0", className)}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
