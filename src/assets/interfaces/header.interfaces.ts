export interface HeaderServiceContactInfo{
    contactInfoNumber:string
    contactInfoEmail:string
}

export interface HeaderServiceServices{

    ServicesInstallment:string,
    ServicesDelivery:string,
    ServicesLanguage:{
        LanguageImg:string,
        Language:string
    }
}