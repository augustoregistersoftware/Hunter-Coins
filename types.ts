
export enum TreasureType {
  COIN = 'COIN',
  CHEST = 'CHEST',
}

export interface Treasure {
  id: number;
  type: TreasureType;
  position: {
    x: number;
    y: number;
    z: number;
  };
}
