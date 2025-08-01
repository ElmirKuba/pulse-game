import { defineConfig } from 'drizzle-kit';

/** Массив для добавления схем для миграций в базу данных */
const schemaGlobs: string[] = [
  'libs/backend/orm-schemas/src/lib/schemas/accounts.schema.ts',
];

export default defineConfig({
  /** где искать файлы схем */
  schema: schemaGlobs,

  /** куда складывать сгенерированные миграции */
  out: 'libs/backend/orm-schemas/src/lib/migrations',

  /** диалект БД */
  dialect: 'mysql',

  /** параметры подключения */
  dbCredentials: {
    host: process.env['MYSQL_HOST_AND_NAME_DATABASE'] ?? 'localhost',
    port: Number(process.env['MYSQL_PORT'] ?? '3306'),
    user: process.env['MYSQL_USER'] ?? 'mysql-user',
    password: process.env['MYSQL_PASSWORD'] ?? 'mysql-pass',
    database:
      process.env['MYSQL_HOST_AND_NAME_DATABASE'] ?? 'mysql_kubagame_dev',
  },
});
