type ImageAdd01Props = {
  size: string;
  className?: string;
};

export const ImageAddIcon = ({ size, className }: ImageAdd01Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="currentColor"
    >
      <path d="M11.508 2.99c-4.483 0-6.724 0-8.117 1.392C2 5.774 2 8.015 2 12.496s0 6.722 1.392 8.114c1.393 1.392 3.634 1.392 8.117 1.392s6.724 0 8.117-1.392c1.392-1.392 1.392-3.633 1.392-8.114v-.5" />
      <path d="M4.999 20.99c4.21-4.752 8.94-11.053 16-6.327M17.996 1.998v8.008M22 5.977l-8.01.015" />
    </g>
  </svg>
);

type Image01Props = {
  size: string;
};

export const ImageIcon = ({ size }: Image01Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="currentColor"
    >
      <circle cx="7.5" cy="7.5" r="1.5" />
      <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
      <path d="M5 21c4.372-5.225 9.274-12.116 16.498-7.458" />
    </g>
  </svg>
);
type BackgroundProps = {
  size: string;
};

export const BackgroundIcon = ({ size }: BackgroundProps) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M4.253 20.302C5.655 21.5 7.77 21.5 12 21.5s6.345 0 7.747-1.198q.3-.256.555-.555C21.5 18.345 21.5 16.23 21.5 12s0-6.345-1.198-7.747q-.256-.3-.555-.555C18.345 2.5 16.23 2.5 12 2.5s-6.345 0-7.747 1.198q-.3.256-.555.555C2.5 5.655 2.5 7.77 2.5 12s0 6.345 1.198 7.747q.256.3.555.555M4 20L20 4M2.698 15.802L15.806 2.694m5.5 5.5L8.198 21.302m5.302.198l8-8m-19-3l8-8"
    />
  </svg>
);

type ResizeFieldProps = {
  size: string;
};

export const ResizeIcon = ({ size }: ResizeFieldProps) => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m16 18l2-2m-7 2l7-7M6 18L18 6"
    />
  </svg>
);

type ImageDownload02Props = {
  size: string;
};

export const ImageDownloadIcon = ({ size }: ImageDownload02Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="currentColor"
    >
      <path d="M5 21c4.21-4.751 8.941-11.052 16-6.327" />
      <path d="M14 3.002C13.53 3 12.03 3 11.5 3C7.022 3 4.782 3 3.391 4.391S2 8.021 2 12.5c0 4.478 0 6.718 1.391 8.109S7.021 22 11.5 22c4.478 0 6.718 0 8.109-1.391c1.338-1.339 1.389-3.462 1.39-7.609" />
      <path d="M17 7.5c.491.506 1.8 2.5 2.5 2.5M22 7.5c-.491.506-1.8 2.5-2.5 2.5m0 0V2" />
    </g>
  </svg>
);
type GithubProps = {
  size: string;
};

export const GithubIcon = ({ size }: GithubProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="currentColor"
    >
      <path d="M10 20.568c-3.429 1.157-6.286 0-8-3.568" />
      <path d="M10 22v-3.242c0-.598.184-1.118.48-1.588c.204-.322.064-.78-.303-.88C7.134 15.452 5 14.107 5 9.645c0-1.16.38-2.25 1.048-3.2c.166-.236.25-.354.27-.46c.02-.108-.015-.247-.085-.527c-.283-1.136-.264-2.343.16-3.43c0 0 .877-.287 2.874.96c.456.285.684.428.885.46s.469-.035 1.005-.169A9.5 9.5 0 0 1 13.5 3a9.6 9.6 0 0 1 2.343.28c.536.134.805.2 1.006.169c.2-.032.428-.175.884-.46c1.997-1.247 2.874-.96 2.874-.96c.424 1.087.443 2.294.16 3.43c-.07.28-.104.42-.084.526s.103.225.269.461c.668.95 1.048 2.04 1.048 3.2c0 4.462-2.134 5.807-5.177 6.643c-.367.101-.507.559-.303.88c.296.47.48.99.48 1.589V22" />
    </g>
  </svg>
);
type NewTwitterProps = {
  size: string;
};

export const TwitterIcon = ({ size }: NewTwitterProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m3 21l7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548"
      color="currentColor"
    />
  </svg>
);
type CheckmarkBadge03Props = {
  size: string;
};

export const CheckmarkBadgeIcon = ({ size }: CheckmarkBadge03Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      color="currentColor"
    >
      <path d="M14.262 3.6C13.196 2.532 12.662 2 12 2s-1.196.533-2.262 1.6c-.64.64-1.274.936-2.186.936c-.796 0-1.93-.154-2.552.473c-.618.623-.464 1.752-.464 2.543c0 .912-.297 1.546-.937 2.186C2.533 10.804 2 11.338 2 12s.533 1.196 1.6 2.262c.716.717.936 1.18.936 2.186c0 .796-.154 1.93.473 2.552c.623.617 1.752.464 2.543.464c.971 0 1.44.19 2.133.883c.59.59 1.381 1.653 2.315 1.653s1.725-1.063 2.315-1.653c.694-.693 1.162-.883 2.133-.883c.791 0 1.92.154 2.543-.464m1.41-9.262C21.467 10.804 22 11.338 22 12s-.533 1.196-1.6 2.262c-.716.717-.936 1.18-.936 2.186c0 .796.154 1.93-.473 2.552m0 0H19" />
      <path d="M8 10.308S10.25 10 12 14c0 0 5.059-10 10-12" />
    </g>
  </svg>
);
