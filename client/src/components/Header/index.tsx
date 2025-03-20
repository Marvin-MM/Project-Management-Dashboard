import React from "react";

type Props = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};

const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
  return (
    <div className="mb-4 md:mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallText ? "text-base md:text-lg" : "text-xl md:text-2xl"} font-bold dark:text-white`}
      >
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};

export default Header;
