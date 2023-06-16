export type Step = 'chooseMap' | 'game' | 'stats'

export interface ITrap {
    posX: number
    posY: number
    id: number
}

export interface IMonster {
    posX: number
    posY: number
    id: number
}


export interface IMap {
    id: number;
    preview: string;
    walls: IWall[]
}

export interface IWall {
    left: number
    top: number
    width: number
    height: number
}