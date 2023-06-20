import { API } from "./BaseCall";

export const Pokemon={
    getAllPoken:(payload,callBack)=>API.queryGet("/pokemon",callBack,payload),
    GetByName:(payload,callBack)=>API.get("/pokemon/"+payload.name,callBack,payload),
    getAbilities:(payload,callBack)=>API.get("/ability",callBack),
    getByAbility:(payload,callBack)=>API.get("/ability/"+payload.ability,callBack)
}