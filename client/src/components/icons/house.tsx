import * as React from "react";

const HouseIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path d="M10 2v2.26l2 1.33V4h10v15h-5v2h7V2H10M7.5 5 0 10v11h15V10L7.5 5M14 6v.93L15.61 8H16V6h-2m4 0v2h2V6h-2M7.5 7.5 13 11v8h-3v-6H5v6H2v-8l5.5-3.5M18 10v2h2v-2h-2m0 4v2h2v-2h-2Z" />
  </svg>
);

export default HouseIcon;
