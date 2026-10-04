/* oxlint-disable next/no-img-element -- vector brand assets need no image optimization */

export function BrandLogo() {
  return (
    <span className="block w-[108px] sm:w-[136px]">
      <img
        src="/logo.svg"
        width={340}
        height={70}
        alt="giveidea"
        className="block h-auto w-full dark:hidden"
      />
      <img
        src="/logo-dark.svg"
        width={340}
        height={70}
        alt="giveidea"
        className="hidden h-auto w-full dark:block"
      />
    </span>
  );
}
