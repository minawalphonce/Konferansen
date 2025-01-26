import { FieldProps, useRecordContext } from "react-admin";
import Avatar from "@mui/material/Avatar";

const getFirstLetters = (user: string) => {
    const firstLetters: string[] = [];
    const words = user.toLocaleUpperCase().split(' ');

    words.map(word => firstLetters.push(word[0]));

    return firstLetters.map(firstLetter => firstLetter);
};

export const AvatarField = ({ source, emptyText = "Name", size = "s" }: FieldProps & { size?: "l" | "s" }) => {
    const record = useRecordContext();
    if (record) {
        if (source && record && record[source])
            return (
                <div>
                    <Avatar src={record[source]}
                        variant={size === "s" ? "circular" : "rounded"}
                        sx={{ width: size === "s" ? undefined : 128, height: size === "s" ? undefined : 128 }} />
                </div>
            );
        else if (record[emptyText]) {
            return <div>
                <Avatar
                    variant={size === "s" ? "circular" : "rounded"}
                    sx={{ width: size === "s" ? undefined : 128, height: size === "s" ? undefined : 128 }}
                >{getFirstLetters(record[emptyText])}</Avatar>
            </div>;
        }
    }
    return null;
};