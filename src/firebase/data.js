function createData(name, money) {
    return { name, money };
  }
  
  export const dataBugdet = [
    createData('Cupcake', 200),
    createData('Donut', 452, ),
    createData('Shopping', 262,),
    createData('Rent', 159),
    createData('SuperBet', 356),
    createData('Honeycomb', 408),
    createData('Ice cream sandwich', 237),
    createData('Jelly Bean', 375),
    createData('KitKat', 518),
    createData('Lollipop', 392),
    createData('Marshmallow', 318),
    createData('Nougat', 360),
    createData('Oreo', 4370),
  ].sort((a, b) => (a.name < b.name ? -1 : 1));