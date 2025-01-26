import { PropsWithChildren } from "react";
import { FormProvider, useController, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type ObjectSchema } from "yup";

import { Field, FieldProps } from "../molecules/field";
import { Button, ButtonProps } from "../atoms/button";

export type FormProps = PropsWithChildren & {
    yupRules: ObjectSchema<any>
}

export const Form = ({ yupRules, children }: FormProps) => {
    const methods = useForm({
        resolver: yupResolver(yupRules),
        "mode": "all",
        defaultValues: yupRules.getDefault()
    });

    return (<FormProvider {...methods}>
        {children}
    </FormProvider>)
}

export type TextFieldProps = {
    name: string,
} & Omit<FieldProps, "onChange" | "value" | "message" | "status">

export const TextField = ({ name, ...rest }: TextFieldProps) => {
    const { field, fieldState } = useController({ name });
    return <Field
        value={field.value}
        onChange={field.onChange}
        message={fieldState.error?.message}
        status={fieldState.invalid ? "error" : undefined}
        {...rest}
    />
}

export type SubmitFieldProps = Omit<ButtonProps, "onPress"> & {
    onSubmit: (values: any) => any
}

export const SubmitField = ({ onSubmit, ...rest }: SubmitFieldProps) => {
    const { handleSubmit, formState } = useFormContext();

    return (
        <Button onPress={handleSubmit(onSubmit)} {...rest} />);
}