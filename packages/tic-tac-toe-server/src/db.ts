import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import logger from "./logger";

export const connectWithRetry = async (retries = 5, timeout = 500) => {
    const connectionOptions = Object.assign(
        await getConnectionOptions(),
        {
            host: process.env.TYPEORM_HOST,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE
        },
        process.env.NODE_ENV === "production"
            ? {
                  entities: [process.env.TYPEORM_ENTITIES_DIR],
                  subscribers: [process.env.TYPEORM_SUBSCRIBERS_DIR],
                  migrations: [process.env.TYPEORM_MIGRATIONS_DIR]
              }
            : {}
    );

    try {
        await createConnection(connectionOptions);
        logger.info("DB Connected");
    } catch (e) {
        logger.error(e);

        if (retries > 0) {
            setTimeout(() => {
                logger.warn(
                    `Retrying connection, retrys remaining: ${retries}, timeout: ${timeout}`
                );
                connectWithRetry(retries - 1, timeout);
            }, timeout);
        } else {
            logger.error(new Error(`DB connection failed with retrys`));
            return;
        }
    }
};
