import { useState } from "react"
import { Box } from "../atoms/box"
import { Text } from "../atoms/text"
import { TextInput } from "../atoms/text-input"
import { Message } from "../atoms/message"

export type FieldProps = {
    keyboardType?: "default" | "number-pad" | "decimal-pad" | "numeric" | "email-address" | "phone-pad" | "url",
    requiredIndicator?: boolean,

    status?: "error" | "warning" | "success";
    disabled?: boolean,

    label: string,
    helpText?: string,
    message?: string,

    value: any,
    onChange: (val: string) => void
}

export const Field = (
    { keyboardType = "default",
        requiredIndicator =
        false, label,
        helpText,
        status,
        message,
        onChange,
        value,
        disabled }: FieldProps) => {
    const [isFocus, setIsFocus] = useState(false);
    return (
        <Box gap="md">
            <Box paddingHorizontal="xl">
                <Text>
                    {label}
                    <Text color="status.error">
                        {requiredIndicator ? "*" : ""}
                    </Text>
                </Text>
            </Box>
            <Box>
                <TextInput
                    editable={!disabled}
                    keyboardType={keyboardType}
                    autoCorrect={false}
                    onChangeText={onChange}
                    value={value}
                    variant={
                        disabled
                            ? "disabled"
                            : isFocus
                                ? "active"
                                : status}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)} />
            </Box>
            {message && <Message variant={status}>
                {message}
            </Message>}
            {helpText && <Box paddingHorizontal="xl">
                <Text opacity={0.6} variant="paragraphSmall" fontWeight="regular">{helpText}</Text>
            </Box>}
        </Box>
    );
}