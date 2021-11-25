import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class LoadingService {

    loading$: Observable<boolean>;

    showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
        return undefined;
    }

    loadingOn() {

    }

    loadingOff() {

    }
}