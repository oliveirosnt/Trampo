import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local-user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";


@Injectable()
export class AutenticacaoService {

    jwtHelper: JwtHelper = new JwtHelper();
    constructor(public http: HttpClient,
        public storage: StorageService){
    }

    login(creds : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/api/login`,
            creds,
            {
                observe: 'response',
                responseType: 'json'
            });
    }

    successfulLogin(value : string){
        let aux = (this.jwtHelper.decodeToken(value).sub).split(" ")[0];
        let user : LocalUser = {
            token: value,
            username: aux
        }
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }

    
}