import { Menu, Layout, LayoutProps, useTranslate } from "react-admin"
import SendIcon from '@mui/icons-material/Send';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const AppMenu = () => {
    const translate = useTranslate();
    return (<Menu>
        <Menu.ResourceItem name="Members" />
        <Menu.Item to="/notifications" primaryText={translate("common.notifications")} leftIcon={<SendIcon />} />
        <Menu.Item to="/score" primaryText={translate("common.score")} leftIcon={<EmojiEventsIcon />} />
    </Menu>)
}

export const AppLayout = (props: LayoutProps) => {
    return (<Layout {...props} menu={AppMenu} >
    </Layout>)
}