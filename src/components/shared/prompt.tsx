import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@tinqjs/tinjs-tw";
import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";

declare type PromptDelete = {
  icon?: any;
  className?: string;
  message: string;
  isLoadingActions?: boolean;
  onYes: () => void;
  onNo: () => void;
};

const TemplatePromptDelete = (props: PromptDelete, ref: ForwardedRef<any>) => {
  return (
    <div className={props.className} ref={ref}>
      <div className="message" tw="font-bold text-lg flex items-center gap-5">
        {props.icon ? (
          <FontAwesomeIcon
            icon={props.icon}
            tw="text-yellow-500"
            style={{
              fontSize: `3rem`,
            }}
          />
        ) : null}
        {props.message}
      </div>
      <div tw="flex flex-row-reverse justify-between">
        <Button
          tw="bg-red-500 px-3 py-1"
          onClick={props.onYes}
          disabled={props.isLoadingActions}
        >
          Yes
        </Button>
        <Button
          tw="bg-green-500 px-3 py-1"
          onClick={props.onNo}
          disabled={props.isLoadingActions}
        >
          No
        </Button>
      </div>
    </div>
  );
};

const RefPromptDelete = forwardRef(TemplatePromptDelete);

export const PromptDelete = styled(RefPromptDelete)`
  ${tw`flex`}
  ${tw`flex-col`}
  ${tw`gap-5`}
    
    & .message {
    ${tw`flex`}
    ${tw`items-center`}
    ${tw`gap-5`}
    ${tw`text-black`}
  }
`;
