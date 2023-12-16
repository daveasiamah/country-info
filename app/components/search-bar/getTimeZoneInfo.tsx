const getTimezoneInfo = async (location: string | number | boolean) => {
  if (location.toString().length < 3) return;

  const response = await fetch(
    `https://timezone.abstractapi.com/v1/current_time/?api_key=67126699929d4c91826d5a0f9649e30a&location=${encodeURIComponent(
      location
    )}`
  );
  const data = await response.json();
  return data;
};

export default getTimezoneInfo;
