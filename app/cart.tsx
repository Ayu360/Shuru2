import React, { SetStateAction, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { item1, item2 } from "@/data/data";

const CartScreen: React.FC = () => {
  const [products, setProducts] = useState([item1, item2]);

  const [quantity1, setQuantity1] = useState<number>(1);
  const [quantity2, setQuantity2] = useState<number>(1);
  const [selectedItems, setSelectedItems] = useState<Array<number>>([]);

  const handleSelectedItems = (id: number) => {
    setSelectedItems((prevSelectedItems: any) => {
      if (prevSelectedItems.includes(id)) {
        return prevSelectedItems.filter((idx: number) => idx !== id);
      } else {
        return [...prevSelectedItems, id];
      }
    });
  };

  const allItemsSelected = products.length === selectedItems.length;
  const handleAllSelction = () => {
    if (allItemsSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map((item: any) => item.id));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.SecondaryContainer}>
        <View style={styles.header}>
          <View style={{ width: 100 }}>
            <Text style={styles.cartTitle}>Cart</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.selectAllButton}
              onPress={handleAllSelction}
            >
              <Text style={styles.selectAllText}>
                {allItemsSelected ? "Unselect All Items" : "Select All Items"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.subTotalText}>
            Sub Total ${310 * quantity1 + 210 * quantity2}
          </Text>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <RenderItem
            quantity={quantity1}
            setQuantity={setQuantity1}
            item={item1}
            handleSelectedItems={handleSelectedItems}
            selectedItems={selectedItems}
          />
          <RenderItem
            quantity={quantity2}
            setQuantity={setQuantity2}
            item={item2}
            handleSelectedItems={handleSelectedItems}
            selectedItems={selectedItems}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const RenderItem = ({
  item,
  handleSelectedItems,
  selectedItems,
  setQuantity,
  quantity,
}: any) => {
  const truncateString = (input: string, len: number) => {
    if (input.length > len) {
      return input.substring(0, len) + "...";
    } else {
      return input;
    }
  };
  const reduceProduct = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity((quantity: number) => quantity - 1);
  };

  const addProduct = () => {
    setQuantity((quantity: number) => quantity + 1);
  };
  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.cartItemGeneralDetails}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleSelectedItems(item.id)}
        >
          <AntDesign
            name={
              selectedItems.includes(item.id) ? "checkcircle" : "checkcircleo"
            }
            size={24}
            color={selectedItems.includes(item.id) ? "#4CAF50" : "#777"}
          />
        </TouchableOpacity>

        <Image
          source={require("../assets/group.png")}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{truncateString(item.title, 50)}</Text>
          <Text style={styles.itemDescription}>
            {truncateString(item.description, 30)}
          </Text>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>⭐ {item.rating.rate}</Text>
            <Text style={styles.reviews}>({item.rating.count}k)</Text>
          </View>
        </View>
      </View>
      <View style={styles.cartItemPriceDetails}>
        <View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Text style={styles.deliveryText}>Free Delivery</Text>
            <Text style={styles.deliveryDate}>
              Get it{" "}
              <Text style={{ fontWeight: "bold", color: "black" }}>
                Tommorrow
              </Text>
              {"\n"} order before{" "}
              <Text style={{ fontWeight: "bold", color: "black" }}>
                Midnight
              </Text>
            </Text>
          </View>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
          <Text style={styles.unitText}>{item.subText}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => reduceProduct()}>
                <AntDesign name="minus" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => addProduct()}>
              <View style={styles.iconContainer}>
                <AntDesign name="plus" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.itemTotal}>Item Total</Text>
            <Text style={styles.totalPrice}>
              ₹{(item.price * quantity).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  // ... existing styles ...
  container: {
    flex: 1,
    backgroundColor: "#FFF8E1",
    justifyContent: "space-around",
  },
  SecondaryContainer: {
    gap: 10,
    height: "80%",
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    marginVertical: 40,
    backgroundColor: "#61dafb",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  actionButtons: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  selectAllButton: {
    padding: 5,
  },
  selectAllText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  priceContainer: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "white",
    borderRadius: 15,
  },
  checkbox: {
    padding: 5,
  },
  cartItemContainer: {
    backgroundColor: "#FFF8E1",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    gap: 10,
  },
  cartItemGeneralDetails: {
    flexDirection: "row",
  },
  cartItemPriceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  itemDescription: {
    fontSize: 12,
    fontWeight: "800",
    color: "#777",
    marginVertical: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  rating: {
    fontSize: 14,
    fontWeight: 700,
    color: "#777",
  },
  reviews: {
    fontSize: 12,
    fontWeight: 700,
    color: "#777",
    marginLeft: 5,
  },
  deliveryText: {
    fontSize: 13,
    height: 25,
    paddingVertical: 2,
    width: 83,
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: "600",
  },
  deliveryDate: {
    fontSize: 11,
    fontWeight: "600",
    color: "#777",
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    marginVertical: 2,
  },
  unitText: {
    fontSize: 12,
    fontWeight: "700",
    color: "black",
  },
  quantityContainer: {
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 8,
  },
  itemTotal: {
    fontSize: 15,
    color: "#777",
    marginTop: 5,
  },
  totalPrice: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  subTotalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartList: {
    paddingBottom: 100,
  },
  iconContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 2,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default CartScreen;
