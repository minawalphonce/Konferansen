import { useCallback, useState, FormEvent } from 'react';
import { Card, Box, CardContent, CardHeader, Stack, Button, TextField, Alert, AlertTitle } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { sendNotifications } from '../providers';
import { useTranslate } from 'react-admin';

const SuccessAlert = () => {
    return (
        <Alert severity="success"
            sx={{ zIndex: 9999999, position: "absolute", right: 0 }}>
            <AlertTitle>Success</AlertTitle>
            Message sent — <strong>check it out!</strong>
        </Alert>
    );
}


export const Notifications = () => {
    const translate = useTranslate();
    const [messageSent, setMessageSent] = useState(false);
    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formValues = Object.fromEntries(new FormData(e.currentTarget));
        await sendNotifications(
            formValues.topic.toString() as any,
            formValues.title.toString(),
            formValues.body.toString());
        setMessageSent(true);
        setTimeout(() => {
            setMessageSent(false);
        }, 3000);
    }, [])
    return (
        <Box marginTop={3} position="relative">
            {messageSent && <SuccessAlert />}
            <Card>
                <CardHeader title="Notifications" />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Stack>
                            <TextField name="topic" label="Topic" variant="outlined" required select SelectProps={{ native: true }}>
                                <option value="all">All</option>
                                <option value="1">{translate("teams.1")}</option>
                                <option value="2">{translate("teams.2")}</option>
                                <option value="3">{translate("teams.3")}</option>
                                <option value="4">{translate("teams.4")}</option>
                                <option value="5">{translate("teams.5")}</option>
                                <option value="6">{translate("teams.6")}</option>
                            </TextField>
                            <TextField name="title" label="Title" variant="outlined" required />
                            <TextField name="body" label="Body" multiline variant="outlined" required rows={5} />
                            <Button variant="contained" type="submit">
                                Send&nbsp;
                                <SendIcon />
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>
        </Box >
    )
}