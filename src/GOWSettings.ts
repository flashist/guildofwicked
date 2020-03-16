export const GOWSettings = {
    colors: {
        black: 0x272727,
        grey: 0x767973,
        greyLight: 0xb6b7b5,
        white: 0xeaeaea,
        red: 0xde757a,
        yellow: 0xfed766,
        orange: 0xee8434,
        green: 0xc2c57f
    },

    layout: {
        contentToBorderPadding: 15
    },

    gamePage: {
        layout: {
            visuzaliationPartCoef: 0.25,
            visualiztion: {
                money: {
                    itemPositionsCoefs: [
                        {x: 0.5, y: 0.5},
                        {x: 0.25, y: 0.25},
                        {x: 0.75, y: 0.25},
                        {x: 0.25, y: 0.75},
                        {x: 0.75, y: 0.75}
                    ]
                },
                units: {
                    itemPositionsCoefs: [
                        {x: 0.5, y: 0.25},
                        {x: 0.3, y: 0.25},
                        {x: 0.7, y: 0.25},
                        {x: 0.4, y: 0.75},
                        {x: 0.6, y: 0.75}
                    ]
                }
            }
        }
    },

    resources: {
        money: {
            localeId: "resourceMoney"
        },
        attack: {
            localeId: "resourceAttack"
        },
        defense: {
            localeId: "resourceDefense"
        }
    }
};