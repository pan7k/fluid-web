import React, { Children, FC, ReactNode } from "react";
import { Theme } from "../theme/interfaces";
import { sx } from "../theme/utils/sx";

export interface NavigationProps {
  children: ReactNode;
  variant?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  classes?: Theme["navigation"];
}

export const Navigation: FC<NavigationProps> = ({
  children,
  variant = "vertical",
  size = "md",
  classes,
}) => {
  return (
    <nav
      className={sx(
        "navigation",
        `navigation-${variant}`,
        `navigation-${size}`,
        classes?.navigation,
      )}
      role="navigation"
    >
      <ul className={sx("navigation-list", classes?.list)}>
        {Children.map(children, (child, index) => (
          <li key={index} className={sx("navigation-item", classes?.item)}>
            {child}
          </li>
        ))}
      </ul>
    </nav>
  );
};
