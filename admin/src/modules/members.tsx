import { useCallback, useEffect, useState } from 'react';
import { FormControlLabel, useMediaQuery, IconButton, Card, CardContent, Stack, CardHeader, Button, Box, Grid, Checkbox, TextField as MUITextField, Alert, AlertTitle, Typography } from '@mui/material';
import ChurchIcon from '@mui/icons-material/Church';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WcIcon from '@mui/icons-material/Wc';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { SimpleListConfigurable, Labeled, DatagridConfigurable, List, TextField, SelectField, TopToolbar, SelectColumnsButton, SavedQueriesList, FilterLiveSearch, FilterList, FilterListItem, useTranslate, useRecordContext, Show, useGetIdentity } from 'react-admin';
import { useNavigate } from "react-router-dom";

import { AvatarField } from '../components/avatar';
import memory from "../assets/memory.json";
import { updateMemory, subscibeToMemory, addMemberScore, subscibeToMemberScoreCalculator } from "../providers";


const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
    </TopToolbar>
);

const FilterSidebar = () => {
    const translate = useTranslate();
    const [toggle, setToggle] = useState(false);
    return (
        <Card>
            <CardHeader
                title={!toggle && translate("common.filters")}
                action={
                    <IconButton aria-label="settings" onClick={() => setToggle(!toggle)}>
                        {toggle ? <OpenInFullIcon /> : <CloseFullscreenIcon />}
                    </IconButton>
                } />
            <CardContent hidden={toggle}>
                <SavedQueriesList />
                <FilterLiveSearch source='Name' />
                <FilterList label={translate("resources.Members.fields.Churche")} icon={<ChurchIcon />}>
                    <FilterListItem label="St Mina" value={{ Churche: 'St Mina' }} />
                    <FilterListItem label="St Marc" value={{ Churche: 'St Marc' }} />
                    <FilterListItem label="St Mary" value={{ Churche: 'St Mary' }} />
                    <FilterListItem label="St Paula" value={{ Churche: 'St Paula' }} />
                    <FilterListItem label="St George" value={{ Churche: 'St George' }} />
                    <FilterListItem label="Arch Mickeal" value={{ Churche: 'Arch Mickeal' }} />
                </FilterList>
                <FilterList label={translate("resources.Members.fields.Group")} icon={<CategoryIcon />}>
                    <FilterListItem label={translate("teams.1")} value={{ GroupId: 1 }} />
                    <FilterListItem label={translate("teams.2")} value={{ GroupId: 2 }} />
                    <FilterListItem label={translate("teams.3")} value={{ GroupId: 3 }} />
                    <FilterListItem label={translate("teams.4")} value={{ GroupId: 4 }} />
                    <FilterListItem label={translate("teams.5")} value={{ GroupId: 5 }} />
                    <FilterListItem label={translate("teams.6")} value={{ GroupId: 6 }} />
                </FilterList>
                <FilterList label={translate("resources.Members.fields.Gender")} icon={<WcIcon />}>
                    <FilterListItem label={translate("common.gender.male", { smart_count: 10 })} value={{ Gender: 'M' }} />
                    <FilterListItem label={translate("common.gender.female", { smart_count: 10 })} value={{ Gender: 'F' }} />
                </FilterList>
            </CardContent>
        </Card>
    );
}

const NameTitle = () => {
    const record = useRecordContext();
    // the record can be empty while loading
    if (!record) return null;
    return (<span>
        {record.Name}
    </span>)
};

export const MemberList = () => {
    const translate = useTranslate();
    const isSmall = useMediaQuery(
        (theme: any) => theme.breakpoints.down('sm'),
        { noSsr: true }
    );
    return (
        <List actions={<ListActions />} aside={<FilterSidebar />}>
            {isSmall ? (
                <SimpleListConfigurable
                    linkType="show"
                    rowSx={() => ({ backgroundColor: "#fff", borderBottom: "1px solid lightgray" })}
                    primaryText={record => record.Name}
                    secondaryText={record => record.Group || ""}
                    tertiaryText={record => `${record.Building || ""} ${record.Room || ""}`}
                    leftAvatar={() => <AvatarField source='Profile' emptyText='Name' />}
                />
            ) :
                (
                    <DatagridConfigurable rowClick="show" bulkActionButtons={false}>
                        <AvatarField source='Profile' emptyText='Name' />
                        <TextField source="Name" />
                        <TextField source="Phone" />
                        <TextField source="Churche" />
                        <SelectField source="Gender" choices={[
                            { id: 'M', name: translate("common.gender.male", { smart_count: 1 }) },
                            { id: 'F', name: translate("common.gender.female", { smart_count: 1 }) },
                        ]} />
                        <TextField source="Grade" />
                        <TextField source="Group" />
                        <TextField source="Building" />
                        <TextField source="Room" />
                    </DatagridConfigurable>)

            }
        </List >
    );
}


const MemoryAside = () => {
    const record = useRecordContext();
    const { data } = useGetIdentity();

    const [todoList, setToDoList] = useState<string[]>([]);

    useEffect(() => {
        if (record && record.Phone && data) {
            const unsubscribe = subscibeToMemory(record.Phone, (items) => {
                setToDoList(items.map(i => i.memoryId));
            });
            return () => {
                unsubscribe()
            }
        }
    }, [record, data]);

    const onCheck = useCallback((memoryId: string, checked: boolean) => {
        updateMemory(record.Phone, memoryId, data?.fullName || "UNKNOWN", checked);
    }, [record, data]);

    if (!record)
        return null;
    return (
        <Card variant="outlined">
            <CardHeader title="Memory" />
            <CardContent>
                <Stack>
                    {memory.map((item) => {
                        return (
                            <FormControlLabel
                                key={item.id}
                                control={<Checkbox
                                    value={item.id}
                                    checked={todoList.includes(item.id)}
                                    color="primary"
                                    onChange={(e) => {
                                        onCheck(item.id, e.target.checked);
                                    }} />}
                                label={item.title}
                            />
                        )
                    })}
                </Stack>
            </CardContent>
        </Card>
    )
}

const SuccessAlert = () => {
    return (
        <Alert severity="success"
            sx={{ zIndex: 9999999, position: "absolute", right: 0 }}>
            <AlertTitle>Success</AlertTitle>
            Message sent — <strong>check it out!</strong>
        </Alert>
    );
}


const ScoreAside = () => {
    const [totalScore, setTotalScore] = useState(0);
    const [score, setScore] = useState<string>("0");
    const [showSuccess, setShowSuccess] = useState(false);
    const record = useRecordContext();
    const { data } = useGetIdentity();


    useEffect(() => {
        if (record && record.Phone && data) {
            const unsb = subscibeToMemberScoreCalculator(record.Phone, (value) => {
                setTotalScore(value);
            });

            return () => {
                if (unsb)
                    unsb();
            }
        }
    }, [record, data])

    if (!record || !data) {
        return null;
    }

    const addHandler = async () => {
        await addMemberScore(record.Phone, parseFloat(score), data.fullName!);
        setShowSuccess(true);
        setScore("0");
        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    if (!record)
        return null;
    return (
        <>
            <Card sx={{ marginTop: 3, position: "relative" }} variant="outlined">
                {showSuccess && <SuccessAlert />}
                <CardHeader title="Score" />
                <CardContent>
                    <Stack>
                        <Typography>Total Score: {totalScore}</Typography>
                        <Stack direction="row">
                            <MUITextField type="number" variant="outlined" label="Value" value={score} onChange={e => setScore(e.currentTarget.value)} />
                            <Button endIcon={<AddIcon />} variant="contained" sx={{ margin: 1 }} onClick={addHandler}>Add</Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}

export const ShowMember = () => {
    const translate = useTranslate();
    const navigate = useNavigate();
    return (
        <Show component={Box} title={<NameTitle />} sx={{ backgroundColor: "transparent" }}  >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box>
                        <Button component="label" variant="contained" startIcon={<ArrowBackIcon />} onClick={() => { navigate("/Members") }} >
                            {translate("common.back")}
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={8}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Stack gap={2} padding={4}>
                                        <Stack direction="row" alignItems="center" gap={1}  >
                                            <AvatarField source='Profile' emptyText='Name' />
                                            <TextField source="Name" />
                                        </Stack>
                                        <Labeled direction="row" gap={1}>
                                            <TextField source="Phone" />
                                        </Labeled>
                                        <Labeled direction="row" gap={1}>
                                            <TextField source="Grade" />
                                        </Labeled>
                                        <Labeled direction="row" gap={1}>
                                            <SelectField source="Gender" choices={[
                                                { id: 'M', name: translate("common.gender.male", { smart_count: 1 }) },
                                                { id: 'F', name: translate("common.gender.female", { smart_count: 1 }) },
                                            ]} />
                                        </Labeled>
                                        <Labeled direction="row" gap={1}>
                                            <TextField source="Churche" />
                                        </Labeled>
                                        <Labeled direction="row" gap={1}>
                                            <TextField source="Group" emptyText='NOT SET YET' />
                                        </Labeled>
                                        <Labeled direction="row" gap={1}>
                                            <TextField source="Pin"></TextField>
                                        </Labeled>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MemoryAside />
                            <ScoreAside />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Show>
    )
}