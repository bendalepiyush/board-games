export const rollDices = (diceCount = 1) => {
  const diceResult = [];

  for (let i = 0; i < diceCount; i++) {
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    diceResult.push(randomNumber);
  }

  return diceResult;
};

export const isCardHorizontal = (position: number): boolean => {
  if (
    (position >= 12 && position <= 20) ||
    (position >= 32 && position <= 40)
  ) {
    return true;
  }

  return false;
};
