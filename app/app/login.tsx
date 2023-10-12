import { KeyboardAvoidingView } from "react-native";
import { number, object, string } from "yup";
import { useRouter } from "expo-router";

import { Screen, Box, Image, Text, Form, TextField, SubmitField } from "../components";
import { useAppStoreActions } from "../store";
import { ScrollView } from "react-native-gesture-handler";

const particleImg = require("../assets/images/partials.png")

const loginForm = object({
    "phone": string().required().matches(/[+]467\d{8}/, { "message": "phone number must start with +46" }),
    "pin": number().integer().required()
})

function Login() {
    const login = useAppStoreActions(state => state.login);
    const router = useRouter();
    return (
        <Screen>
            <KeyboardAvoidingView>
                <ScrollView automaticallyAdjustKeyboardInsets showsVerticalScrollIndicator={false}>
                    <Box paddingTop="3xl" justifyContent="center" alignItems="center" borderColor="primary.100" gap="2xl">
                        <Image source={particleImg} />
                        <Box gap="2xl" width="100%">
                            <Box>
                                <Text textAlign="center" variant="h4">
                                    Identify yourself
                                </Text>
                            </Box>
                            <Box gap="md">
                                <Form yupRules={loginForm}>
                                    <TextField name="phone" label="Phone" requiredIndicator keyboardType="phone-pad" />
                                    <TextField name="pin" label="Pin" requiredIndicator keyboardType="number-pad" />
                                    <SubmitField variant="round" onSubmit={async (values: { phone: string, pin: number }) => {
                                        const error = await login(values);
                                        if (error) {
                                            alert(`Pin or phone number are not correct`)
                                        }
                                        else
                                            router.push("/(app)/(tabs)/(home)");
                                    }}>Login</SubmitField>
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

