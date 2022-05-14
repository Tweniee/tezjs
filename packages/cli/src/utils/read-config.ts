import { existsSync } from 'node:fs'
import dotenv  from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { loadConfig } from 'c12'
import { ENVIRONMENTS } from "../const/core.const"
import { getAndWriteEnv } from './get-and-write-env'
export async function readConfig(mode:string,rootPath:string){
    let filePath = `${rootPath}\\${ENVIRONMENTS}\\${mode ? `.env.${mode}`: `.env`}`;
    if(existsSync(filePath)){
        const { parsed, error } = dotenv.config({
            debug: !!process.env.DEBUG || undefined,
            path:filePath
          })
          let env = getAndWriteEnv(parsed);
          dotenvExpand.expand({ parsed:env })
    }
    const { config:tezConfig, } = await loadConfig({
        name: 'tez',
        configFile: 'tez.config',
        dotenv: true,
        cwd:rootPath
    });
    return tezConfig;
}