import { useEffect, useState, Fragment } from "react";
import { Box, Card, CardHeader, CardContent, Grid, Stack, Button, TextField as MUITextField } from "@mui/material";
import { useGetIdentity, useTranslate } from "react-admin";
import AddIcon from "@mui/icons-material/Add";

import { addGroupScore, subscibeToGroupsScoreCalculator } from "../providers";

export const Score = () => {
    const { data } = useGetIdentity();
    const [groupScores, setGroupScores] = useState<Record<string, number>>({});
    const translate = useTranslate();

    useEffect(() => {
        const unsb = subscibeToGroupsScoreCalculator((values) => {
            setGroupScores(values);
        });
        return () => {
            if (unsb)
                unsb();
        }
    }, []);

    return (<Box marginTop={3} position="relative">
        <Card>
            <CardHeader title={translate("common.score")} />
            <CardContent>
                <Grid container gap={1}>
                    <Grid item xs={12}>
                        <form onSubmit={e => {
                            e.preventDefault();
                            const formValues = Object.fromEntries(new FormData(e.currentTarget));
                            addGroupScore(
                                parseInt(formValues.team.toString()),
                                parseFloat(formValues.value.toString()),
                                data?.fullName || ""
                            );
                        }}>
                            <Stack direction="row" gap={2}>
                                <MUITextField name="team" label={translate("common.teams")} variant="outlined" required select SelectProps={{ native: true }}>
                                    <option value="1">{translate("teams.1")}</option>
                                    <option value="2">{translate("teams.2")}</option>
                                    <option value="3">{translate("teams.3")}</option>
                                    <option value="4">{translate("teams.4")}</option>
                                    <option value="5">{translate("teams.5")}</option>
                                    <option value="6">{translate("teams.6")}</option>
                                </MUITextField>
                                <MUITextField name="value" type="number" variant="outlined" label={translate("common.values")} />
                                <Button endIcon={<AddIcon />} variant="contained" sx={{ margin: 1 }} type="submit">{translate("common.add")}</Button>
                            </Stack>
                        </form>
                    </Grid>
                    {Object.entries(groupScores || {}).map(([group, score]) => {
                        return (
                            <Fragment key={group}>
                                <Grid item xs={1} sx={{ backgroundColor: "lightGrey", textAlign: "center", padding: 1 }}>
                                    {translate('teams.' + group)}
                                </Grid>
                                <Grid item xs={3} sx={{ padding: 1 }}>
                                    {score}
                                </Grid>
                                <Grid item xs={7} />
                            </Fragment>
                        )
                    })}
                </Grid>
            </CardContent>
        </Card>
    </Box>)
}