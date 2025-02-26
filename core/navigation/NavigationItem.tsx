import React, { FC } from "react";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";
import { Theme } from "../theme/interfaces";
import { sx } from "../theme/utils/sx";

export interface NavigationItemProps {
  label: string;
  icon?: IconSymbol;
  iconVariant?: IconVariant;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  classes?: Theme["navigationItem"];
}

export const NavigationItem: FC<NavigationItemProps> = ({
  label,
  icon,
  iconVariant = "regular",
  active,
  disabled,
  onClick,
  classes,
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={sx(
        "navigationItem",
        { "navigationItem-active": active },
        { "navigationItem-disabled": disabled },
        classes?.navigationItem,
      )}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
    >
      {icon && (
        <div className={sx("navigationItem-icon", classes?.icon)}>
          <Icon symbol={icon} variant={iconVariant} size="sm" />
        </div>
      )}
      <span className={sx("navigationItem-label", classes?.label)}>
        {label}
      </span>
    </button>
  );
};
