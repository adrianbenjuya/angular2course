export class AppConfig {

    public static APP_SERVICE_URL: string = 'http://appserverclon.cloudapp.net/TourOfHeroes/api';

    public static TEST_ENVIRONMENT: boolean = false;

    public static HEROES_URL: string = (AppConfig.TEST_ENVIRONMENT ? 'http://localhost:54791/api' : AppConfig.APP_SERVICE_URL) + '/heroes/'
}
