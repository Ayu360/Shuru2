import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

interface PriceFooterProps {
  currentPrice: number;
  discountPercentage?: number;
  onInvite: () => void;
  onConfirm: () => void;
}

const PriceFooterComponent: React.FC<PriceFooterProps> = ({
  currentPrice,
  discountPercentage = 20,
  onInvite,
  onConfirm,
}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            Current Price{" "}
            <Text style={{ fontWeight: "600" }}>₹{currentPrice}</Text>{" "}
          </Text>
          <View style={styles.discountBadge}>
            <MaterialIcons name="verified" size={24} color="green" />
            <Text style={styles.discountText}>
              {discountPercentage}% Additional Discount
            </Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.inviteButton}
            onPress={onInvite}
            activeOpacity={0.8}
          >
            <Text style={styles.inviteButtonText}>Invite more people</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={onConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "transparent",
  },
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === "ios" ? 20 : 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#d2d79f",
    padding: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  priceText: {
    fontSize: 15,
    color: "green",
    fontWeight: "400",
  },
  discountBadge: {
    backgroundColor: "#dce0b4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 10,
  },
  discountText: {
    color: "green",
    fontSize: 12,
    fontWeight: "500",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    gap: 12,
  },
  inviteButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  inviteButtonText: {
    color: "#4CAF50",
    fontSize: 15,
    fontWeight: "500",
  },
  confirmButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default PriceFooterComponent;
