import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Carsoul from "@/components/Carsoul";
import Footer from "@/components/BottomBar";
import GroupBuy from "@/components/GroupBy";
import GroupBuyCard from "@/components/GroupByCard";
import ProductIntro from "@/components/ProductIntro";
import CollapsibleSection from "@/components/CollapsibleSection";

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

const Index = () => {
  const handleConfirm = () => {
    console.log("Order confirmed");
  };

  const [quantity, setQuantity] = useState(1);

  const reduceProduct = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity((quantity) => quantity - 1);
  };

  const item = {
    title: "Rouse Gold Serum",
    rating: {
      rate: 4.3,
      count: 1.3,
    },
    price: 310,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ marginBottom: 150 }}>
        <Carsoul />
        <ProductIntro
          quantity={quantity}
          addProduct={() => setQuantity((quantity) => quantity + 1)}
          reduceProduct={reduceProduct}
          item={item}
        />
        <GroupBuy />
        <GroupBuyCard />
        <CollapsibleSection title="Product Details" content={text} />
        <CollapsibleSection title="Shipping & Return" content={text} />
      </ScrollView>
      <Footer buttonText={"Confirm"} onConfirm={handleConfirm} />
      <StatusBar style="light" backgroundColor="#d2d79f" />
    </SafeAreaView>
  );
};

export default Index;
