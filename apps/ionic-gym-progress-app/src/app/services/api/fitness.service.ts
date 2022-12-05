import { API_RESOURCES, buildUrl } from 'src/app/shared/fitness-api-config';

import { BurnedCalories } from 'src/app/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { IFitnessService } from 'src/app/interfaces/fitness-service.interface';
import { Injectable } from '@angular/core';
import { LOCAL_API_SERVICES } from 'src/app/interfaces/local-api.endpoints';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FitnessService implements IFitnessService {
    constructor(private readonly httpClient: HttpClient) {}

    async getBurnedCalories(activityid: string, activitymin: number, weight: number): Promise<BurnedCalories> {
        const firstPart = API_RESOURCES.BURNEDCALORIES + `?` + `{activityid} +{activitymin}+{weight}`;
        const url = `${buildUrl(firstPart as any)}`;
        return firstValueFrom(
            this.httpClient.get<BurnedCalories>(url, {
                headers: {
                    'X-RapidAPI-Key': 'd47fb99508msh18a8eae724e4658p1a76c0jsn341bae4900b7',
                    'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
                },
            }),
        );
    }
}
