import { Admin, CustomRoutes, Resource } from "react-admin";
import { Route } from "react-router-dom";
import Diversity3Icon from '@mui/icons-material/Diversity3';

import { dataProvider, authProvider, i18nProvider } from "./providers";
import { AppLogin } from "./AppLogin";
import { AppLayout } from "./Layout";

import { MemberList, ShowMember } from "./modules/members";
import { Notifications } from "./modules/notifications";
import { Score } from "./modules/score";

function App() {
  return <Admin
    loginPage={AppLogin}
    layout={AppLayout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}>
    <Resource name="Members" list={MemberList} show={ShowMember} icon={Diversity3Icon} />
    <CustomRoutes>
      <Route path="/score" element={<Score />} />
      <Route path="/notifications" element={<Notifications />} />
    </CustomRoutes>
  </Admin>
}

export default App
