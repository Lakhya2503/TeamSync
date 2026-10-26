import { database } from "../../config/db";
import { userTable } from "../user/user.table";

export const teamTable = async () => {
  try {
    const team_members = `
      CREATE TABLE IF NOT EXISTS team_members (
        user_id INT NOT NULL REFERENCES users(id),
        team_id INT NOT NULL REFERENCES teams(id) 
        )
    `;

    const teams = `
          CREATE TABLE IF NOT EXISTS teams(
              id SERIAL PRIMARY KEY,
              team_name VARCHAR(100) NOT NULL  ,
              admin_id INT NOT NULL REFERENCES users(id),
              team_link_expiry DATE NOT NULL,
              is_active BOOLEAN NOT NULL  DEFAULT TRUE
          )
        `;
    await database.query(teams);
    console.log("Team Members Table Create Or Fetch Successfully :  📑 🗃️");
    await database.query(team_members);
    console.log("Teams Table Create Or Fetch Successfully : 🏢");
  } catch (error) {
    console.log("Problem  on creating teams : ", error?.message);
    throw new Error(error?.message);
  }
};
