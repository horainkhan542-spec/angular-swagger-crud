import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const envPath = resolve('src/environments/environment.prod.ts');
const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? '';

const contents = `export const environment = {
  apiBaseUrl: '',
  supabaseUrl: ${JSON.stringify(supabaseUrl)},
  supabaseAnonKey: ${JSON.stringify(supabaseAnonKey)},
};
`;

await mkdir(dirname(envPath), { recursive: true });
await writeFile(envPath, contents);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('SUPABASE_URL or SUPABASE_ANON_KEY is empty. The app will use backend /api mode.');
}
