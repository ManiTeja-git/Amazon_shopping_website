import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  });
  return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const deliveryOptionDays = deliveryOption.deliveryDays;
  let daysToBeAdded = 0;
  let daysCounted = 0;

  while (daysCounted < deliveryOptionDays) {
    daysToBeAdded++;
    const dayOfWeek = today.add(daysToBeAdded, "day").format("dddd");
    if (dayOfWeek !== "Saturday" && dayOfWeek !== "Sunday") {
      daysCounted++;
    }
  }

  const deliveryDate = today.add(daysToBeAdded, "days");
  return deliveryDate;
}
