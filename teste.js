function organizaSelos(num) {
  let ways = 2;

  if (num % 2 == 0) {
    let number = num;
    while (number / 2 >= 2) {
      number = number / 2;
      ways = ways + 1;
    }
  } else if (num % 5 == 0 && num % 2 != 0) {
    ways = ways + 2;
  } else if (num % 3 == 0) {
    let number = num;
    while (number / 3 >= 0) {
      number = number / 3;
      ways = ways + 1;
    }
  }
  return ways;
}

console.log(organizaSelos(12));
