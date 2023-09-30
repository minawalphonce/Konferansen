import { Admin, Resource } from "react-admin";
import Diversity3Icon from '@mui/icons-material/Diversity3';

import { dataProvider, authProvider, i18nProvider } from "./providers";
import { AppLogin } from "./AppLogin";
import { AppLayout } from "./Layout";

import { MemberList } from "./modules/members";

function App() {
  return <Admin
    loginPage={AppLogin}
    layout={AppLayout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}>
    <Resource name="Members" list={MemberList} icon={Diversity3Icon} />
  </Admin>
}

export default App
