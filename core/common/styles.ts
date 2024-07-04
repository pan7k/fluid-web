import { css } from "styled-components";

export const unselectable = css({
  WebKitUserSelect: "none",
  MozUserSelect: "none",
  MsUserSelect: "none",
  userSelect: "none",
});
