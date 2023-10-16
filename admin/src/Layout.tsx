import { Menu, Layout, LayoutProps, useTranslate } from "react-admin"
import SendIcon from '@mui/icons-material/Send';

export const AppMenu = () => {
    const translate = useTranslate();
    return (<Menu>
        <Menu.ResourceItem name="Members" />
        <Menu.ResourceItem name="ScoreLog" />
        <Menu.Item to="/notifications" primaryText={translate("common.notifications")} leftIcon={<SendIcon />} />
    </Menu>)
}

export const AppLayout = (props: LayoutProps) => {
    return (<Layout {...props} menu={AppMenu} >
    </Layout>)
}