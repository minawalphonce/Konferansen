import { AppBar, AppBarProps, Layout, LayoutProps } from "react-admin"

const AppAppBar = (props: AppBarProps) => (<AppBar {...props}>
</AppBar>)

export const AppLayout = (props: LayoutProps) => {
    return (<Layout {...props} appBar={AppAppBar}>
    </Layout>)
}