import { ForwardedRef, forwardRef } from "react";
import styled from "styled-components";
import { Popover } from "@headlessui/react";
import tw from "twin.macro";

export declare type PopoverProps = {
  className?: string;
  button?: any;
  disabled?: boolean;
  key?: any;
  isOpen?: boolean;
  children?: any;
};

const Template = (
  { className, children, button, isOpen, key, disabled }: PopoverProps,
  ref: ForwardedRef<any>
) => {
  return (
    <div className={className} key={key} ref={ref}>
      <Popover className="popoverstyle">
        <Popover.Button disabled={disabled}>{button}</Popover.Button>
        <Popover.Panel className="panel" static={isOpen}>
          {children}
        </Popover.Panel>
      </Popover>
    </div>
  );
};

const Referable = forwardRef(Template);

export const PopoverButton = styled(Referable)`
  & .popoverstyle {
    ${tw`relative`}
  }

  & .popoverstyle > button {
    ${tw`w-full`}
    ${tw`bg-transparent`}
    ${tw`border-0`}
  }

  & .popoverstyle > button:focus-visible {
    ${tw`outline-none`}
  }

  & .panel {
    ${tw`my-1`}
    ${tw`px-1`}
    ${tw`w-full`}
    ${tw`flex`}
    ${tw`flex-col`}
    ${tw`gap-1`}
    ${tw`relative`}
    ${tw`lg:absolute`}
    ${tw`bg-white`}
    ${tw`text-black`}
    ${tw`list-none`}
    ${tw`rounded-lg`}
    ${tw`border-2`}
    ${tw`z-50`}
  }

  & .menuItem {
    ${tw`flex`}
    ${tw`items-center`}
    ${tw`my-0`}
    ${tw`py-5`}
    ${tw`px-5`}
    ${tw`cursor-pointer`}
  }
  & .panel > .menuItem.notActive {
    ${tw`text-black`}
  }
`;

export const PopoverButtonMenu = styled(PopoverButton)`
  & .panel {
    ${tw`py-1`}
    ${tw`relative`}
    ${tw`gap-1`}
    ${tw`bg-blue-800`}
    ${tw`border-0`}
  }
  & .panel > .menuSubItem {
    ${tw`p-3`}
    ${tw`text-black`}
    ${tw`cursor-pointer`}
    ${tw`flex`}
    ${tw`items-center`}
    ${tw`text-white`}
    ${tw`rounded-lg`}
    ${tw`text-xs`}
  }

  & .panel > .menuSubItem:hover {
    ${tw`font-bold`}
  }
  & .panel > .menuSubItem.active {
    ${tw`font-bold`}
    ${tw`bg-transparent`}
  }
`;

export const PopoverButtonMasterData = styled(PopoverButton)`
  & .panel {
    ${tw`my-1`}
    ${tw`relative`}
    ${tw`w-full`}
    ${tw`right-0`}
  }
`;

export const PopoverButtonRight = styled(PopoverButton)`
  & .popoverstyle {
    ${tw`block`}
    ${tw`lg:flex`}
  }

  & .panel {
    ${tw`top-10`}
    ${tw`w-56`}
  }
`;

export const PopoverButtonToLeft = styled(PopoverButton)`
  & .panel {
    ${tw`top-10`}
    ${tw`right-0`}
    ${tw`w-56`}
  }
`;

export const PopoverButtonTop = styled(PopoverButton)`
  & .popoverstyle {
    ${tw`static`}
  }

  & .panel {
    ${tw`-top-20`}
    ${tw`w-auto`}
  }
`;
