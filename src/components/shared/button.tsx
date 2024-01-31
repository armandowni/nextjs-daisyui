import { Button } from "@tinqjs/tinjs-tw";
import { ForwardedRef, forwardRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Switch, Tab } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

import Loading, { LoadingAction } from "./loading";

export declare type ButtonWtAnimationProps = {
  className?: string;
  children?: any;
  clickFunc?: Function;
  icon?: any;
  title?: string;
};

const ButtonAnimation = (
  { className, children, clickFunc, icon, title }: ButtonWtAnimationProps,
  ref: ForwardedRef<any>
) => {
  return (
    <Button
      className={`${className}`}
      type="button"
      onClick={() => clickFunc()}
      ref={ref}
    >
      <div className="btn-content">
        <FontAwesomeIcon icon={icon} />
        <span className="separator"></span>
        <div className="title">{title}</div>
      </div>
    </Button>
  );
};

const ReferableButtonWAnimation = forwardRef(ButtonAnimation);
export const BtnAnimation = styled(ReferableButtonWAnimation)`
  ${tw`flex`}
  ${tw`justify-start`}
  ${tw`overflow-hidden`}
  ${tw`text-black`}
  ${tw`duration-300`}
  ${tw`w-10`}
  ${tw`max-w-max`}
  ${tw`hover:w-full`}
  ${tw`bg-transparent`}
  ${tw`hover:bg-blue-500`}
  ${tw`hover:text-white`}
  
  &  > .btn-content {
    ${tw`flex`}
    ${tw`items-center`}
    ${tw`gap-3`}
  }
  & > .btn-content > .title {
    ${tw`w-max`}
  }
`;

export declare type SwitchButtonProps = {
  className?: string;
  children?: any;
  enabledSwitch: boolean;
  clickFunction: Function;
};

const TemplateSwitchButton = (
  { className, children, clickFunction, enabledSwitch }: SwitchButtonProps,
  ref: ForwardedRef<any>
) => {
  return (
    <span
      className={`cursor-pointer ${className}`}
      ref={ref}
      onClick={() => clickFunction()}
    >
      {enabledSwitch ? (
        <FontAwesomeIcon
          icon={faToggleOn}
          tw="text-blue-500 text-xl"
        ></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon icon={faToggleOff} tw="text-xl"></FontAwesomeIcon>
      )}
    </span>
  );
};

const ReferableSwitchButton = forwardRef(TemplateSwitchButton);
export const SwitchButton = styled(ReferableSwitchButton)``;

export const ActionButton = ({ icon, onClick }) => (
  <a
    tw="cursor-pointer"
    onClick={(e) => {
      e.preventDefault();
      if (onClick) onClick();
    }}
  >
    <FontAwesomeIcon icon={icon} />
  </a>
);

