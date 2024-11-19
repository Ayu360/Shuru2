import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="groupPay" />
    </Stack>
  );
};

export default RootLayout;
