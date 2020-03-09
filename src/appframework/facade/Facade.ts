import {BaseObject} from "fcore";

import {FApp, ServiceLocator, getInstance} from "fsuite";

import {GlobalEventDispatcherModule} from "../globaleventdispatcher/GlobalEventDispatcherModule";
import {ModulesManager} from "../base/modules/ModulesManager";
import {PagesModule} from "../pages/PagesModule";
import {RendererModule} from "../renderer/RendererModule";
import {IFacadeOptions} from "./IFacadeOptions";
import {AppModule} from "../app/AppModule";
import {TimeModule} from "../time/TimeModule";
import {DebugModule} from "../debug/DebugModule";
import {LoadModule} from "../load/LoadModule";
import {DependenciesModule} from "../dependencies/DependenciesModule";
import {AssetsModule} from "../assets/AssetsModule";
import {ContainersModule} from "../containers/ContainersModule";
import {ObjectsPoolModule} from "../pool/ObjectsPoolModule";
import {LocalesModule} from "../locales/LocalesModule";
import {StorageModule} from "../storage/StorageModule";
import {SoundsModule} from "../sounds/SoundsModule";
import {HTMLModule} from "../html/HTMLModule";
import {AppMainContainer} from "../display/views/maincontainer/AppMainContainer";

export class Facade extends BaseObject {

    protected options: IFacadeOptions;
    protected modulesManager: ModulesManager;

    public app: FApp;
    public mainContainer: AppMainContainer;

    constructor(options: IFacadeOptions) {
        super(options);
    }

    protected construction(options: IFacadeOptions): void {
        super.construction(options);

        this.options = options;

        Facade._instance = this;
        if (this.options.debug) {
            window["Facade"] = this;
        }

        ServiceLocator.options = {debug: this.options.debug};

        this.addModules();
        this.activateModules();

        this.initView();
    }

    protected addModules(): void {
        this.modulesManager = new ModulesManager();

        this.addModule(new DependenciesModule());
        this.addModule(new ObjectsPoolModule());
        this.addModule(new GlobalEventDispatcherModule());
        this.addModule(new RendererModule());
        this.addModule(new StorageModule());
        this.addModule(new LoadModule());
        this.addModule(new SoundsModule());
        this.addModule(new HTMLModule());
        this.addModule(new LocalesModule());
        this.addModule(new AssetsModule());
        this.addModule(new PagesModule());

        this.addModule(new RendererModule());

        this.addModule(new AppModule());
        this.addModule(new TimeModule());
        this.addModule(new ContainersModule());

        if (this.options.debug) {
            this.addModule(new DebugModule());
        }
    }

    public activateModules(): void {
        // First: configure all injections
        this.modulesManager.initModules();
        // Second: activate the service locator object
        ServiceLocator.activate();
        // Activate modules (after Service Locator activation)
        this.modulesManager.activateModules();
    }

    public addModule(module): void {
        this.modulesManager.addModule(module);
    }

    protected initView(): void {
        this.mainContainer = getInstance(AppMainContainer);
        FApp.instance.stage.addChild(this.mainContainer);
    }

// - - - - -

    private static _instance: Facade;

    static init(options?:IFacadeOptions): void {
        if (!options) {
            options = {};
        }
        let FacadeClass = options.FacadeClass;
        if (!FacadeClass) {
            FacadeClass = Facade;
        }

        new FacadeClass(options);
    }

    static get instance(): Facade {
        if (!Facade._instance) {
            console.error("ERROR! Facade should be prepared via the Facade.init method before used via Facade.instance!");
            return;
        }
        return Facade._instance;
    }
}