import { refreshTokenTable, userTable } from "../model/auth.table.ts";

const table = () => {
  userTable();
  refreshTokenTable();
};

export default table;
