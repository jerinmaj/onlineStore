import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
}
    
)

export class GlobalProvider {
                        isGuest = true;
                        currentPage='home';
                        API_ENDPOINT='';  
                        username="guest";
                        productsCart:any[]=[];
                        count=0;
                        constructor()
                         {    }
                    }
                    //API_ENDPOINT='assets/Data/db.json';