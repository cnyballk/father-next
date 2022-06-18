import builder from '../builder';
import { IApi } from '../types';

export default (api: IApi) => {
  api.registerCommand({
    name: 'dev',
    description: 'dev',
    async fn() {
      let watcher = await builder({
        userConfig: api.userConfig,
        cwd: api.cwd,
        pkg: api.pkg,
        watch: true,
      });
      api.service.configManager?.watch({
        schemas: api.service.configSchemas,
        onChangeTypes: api.service.configOnChanges,
        async onChange() {
          watcher!.close();
          watcher = await builder({
            userConfig: api.userConfig,
            cwd: api.cwd,
            pkg: api.pkg,
            watch: true,
          });
        },
      });
    },
  });
};
