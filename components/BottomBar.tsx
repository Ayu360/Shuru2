import { Link, router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

interface StickyFooterProps {
  message?: string;
  buttonText: string;
  price?: number;
  onConfirm: () => void;
  confirmationsNeeded?: string;
}

const StickyFooter: React.FC<StickyFooterProps> = ({
  message = "Current order will be auto-placed upon receiving all 3 confirmations",
  buttonText = "Confirm order",
  price = "350",
  onConfirm,
  confirmationsNeeded = "3",
}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {message && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              {message.replace("3", confirmationsNeeded)}
            </Text>
          </View>
        )}
        <View style={styles.button}>
          <Link href="/cart" style={{ color: "white" }}>
            {buttonText} {price ? `at ₹${price}` : ""}
          </Link>
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  messageContainer: {
    backgroundColor: "#D2D79F",
    padding: 12,
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginBottom: 4,
  },
  messageText: {
    color: "#2E7D32",
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2E7D32",
    margin: 16,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default StickyFooter;
