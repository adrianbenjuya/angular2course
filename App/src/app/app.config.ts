export class AppConfig {

    public static APP_SERVICE_URL: string = 'http://acntest.brazilsouth.cloudapp.azure.com/api';

    public static TEST_ENVIRONMENT: boolean = true;

    public static HEROES_URL: string = AppConfig.TEST_ENVIRONMENT ? '../assets/api/heroes.json' : AppConfig.APP_SERVICE_URL + '/heroes/'
}
