import { Card, CardContent } from '@mui/material';
import ChurchIcon from '@mui/icons-material/Church';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import WcIcon from '@mui/icons-material/Wc';
import { DatagridConfigurable, List, ChipField, TextField, SelectField, TopToolbar, SelectColumnsButton, FilterButton, TextInput, SavedQueriesList, FilterLiveSearch, FilterList, FilterListItem, useTranslate, ImageField } from 'react-admin';


const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
    </TopToolbar>
);

export const FilterSidebar = () => {
    const translate = useTranslate();
    return (<Card sx={{ order: -1, mr: 2, mt: 6, width: 200 }}>
        <CardContent>
            <SavedQueriesList />
            <FilterLiveSearch source='Name' />
            <FilterList label={translate("resources.Members.fields.Churche")} icon={<ChurchIcon />}>
                <FilterListItem label="St Mina" value={{ Churche: 'St Mina' }} />
                <FilterListItem label="St Marcus" value={{ Churche: 'St Marcus' }} />
                <FilterListItem label="St Mary" value={{ Churche: 'St Mary' }} />
                <FilterListItem label="St Paula" value={{ Churche: 'St Paula' }} />
                <FilterListItem label="St George" value={{ Churche: 'St George' }} />
            </FilterList>
            <FilterList label={translate("resources.Members.fields.Group")} icon={<CategoryIcon />}>
                <FilterListItem label="Lila" value={{ Group: 'lila' }} />
                <FilterListItem label="Grön" value={{ Group: 'Grön' }} />
            </FilterList>
            <FilterList label={translate("resources.Members.fields.Gender")} icon={<WcIcon />}>
                <FilterListItem label={translate("common.gender.male", { smart_count: 10 })} value={{ Gender: 'M' }} />
                <FilterListItem label={translate("common.gender.female", { smart_count: 10 })} value={{ Gender: 'F' }} />
            </FilterList>
        </CardContent>
    </Card>
    );
}


export const MemberList = () => {
    const translate = useTranslate();
    return (
        <List actions={<ListActions />} aside={<FilterSidebar />}>
            <DatagridConfigurable rowClick="expand" bulkActionButtons={false}>
                <TextField source="Name" />
                <TextField source="Phone" />
                <TextField source="Churche" />
                <SelectField source="Gender" choices={[
                    { id: 'M', name: translate("common.gender.male", { smart_count: 1 }) },
                    { id: 'F', name: translate("common.gender.female", { smart_count: 1 }) },
                ]} />
                <TextField source="Grade" />
                <ChipField source="Group" color="primary" />
                <TextField source="Bulding" />
                <TextField source="Room" />
            </DatagridConfigurable>
        </List>
    );
}

