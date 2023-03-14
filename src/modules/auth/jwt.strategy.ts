import { Strategy,ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport'
import { jwtKey } from "./config";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'local'){
    constructor(private readonly authService:AuthService){
        super({
            jwtFormRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:jwtKey.secret
        })
        this.authService = authService;
    }
    async validate(payload){
        if(!payload.username||!payload.password){
            return false;
        }
        let user = {username:payload.username,password:payload.password};
        return user;
    }
}