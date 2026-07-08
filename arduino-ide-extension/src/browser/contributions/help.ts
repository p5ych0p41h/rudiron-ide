import { inject, injectable } from '@theia/core/shared/inversify';
import { WindowService } from '@theia/core/lib/browser/window/window-service';
import { CommandHandler } from '@theia/core/lib/common/command';
import { ArduinoMenus } from '../menu/arduino-menus';
import {
  Contribution,
  Command,
  MenuModelRegistry,
  CommandRegistry,
} from './contribution';
import { nls } from '@theia/core/lib/common';
import { IDEUpdaterCommands } from '../ide-updater/ide-updater-commands';
import { ElectronCommands } from '@theia/core/lib/electron-browser/menu/electron-menu-contribution';

@injectable()
export class Help extends Contribution {
  @inject(WindowService)
  protected readonly windowService: WindowService;

  override registerCommands(registry: CommandRegistry): void {
    const open = (url: string) =>
      this.windowService.openNewWindow(url, { external: true });
    const createOpenHandler = (url: string) =>
      <CommandHandler>{
        execute: () => open(url),
      };
    registry.registerCommand(
      Help.Commands.GETTING_STARTED,
      createOpenHandler('https://gitflic.ru/project/akvarius-rudiron/metodicheskie-materialy')
    );
    registry.registerCommand(
      Help.Commands.VISIT_RUDIRON,
      createOpenHandler('https://rudiron.aq.ru/')
    );
    registry.registerCommand(
      Help.Commands.PROJECT_REPO,
      createOpenHandler('https://gitflic.ru/company/akvarius-rudiron')
    );
    registry.registerCommand(
      Help.Commands.CORE_SOURCE,
      createOpenHandler('https://gitflic.ru/project/akvarius-rudiron/rudiron-source')
    );
  }

  override registerMenus(registry: MenuModelRegistry): void {
    registry.unregisterMenuAction({
      commandId: ElectronCommands.TOGGLE_DEVELOPER_TOOLS.id,
    });

    registry.registerMenuAction(ArduinoMenus.HELP__MAIN_GROUP, {
      commandId: Help.Commands.GETTING_STARTED.id,
      order: '0',
    });

    registry.registerMenuAction(ArduinoMenus.HELP__FIND_GROUP, {
      commandId: Help.Commands.VISIT_RUDIRON.id,
      order: '1',
    });
    registry.registerMenuAction(ArduinoMenus.HELP__FIND_GROUP, {
      commandId: Help.Commands.PROJECT_REPO.id,
      order: '2',
    });
    registry.registerMenuAction(ArduinoMenus.HELP__FIND_GROUP, {
      commandId: Help.Commands.CORE_SOURCE.id,
      order: '3',
    });
    registry.registerMenuAction(ArduinoMenus.HELP__FIND_GROUP, {
      commandId: IDEUpdaterCommands.CHECK_FOR_UPDATES.id,
      order: '4',
    });
  }
}

export namespace Help {
  export namespace Commands {
    export const GETTING_STARTED: Command = {
      id: 'arduino-getting-started',
      label: nls.localize('arduino/help/gettingStarted', 'Getting Started'),
      category: 'Arduino',
    };
    export const VISIT_RUDIRON: Command = {
      id: 'rudiron-visit-website',
      label: nls.localize('arduino/help/visitRudiron', 'Visit Rudiron Website'),
      category: 'Rudiron',
    };
    export const PROJECT_REPO: Command = {
      id: 'rudiron-project-repo',
      label: nls.localize('arduino/help/projectRepo', 'Project Repository'),
      category: 'Rudiron',
    };
    export const CORE_SOURCE: Command = {
      id: 'rudiron-core-source',
      label: nls.localize('arduino/help/coreSource', 'Core Source Code'),
      category: 'Rudiron',
    };
  }
}
