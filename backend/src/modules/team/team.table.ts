export const teamTable = async () => {
  try {
    const query = `
            CREATE TABLE IF NOT EXITS teams{
                team_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                team_name VARCHAR(100) NOT NULL,

            }
        `;
  } catch (error) {}
};
