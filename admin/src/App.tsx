import { Admin, CustomRoutes, Resource } from "react-admin";
import { Route } from "react-router-dom";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Score from "@mui/icons-material/Scoreboard";

import { dataProvider, authProvider, i18nProvider } from "./providers";
import { AppLogin } from "./AppLogin";
import { AppLayout } from "./Layout";

import { MemberList, ShowMember } from "./modules/members";
import { ScoreCreate, ScoreList } from "./modules/score";

function App() {
  return <Admin
    loginPage={AppLogin}
    layout={AppLayout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}>
    <Resource name="Members" list={MemberList} show={ShowMember} icon={Diversity3Icon} />
    <Resource name="ScoreLog" list={ScoreList} create={ScoreCreate} icon={Score} />
    <CustomRoutes>
      <Route path="/notifications" element={<h1>Notifications</h1>} />
    </CustomRoutes>
  </Admin>
}

export default App
