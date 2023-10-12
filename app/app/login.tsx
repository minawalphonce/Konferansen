import { object, string } from "yup";
import { Screen, Box, Image, Text, Button, Form, TextField, SubmitField } from "../components";
import { useRouter } from "expo-router";
import { useAppStoreActions } from "../store";

const particleImg = require("../assets/images/partials.png")

const loginForm = object({
    "phone": string().required().matches(/[+]467\d{8}/, { "message": "phone number must start with +46" }),
    "code": string().required()
})

function Login() {
    const login = useAppStoreActions(state => state.login);
    const router = useRouter();
    return (
        <Screen>
            <Box flex={1} justifyContent="center" alignItems="center" borderColor="primary.100" gap="2xl">
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
                            <TextField name="code" label="Code" requiredIndicator keyboardType="default" />
                            <SubmitField variant="round" onSubmit={async (values: { phone: string, code: string }) => {
                                const error = await login(values);
                                if (!error)
                                    router.push("/(app)/(tabs)/(home)");
                            }}>Login</SubmitField>
                        </Form>
                    </Box>
                </Box>
            </Box>
        </Screen>
    );
}


export default Login;

