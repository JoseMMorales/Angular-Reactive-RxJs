import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../model/user";

@Injectable({
    providedIn: 'root'
})
export class AuthStore {

    user$: Observable<User>;
    isLoggedIn$: Observable<boolean>;
    isLoggeOut$: Observable<boolean>;

    login(email: string, password: string): Observable<User> {

    }

    logout() {

    }
   
}