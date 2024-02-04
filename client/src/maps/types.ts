export type CornerCardType = "Corner Card";
export type CenterCardType = "Center";
export type CountryCardType = "Country";
export type CompanyCardType = "Company";
export type SurpriseCardType = "Surprise";
export type CardPosition = "top" | "bottom" | "left" | "right";

export type Center = {
  type: CenterCardType;
  order: number;
  gridSpan: string;
  position: number;
};

type Player = {
  color: string;
  name: string;
  id: string;
};

export type PlayersMap = {
  [key: number]: Player[];
};

export type CornerCard = {
  imagePath: string;
  title: string;
  type: CornerCardType;
  order: number;
  position: number;
  playersMap: PlayersMap;
};

export type CountryCard = {
  backgroundImageUrl: string;
  countryLogo: string;
  title: string;
  price: string;
  cardPosition: CardPosition;
  type: CountryCardType;
  order: number;
  position: number;
  playersMap: PlayersMap;
};

export type CompanyCard = {
  backgroundImageUrl: string;
  countryLogo: string;
  title: string;
  price: string;
  cardPosition: CardPosition;
  type: CompanyCardType;
  order: number;
  position: number;
  playersMap: PlayersMap;
};

export type SurpriseCard = {
  imagePath: string;
  title: string;
  type: SurpriseCardType;
  cardPosition: CardPosition;
  order: number;
  position: number;
  playersMap: PlayersMap;
};

export type CLASSIC_MAP_CARD =
  | CountryCard
  | CornerCard
  | SurpriseCard
  | Center
  | CompanyCard;
