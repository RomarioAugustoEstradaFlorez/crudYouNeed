// Variables globales transversales a toda la aplicación    

import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    api: string = 'http://localhost:3000/api/'; // local
}
