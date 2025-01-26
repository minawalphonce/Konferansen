import { KeyboardAvoidingView } from "react-native";
import { number, object, string } from "yup";
import { useRouter } from "expo-router";

import { Screen, Box, Image, Text, Form, TextField, SubmitField } from "../components";
import { useAppStoreActions } from "../store";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslate } from "react-polyglot";
import { useMemo } from "react";

const particleImg = require("../assets/images/partials.png")

function Login() {
    const login = useAppStoreActions(state => state.login);
    const router = useRouter();
    const translate = useTranslate();

    const loginForm = useMemo(() => {
        return object({
            "phone": string()
                .required(translate("login.phoneRequiredMessage"))
                .matches(/[+]467\d{8}/, translate("login.phoneFormatMessage")),
            "pin": number()
                .required(translate("login.pinRequired"))
                .integer(translate("login.pinNumberMessage"))
        });
    }, [translate]);
    return (
        <Screen>
            <KeyboardAvoidingView>
                <ScrollView automaticallyAdjustKeyboardInsets showsVerticalScrollIndicator={false}>
                    <Box paddingTop="3xl" justifyContent="center" alignItems="center" borderColor="primary.100" gap="2xl">
                        <Image source={particleImg} />
                        <Box gap="2xl" width="100%">
                            <Box>
                                <Text textAlign="center" variant="h4">
                                    {translate("login.title")}
                                </Text>
                            </Box>
                            <Box gap="md">
                                <Form yupRules={loginForm}>
                                    <TextField name="phone" label={translate("login.phoneLabel")} requiredIndicator keyboardType="phone-pad" />
                                    <TextField name="pin" label={translate("login.pinLabel")} requiredIndicator keyboardType="number-pad" />
                                    <SubmitField variant="round" onSubmit={async (values: { phone: string, pin: number }) => {
                                        const error = await login(values);
                                        if (error) {
                                            alert(translate("login.invalidCredsMessage"))
                                        }
                                        else
                                            router.push("/(app)/(tabs)/(home)");
                                    }}>{translate("login.loginSubmitText")}</SubmitField>
                                </Form>
                            </Box>
                        </Box>
                    </Box>
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
}


export default Login;

