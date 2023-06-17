import { IMap } from "../types/types";

export const Maps: IMap[] = [
    {
        id: 1,
        preview: 'map1.jpg',
        walls: [
            {
                height: 20,
                width: 500,
                left: 50,
                top: 50,
            },
            {
                height: 200,
                width: 20,
                left: 550,
                top: 50,
            },
        ],
        finish: {
            height: 50,
            width: 5,
            left: 995,
            top: 750,
        }
    },
    {
        id: 2,
        preview: 'map2.png',
        walls: [],
        finish: {
            height: 50,
            width: 5,
            left: 995,
            top: 750,
        }
    }
]