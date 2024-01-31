import { Field } from "@tinqjs/tinjs-tw";
import { ForwardedRef, forwardRef, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import tw from "twin.macro";

export declare type InputFieldProps = {
  className?: string;
  label: string;
  info?: string;
  required?: boolean;
  children?: any;
};

const TemplateInputField = (props: InputFieldProps, ref: ForwardedRef<any>) => {
  return (
    <Field
      label={props.label}
      className={props.className}
      ref={ref}
      required={props.required}
    >
      {props.children}
      {!props.info ? null : (
        <span className="text-gray-600 text-xs">{props.info}</span>
      )}
    </Field>
  );
};

const ReferableInputField = forwardRef(TemplateInputField);

export const InputField = styled(ReferableInputField)`
  & > input:disabled {
    ${tw`!bg-gray-300`}
    ${tw`cursor-not-allowed`}
  }
  & > select:disabled {
    ${tw`!bg-gray-300`}
    ${tw`cursor-not-allowed`}
  }
`;
