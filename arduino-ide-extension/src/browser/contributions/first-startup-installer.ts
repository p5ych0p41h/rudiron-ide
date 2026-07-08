import { LocalStorageService } from '@theia/core/lib/browser';
import { inject, injectable } from '@theia/core/shared/inversify';
import { Contribution } from './contribution';

@injectable()
export class FirstStartupInstaller extends Contribution {
  @inject(LocalStorageService)
  private readonly localStorageService: LocalStorageService;

  override async onReady(): Promise<void> {
    const isFirstStartup = !(await this.localStorageService.getData(
      FirstStartupInstaller.INIT_LIBS_AND_PACKAGES
    ));
    if (isFirstStartup) {
      await this.localStorageService.setData(
        FirstStartupInstaller.INIT_LIBS_AND_PACKAGES,
        true
      );
    }
  }
}
export namespace FirstStartupInstaller {
  export const INIT_LIBS_AND_PACKAGES = 'initializedLibsAndPackages';
}
