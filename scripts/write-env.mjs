import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const envPath = resolve('src/environments/environment.prod.ts');
const apiBaseUrl = process.env.API_BASE_URL ?? '';
const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? '';

const contents = `export const environment = {
  apiBaseUrl: ${JSON.stringify(apiBaseUrl)},
  supabaseUrl: ${JSON.stringify(supabaseUrl)},
  supabaseAnonKey: ${JSON.stringify(supabaseAnonKey)},
};
`;

await mkdir(dirname(envPath), { recursive: true });
await writeFile(envPath, contents);

if (!apiBaseUrl && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn('No API_BASE_URL or Supabase config found. The app will use same-domain /api mode.');
}
