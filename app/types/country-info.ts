type Country={
    name:string,
    native:string,
    phone:string,
    continent:string,
    capital:string,
    currency:string,
    languages:Language[],
}

type Language={
    code:string,
    name:string,
}