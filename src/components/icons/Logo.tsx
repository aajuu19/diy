import clsx from "clsx";

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1305 227"
      className={clsx("text-base", className)}
    >
      <defs>
        <image
          width="512"
          height="512"
          id="img1"
          href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDE2IDE2IiBpZD0ib3JpZ2FtaSI+PHBhdGggZmlsbD0iI2YzOWIyMSIgZD0iTTUgLjVhLjUuNSAwIDAgMC0uOC0uNGwtNCAzYS41LjUgMCAwIDAgLjMuOWg0YS41LjUgMCAwIDAgLjUtLjV6IiBjbGFzcz0iY29sb3IyMTk2ZjMgc3ZnU2hhcGUiPjwvcGF0aD48cGF0aCBmaWxsPSIjZmZiZjY2IiBkPSJtOC45NjggNC4zMjQtMS41LTRBLjUuNSAwIDAgMCA3IDBINC41YS41LjUgMCAwIDAtLjUuNXY4YS41LjUgMCAwIDAgLjg1NC4zNTRsNC00YS41LjUgMCAwIDAgLjExNC0uNTN6TTE0LjgyMSAxNC4xMTdsLTMuODktMy4yNmEuNDgyLjQ4MiAwIDAgMC0uMzcxLS4xMTQuNS41IDAgMCAwLS4zNDEuMTg1bC0yLjYxIDMuMjZBLjUuNSAwIDAgMCA4IDE1aDYuNWEuNS41IDAgMCAwIC4zMjEtLjg4M3oiIGNsYXNzPSJjb2xvcjY0YjVmNiBzdmdTaGFwZSI+PC9wYXRoPjxwYXRoIGZpbGw9IiNmMzliMjEiIGQ9Ik0xNS45NDUgNC4yNzNBLjUuNSAwIDAgMCAxNS41IDRoLTdhLjUuNSAwIDAgMC0uMzU0LjE0NmwtNCA0YS41LjUgMCAwIDAtLjA3OS42MDVsMy41IDZhLjUuNSAwIDAgMCAuNC4yNDdIOGEuNS41IDAgMCAwIC4zOS0uMTg3bDIuNjI1LTMuMjc4IDQuODg1LTYuNzRhLjUuNSAwIDAgMCAuMDQ1LS41MnoiIGNsYXNzPSJjb2xvcjIxOTZmMyBzdmdTaGFwZSI+PC9wYXRoPjwvc3ZnPg=="
        />
      </defs>
      <use href="#img1" transform="matrix(.461,0,0,.461,4,3)" />
      <path
        fill="currentColor"
        d="m301.6 177.7l-16 1.9v11.4h52.8v-11.4l-19.2-1.9 7.3-83.2 2.8-34.8 9.7 34.2 28.1 91.2h20.2l27.5-96.1 7-29.3 3.7 34.8 8.3 83.2-16.7 1.9v11.4h60.6v-11.4l-15.4-2.1-15.2-113.4 20.7-2.5v-11.8h-58.7l-22.4 81.7-4.6 22.3-5.3-22.3-22.6-81.7h-59.3v11.8l20.5 2.5zm199.2 0l-15 1.9v11.4h109.2l4.9-34.8-14.2-4-11 24.3-46 2.3v-53.6l26.4 0.6 3 16.4h12.2v-46h-12.2l-3 15.6-26.4 0.5v-51.1l41 1.7 6.3 18.8h13.3l-2.5-31.9h-101.2v11.8l15.2 2.5zm126.9 0l-16.2 1.9v11.4h60.8v-11.2l-16.7-2.1v-113.7l16.7-2.4v-11.8h-60.8v11.8l16.2 2.4zm75.8 0l-15 1.9v11.4h50.3v-11.4l-19.2-1.9v-101.6l13.3 25.1 59.1 89.8h23v-126.9l14.7-2.4v-11.8h-47.2v11.8l16.4 2.4v92.9l-10.7-21.6-56.6-85.5h-43.1v11.8l15 2.4zm228.6-56.4h-77.4v17.9h77.4zm43.7 56.4l-15 1.9v11.4h28.8c8.4 0 20.6 1.1 30.4 1.5 44.3 1 72.4-31.5 72.4-76.9 0-41.8-22-67.1-69.7-67.1-11.8 0-21.3 1.3-33.4 1.3h-27.8v11.8l14.3 2.5zm27.5 0.5v-116.2c3.1-0.2 8-1.4 15-1.4 30.8 0 43.7 22.8 43.7 59.3 0 41-16.3 59.7-40.6 60-6.5 0-12.4-0.1-18.1-1.7zm119.5-0.5l-16.1 1.9v11.4h60.8v-11.2l-16.7-2.1v-113.7l16.7-2.4v-11.8h-60.8v11.8l16.1 2.4zm101.7 0l-20.2 1.9v11.4h70.1v-11.4l-20.7-1.9v-42.9l37.8-70.9 11.8-2.2v-11.8h-46.3v11.8l14.8 2.4-21.9 46.6-5.5 13.1-5.3-13.1-23.7-46.6 13.4-2.4v-11.8h-55.8v11.8l10.8 2.4 40.7 70.9z"
      />
    </svg>
  );
};
