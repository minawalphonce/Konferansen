import { FieldProps, useRecordContext } from "react-admin";
import Avatar from "@mui/material/Avatar";

const getFirstLetters = (user: string) => {
    const firstLetters: string[] = [];
    const words = user.toLocaleUpperCase().split(' ');

    words.map(word => firstLetters.push(word[0]));

    return firstLetters.map(firstLetter => firstLetter);
};

export const AvatarField = ({ source, emptyText = "Name" }: FieldProps) => {
    const record = useRecordContext();
    if (record) {
        if (source && record && record[source])
            return (
                <div>
                    <Avatar src={record[source]} />
                </div>
            );
        return <div>
            <Avatar>{getFirstLetters(record[emptyText])}</Avatar>
        </div>;
    }
    return null;
};