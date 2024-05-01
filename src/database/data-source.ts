import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { Settings, TotalConsumption } from './entities'

config()

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [__dirname + '/entities/*.{js,ts}'],
    dropSchema: false,
    synchronize: true,
    logging: false,
    migrations: [__dirname + '/../../migration/*.{js,ts}'],
    migrationsTableName: 'migrations_history',
    migrationsRun: true,
}

export const dataSource = new DataSource(dataSourceOptions)
dataSource
    .initialize()
    .then(async () => {
        console.log('Data Source has been initialized!')

        // auto create price setting
        const settingRepository = dataSource.getRepository(Settings);
        const isExist = await settingRepository.findOneBy({ key: 'price' });
        if (!isExist) {
            settingRepository.save({ key: 'price', value: '0.0' });
            console.log('Price setting has been initialized!')
        }
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })