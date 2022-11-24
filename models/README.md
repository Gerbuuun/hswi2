# Models

Aangezien we typescript gebruiken is het handig om
aan te geven hoe onze data er precies uit ziet.
Dit doen we met behulp van een `interface`
(zie [docs](https://www.typescriptlang.org/docs/handbook/2/objects.html))

Er zijn twee interfaces per model:
voor de data zelf en voor de api response

```Typescript
export interface Regatta {
    rid: string;
    regattaname: string;
    shortname: string;
    jaar: Date;
}

export interface GetRegattasResponse {
    error: string;
    regattas: Regatta[];
}
```
