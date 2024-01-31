import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";

declare type iconAnimationProps = {
  icon: any;
  className?: string;
  isAnimation: boolean;
  from: string;
  to?: string;
};

const TemplateIconWithAnimation = (
  props: iconAnimationProps,
  ref: ForwardedRef<any>
) => {
  return (
    <div className={props.className} ref={ref}>
      <FontAwesomeIcon
        icon={props.icon}
        className={`${!props.isAnimation ? props.from : props.to}`}
      />
    </div>
  );
};
const RefIconAnimation = forwardRef(TemplateIconWithAnimation);
export const IconWithAnimation = styled(RefIconAnimation)`
  & > .up {
    ${tw`duration-300`};
    transform: rotate(0deg);
  }
  & > .down {
    ${tw`duration-300`};
    transform: rotate(180deg);
  }
  & > .left {
    ${tw`duration-300`};
    transform: rotate(90deg);
  }
  & > .right {
    ${tw`duration-300`};
    transform: rotate(-90deg);
  }
`;
