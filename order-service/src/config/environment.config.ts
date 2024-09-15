export interface IConfig {
    INVENTORY_MANAGEMENT_URL: string;
}


export const config: IConfig = {
    INVENTORY_MANAGEMENT_URL: process.env.INVENTORY_MANAGEMENT_URL || "http://localhost:3001"
};